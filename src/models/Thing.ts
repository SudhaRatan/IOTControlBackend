import { Schema, model } from "mongoose";
import Switch from "./Switch";
const thingSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  switches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Switch",
      required: false,
    },
  ],
  icon: {
    type: String,
  },
});

export default model("Thing", thingSchema);
