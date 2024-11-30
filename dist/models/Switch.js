"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const switchSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    thingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Thing",
    },
    icon: {
        type: String,
    }
});
exports.default = (0, mongoose_1.model)("Switch", switchSchema);
