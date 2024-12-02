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
  switchIds: [
    {
      type: Schema.Types.ObjectId,
      required: false,
    },
  ],
  icon:{
    type: String,
  }
});

export default model("Thing", thingSchema);
