import express from "express";
require('dotenv').config();
import cors from "cors";
import initRoutes from "./src/routes"
import ConnectDB from "./src/config/connectDB"


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

