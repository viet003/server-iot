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

export const handleCmdIn = async (clients, client, id) => {
    try {
        // Kiểm tra xem thẻ có tồn tại không
        const cardExists = await handleCheckCard(id);
        if (!cardExists) {
            sendToAll(clients, {
                sender: "server",
                type: "warn",
                body: {
                    err: 2,
                    msg: "Thẻ không tồn tại!"
                }
            });
            return;
        }

        const checkBill = await billService.updateBill(id, 0);

        if (!checkBill) {
            // Nếu không thể cập nhật hóa đơn do vượt hạn mức
            sendToOther(clients, client, {
                sender: "server",
                type: "warn",
                body: {
                    err: 2,
                    msg: "Thẻ đã đạt hạn mức dư nợ!"
                }
            });
            return;
        }

        // Lấy lịch sử mới nhất của thẻ
        const res = await historyService.getLatestHistoryWithCardType(id);
        if (!res || res.status === 1) {
            // Nếu không có lịch sử hoặc trạng thái là 'đã ra', tạo lịch sử mới (status = 0)
            await historyService.createHistory(id, 0);
            sendToAll(clients, {
                sender: "esp8266",
                type: "cmd",
                body: {
                    status: 0 // Trạng thái mới được tạo
                }
            });
        } else {
            // Nếu thẻ đang ở trạng thái "trong", gửi cảnh báo
            sendToOther(clients, client, {
                sender: "server",
                type: "warn",
                body: {
                    err: 2,
                    msg: `Trạng thái hiện tại đang ở trong. Không thể sử dụng thẻ!`
                }
            });
        }
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý vào cổng:", error);
        sendToAll(clients, {
            sender: "server",
            type: "error",
            body: {
                err: 1,
                msg: "Lỗi hệ thống! Vui lòng thử lại sau."
            }
        });
    }
};


export const handleCmdOut = async (clients, client, id) => {
    try {
        // Kiểm tra thẻ có tồn tại không
        const cardExists = await handleCheckCard(id);
        if (!cardExists) {
            sendToAll(clients, {
                sender: "server",
                type: "warn",
                body: {
                    err: 2,
                    msg: "Thẻ không tồn tại!"
                }
            });
            return;
        }
        const res = await historyService.getLatestHistoryWithCardType(id);
        // Nếu trạng thái là "đang ở trong" (status = 0), xử lý ra cổng
        if (res?.card?.type === 1) {
            sendToOther(clients, client, {
                sender: "esp8266",
                type: "info",
                body: {
                    err: 2,
                    car_id: id,
                    msg: "Vui lòng mở cửa cho khách!"
                }
            });
            return;
        }

        if (res?.status === 0) {
            // Cập nhật hóa đơn
            const checkBill = await billService.updateBill(id, 1);

            if (!checkBill) {
                // Nếu không thể cập nhật hóa đơn do vượt hạn mức
                sendToOther(clients, client, {
                    sender: "server",
                    type: "warn",
                    body: {
                        err: 2,
                        msg: "Thẻ đã đạt hạn mức dư nợ!"
                    }
                });
                return;
            }

            await historyService.createHistory(id, 1);

            sendToAll(clients, {
                sender: "esp8266",
                type: "cmd",
                body: {
                    status: 0 // Trạng thái mới được tạo
                }
            });
        } else {
            // Nếu trạng thái không phải là "đang ở trong"
            sendToOther(clients, client, {
                sender: "server",
                type: "warn",
                body: {
                    err: 2,
                    msg: "Trạng thái đang ở ngoài. Không thể sử dụng thẻ!"
                }
            });
        }
    } catch (error) {
        // Xử lý lỗi toàn cục
        console.error("Lỗi trong quá trình xử lý ra cổng:", error.message);
        sendToAll(clients, {
            sender: "server",
            type: "error",
            body: {
                err: 1,
                msg: "Lỗi hệ thống! Vui lòng thử lại sau."
            }
        });
    }
};

// xử lý đóng cổng
export const handleGuestExit = async (clients, card_id) => {
    await historyService.createHistory(card_id, 1);
    sendToAll(clients, {
        sender: "react",
        type: "cmd",
        body: {
            status: 0,
        }
    });
}

// xử lý đóng cổng
export const handleCmdClose = async (clients) => {
    sendToAll(clients, {
        sender: "esp8266",
        type: "cmd",
        body: {
            status: 1,
        }
    });
}

// kiểm tra thẻ
export const handleCheckCard = async (id) => {
    try {
        const rs = await cardService.checkCardService(id);
        return rs ? true : false;
    } catch (error) {
        console.log(error)
        throw (error)
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
export const sendToAll = (clients, data) => {
    clients.forEach((_client) => {
        if (_client.readyState === WebSocket.OPEN) {
            _client.send(JSON.stringify(data));
        }
    });
}