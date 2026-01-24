import type { User } from "@/types/user.type";
import axios from "axios";

const DEVMOCK_API = import.meta.env.VITE_DEVMOCK_API;
const api = axios.create({
  baseURL: DEVMOCK_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface SignupPayload {
  username: string;
  password: string;
}

export const signup = async (payload: SignupPayload): Promise<User> => {
  // Directly create new user (POST)
  const { data: user } = await api.post<User>("/user", payload);
  return user;
};
