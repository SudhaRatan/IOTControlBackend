"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "50mb" }));
const port = process.env.PORT;
mongoose_1.default.connect(process.env.DB_URL, {
    family: 4,
});
const db = mongoose_1.default.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));
// const wss = new WebSocketServer({ server });
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    console.log("Connected");
    socket.emit("join");
    socket.on("join", (data) => {
        socket.join(data);
        io.sockets.in(data).emit("data", Object.values(relays).join(""));
    });
    socket.on("control", function (data) {
        console.log(data);
        switch (data.type) {
            case "D0":
                relays.d0 = data.data;
                break;
            case "D1":
                relays.d1 = data.data;
                break;
            case "D2":
                relays.d2 = data.data;
                break;
            case "D4":
                relays.d3 = data.data;
                break;
        }
        io.sockets.in(data.room).emit("data", Object.values(relays).join(""));
    });
});
var relayCollection = [];
var relays = {
    d0: "0",
    d1: "0",
    d2: "0",
    d3: "0",
};
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "/Static")));
app.get("/", function (req, res) {
    res.send("Working");
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
