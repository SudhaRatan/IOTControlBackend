import Express from "express";
import { login } from "../types";
import User from "../models/User";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

const router = Express.Router();

router.route("/").post(async (req, res) => {
  const { email, password }: login = req.body;
  const user = await User.findOne({ email: email });
  if (user == null) {
    res.status(404).json({ message: "User does not exist" });
  } else {
    if (user.password && (await compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.access_token!);
      res.json({ token: token, user: user._id });
    } else {
      res.status(402).json({ message: "Wrong password" });
    }
  }
});

router.route("/register").post(async (req, res) => {
  const { email, password } = req.body as login;
  if (!email || !password) {
    res.status(404).json({ message: "Please fill email and password fields" });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const pass = await hash(password, 10);
    const user1 = new User({
      email: email,
      password: pass,
    });
    await user1.save();
    res.json({ status: true });
  }
});

export default router