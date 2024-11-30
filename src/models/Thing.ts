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
      type: Switch,
      required: false,
    },
  ],
});

export default model("Thing", thingSchema);
