import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import initRoutes from "./src/routes";
import ConnectDB from "./src/config/connectDB";
import * as wsControllers from "./src/controllers/wsControllers";
var admin = require("firebase-admin");

// Firebase Admin SDK Initialization
dotenv.config();

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
wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected');

    // Handling messages from WebSocket clients
    ws.on('message', (message) => {
        try {
            const _message = JSON.parse(message);
            console.log(_message);

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
            console.error("Error processing message: ", error);
        }
    });

    // Handle WebSocket client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});
