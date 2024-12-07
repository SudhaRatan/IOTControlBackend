import { Schema, model } from "mongoose";
const switchSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  thingId: {
    type: Schema.Types.ObjectId,
    ref: "Thing",
  },
  switchId: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
  },
});

export default model("Switch", switchSchema);
