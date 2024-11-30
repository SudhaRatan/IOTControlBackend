"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Switch_1 = __importDefault(require("./Switch"));
const thingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    switches: [
        {
            type: Switch_1.default,
            required: false,
        },
    ],
});
exports.default = (0, mongoose_1.model)("Thing", thingSchema);
