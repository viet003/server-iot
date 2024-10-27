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
    // // Gửi JSON message
    // ws.send(JSON.stringify({
    //     sender: "react",
    //     message: 'Welcome to the WebSocket server!',
    // }));

    // Lắng nghe tin nhắn từ client
    ws.on('message', (message) => {
        try {
            const _message = JSON.parse(message)
            switch (_message.sender) {
                case 'react':
                    console.log("Received message from react");
                    if(_message.type === "get_history") {
                        wsControllers.getHistoryController(clients,ws);
                    }
                    break;
                case 'esp8266':
                    console.log("Received message from esp8266");
                    if(_message.type && _message.type === "check_last") {
                        
                    }
                    break;
                default:
                    console.log("Received message from an unknown sender");
            }
        } catch (error) {
            console.log(error)
        }
        // // Phát tin nhắn đến tất cả client
        // clients.forEach((client) => {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
        //         client.send(JSON.stringify({ broadcast: `Broadcast: ${message}` }));
        //     }
        // });
    });

    // Khi client đóng kết nối
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws); // Xóa kết nối khỏi tập hợp clients
    });
});