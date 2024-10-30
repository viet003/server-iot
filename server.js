import express from "express";
require('dotenv').config();
import cors from "cors";
import initRoutes from "./src/routes"
import ConnectDB from "./src/config/connectDB"
import * as wsControllers from "./src/controllers/wsControllers"

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set(); // Tập hợp để lưu các kết nối


const app = express();

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
ConnectDB();

const port = process.env.PORT || 2025;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${server.address().port}.....`);
});

wss.on('connection', (ws) => {
    // Thêm kết nối mới vào tập hợp clients
    clients.add(ws);
    console.log('Client connected');

    // Lắng nghe tin nhắn từ client
    ws.on('message', (message) => {
        try {
            const _message = JSON.parse(message)
            console.log(_message)
            switch (_message.sender) {
                case "react":
                    switch (_message.type) {
                        case "get_data":
                            wsControllers.getDataController(clients, ws);
                            break;
                        case "cmd":
                            wsControllers.sendToOther(clients, ws, _message);
                            break;
                        default:
                            break;
                    }
                    break;
                case "esp8266":
                    switch (_message.type) {
                        case "cmd":
                            wsControllers.sendToOther(clients, ws, _message);
                            break;
                        case "check":
                            wsControllers.checkLastController(clients, ws, _message?.body?.id);
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    console.log("Received message from an unknown sender");
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    });

    // Khi client đóng kết nối
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws); // Xóa kết nối khỏi tập hợp clients
    });
});