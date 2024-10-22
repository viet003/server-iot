import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import initRoutes from "./src/routes";
import { WebSocketServer } from "ws";  

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",  
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const port = process.env.PORT || 2025;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${server.address().port}.....`);
});

// Tạo WebSocket server sử dụng cùng HTTP server
const wss = new WebSocketServer({ server });

// Xử lý các kết nối WebSocket
wss.on('connection', function connection(ws) {
    console.log('A new WebSocket client connected!');

    // Xử lý khi nhận được tin nhắn từ client
    ws.on('message', function incoming(message) {
        console.log('Received:', message);

        // Gửi phản hồi lại cho client
        ws.send('Message received: ' + message);
    });

    // Xử lý khi client ngắt kết nối
    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});
