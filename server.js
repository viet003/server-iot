import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import initRoutes from "./src/routes";
import ConnectDB from "./src/config/connectDB";
import * as wsControllers from "./src/controllers/wsControllers";
var admin = require("firebase-admin");

dotenv.config();

// Firebase Admin SDK Initialization
var serviceAccount = require("./iot-messing-firebase-adminsdk-gzx1d-bfa7c735b7.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// WebSocket Setup
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set(); // Set to store connections

// Express App Setup
const app = express();

app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
ConnectDB();

// Starting the Server
const port = process.env.PORT || 2025;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${server.address().port}.....`);
});


// WebSocket Client Connection Handling

let isStopHandling = false;

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected');

    ws.on('message', (message) => {
        try {

            const _message = JSON.parse(message);
            console.log(_message);

            if (isStopHandling && _message.sender === 'esp8266') {
                console.log('Tạm dừng xử lý thông điệp từ Esp8266:', _message);
                return;
            }

            switch (_message.sender) {
                case "react":
                    switch (_message.type) {
                        case "get_data":
                            wsControllers.getDataController(clients, ws);
                            break;
                        case "cmd":
                            wsControllers.sendToOther(clients, ws, _message);
                            break;
                        case "info":
                            if (_message?.body?.card_id && _message?.body?.card_id !== "") {
                                wsControllers.handleGuestExit(clients, _message?.body?.card_id);
                                return;
                            }
                            break;
                        default:
                            console.log("Unknown React message type:", _message.type);
                            break;
                    }
                    break;
                case "esp8266":
                    stopHandlingMessage();
                    switch (_message.type) {
                        case "cmd_in":
                            console.log("Xứ lý vào với Card ID:", _message?.body?.id);
                            wsControllers.handleCmdIn(clients, ws, _message?.body?.id);
                            break;
                        case "cmd_out":
                            console.log("Xứ lý ra với Card ID:", _message?.body?.id);
                            wsControllers.handleCmdOut(clients, ws, _message?.body?.id);
                            break;
                        case "cmd_close":
                            console.log("Xứ lý đóng cổng");
                            wsControllers.handleCmdClose(clients);
                            break;
                        default:
                            console.log("Không hiểu kiểu yêu cầu xử lý:", _message.type);
                            break;
                    }
                    break;
                default:
                    console.log("Unknown sender:", _message.sender);
                    break;
            }
        } catch (error) {
            console.error("Không thể xử lý:", error);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});


// stop handling
const stopHandlingMessage = (duration = 2000) => {
    if (isStopHandling) return; // back nếu đa đã dừng xử lý
    isStopHandling = true;
    console.log('Message handling paused');
    setTimeout(() => {
        isStopHandling = false;
        console.log('Message handling resumed');
    }, duration);
};
