import { Switch } from "./types";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
import path from "path";
import mongoose from "mongoose";
import auth from "./routes/auth";
import things from "./routes/things";
import switches from "./routes/switches";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT;

mongoose.connect(process.env.DB_URL!, {
  family: 4,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

// const wss = new WebSocketServer({ server });
const io = new Server(server, { cors: { origin: "*" } });

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

var relays: Switch = {
  d0: "0",
  d1: "0",
  d2: "0",
  d3: "0",
};

app.use(express.static(path.join(__dirname, "..", "/Static")));
app.use("/auth", auth);
app.use("/things", things);
app.use("/switches", switches);

app.get("/", function (req, res) {
  res.send("Working");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
