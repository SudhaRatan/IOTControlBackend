import { Request } from "express";

// Device handling
export interface Device {
  deviceId: string;
  switches: Switch[];
}

export type SwitchId = string
export type DeviceId = string

export type SwitchState = "HIGH" | "LOW" | "HOFF"

export interface Switch {
  switchId: SwitchId
  switchState: SwitchState
}

export type UserID = string

//Room types
export interface joinData {
  deviceId: string
  token: string
  device?: Device
}

export interface controlData {
  deviceId: string
  switchId: string
  switchState: SwitchState
}

// Auth types
export interface login {
  email: string;
  password: string;
}
export interface register extends login {
  name: string;
}

export interface AuthenticatedRequest extends Request {
  userId: string;
}
