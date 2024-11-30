import { Schema, model } from "mongoose";
const userschema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default model("User", userschema);
