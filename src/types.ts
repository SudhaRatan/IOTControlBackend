import { Request } from "express";

export interface relay {
  room: string;
  switches: Switch[];
}

export interface Switch {
  [key: string]: string;
}

export interface login {
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  userId: string;
}
