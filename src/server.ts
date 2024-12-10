import { DeviceId, Switch, controlData, joinData } from "./types";
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
import { verifyJWT } from "./utils/socket";

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

const io = new Server(server, { cors: { origin: "*" } });

const devices = new Map<DeviceId, Switch[]>()

io.on("connection", (socket) => {
  console.log("Connected");

  socket.emit("join");

  socket.on("join", ({ deviceId, token, device }: joinData) => {
    verifyJWT(token).then(() => {
      socket.join(deviceId);
      if (device) {
        devices.set(device.deviceId, device.switches)
      }
      io.sockets.in(deviceId).emit("data", devices.get(deviceId));
    }).catch(() => { })
  });

  socket.on("control", function ({ deviceId, switchId, switchState }: controlData) {
    const switches = devices.get(deviceId)
    const changedSwitches = switches?.map((s) => {
      if (s.switchId == switchId) {
        s.switchState = switchState
      }
      return s
    })
    if (changedSwitches) {
      devices.set(deviceId, changedSwitches)
      io.sockets.in(deviceId).emit("data", changedSwitches);
    }
  });
});

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
