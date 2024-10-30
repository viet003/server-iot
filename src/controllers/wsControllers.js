import * as historyService from "../services/historyServices"
import * as cardService from "../services/cardServices"
import * as billService from "../services/billServices"

const WebSocket = require('ws');

export const getDataController = async (clients, client) => {
    try {
        const rs = await historyService.getAllHistoriesService();
        sendBack(clients, client, rs);
    } catch (error) {
        console.log(error);
        sendBack(clients, client, {
            sender: "server",
            type: "error",
            body: {
                err: 2,
                msg: "Lỗi không lấy được dữ liệu!",
                data: error
            }
        })
        return;
    }
}

export const checkLastController = async (clients, client, id) => {
    try {
        const rs = await cardService.checkCardService(id);
        if (rs) {
            const res = await historyService.getLatestHistoryByCardId(id);
            if (!res) {
                await historyService.createHistory(id, 0);
            } else {
                if (res?.Card?.type === "1" && res?.status === "0") {
                    sendToOther(clients, client, {
                        sender: "esp8266",
                        type: "cmd",
                        body: {
                            err: 0,
                            id: id,
                            status: 0,
                        }
                    })
                    return;
                } else {
                    await historyService.createHistory(id, res?.status === 0 ? 1 : 0);
                    if(res?.status === 0) {
                        await billService.updateBill(id);
                    }
                }
            }
            sendBack(clients, client, {
                sender: "esp8266",
                type: "cmd",
                body: {
                    err: 0,
                    status: 0,
                }
            })
            sendToOther(clients, client, {
                sender: "esp8266",
                type: "success",
                body: {
                    err: 0,
                    msg: "Thành công!"
                }
            })
        } else {
            sendToAll(clients, client, {
                sender: "esp8266",
                type: "warn",
                body: {
                    err: 2,
                    msg: "Thẻ không tồn tại!"
                }
            });
        }
    } catch (error) {
        console.log(error);
        return 
    }
}

// gửi message cho client khác
export const sendToOther = (clients, client, data) => {
    clients.forEach((_client) => {
        if (_client !== client && _client.readyState === WebSocket.OPEN) {
            _client.send(JSON.stringify(data));
        }
    });
}

// gửi lại dữ liệu về client yêu cầu
export const sendBack = (clients, client, data) => {
    clients.forEach((_client) => {
        if (_client === client && _client.readyState === WebSocket.OPEN) {
            _client.send(JSON.stringify(data));
        }
    });
}

// gửi message cho tất cả client
export const sendToAll = (clients, client, data) => {
    clients.forEach((_client) => {
        if (_client.readyState === WebSocket.OPEN) {
            _client.send(JSON.stringify(data));
        }
    });
}