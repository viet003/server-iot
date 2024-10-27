import * as historyService from "../services/historyServices"
const WebSocket = require('ws');

export const getHistoryController = async (clients, client) => {
    try {
        const rs = await historyService.getAllHistoriesService();
        sendBack(clients,client,rs);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
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