import type { Post } from "@/types/post.type";
import type { User } from "@/types/user.type";
import axios from "axios";

const DEVMOCK_API = import.meta.env.VITE_DEVMOCK_API;
const api = axios.create({
  baseURL: DEVMOCK_API,
  headers: {
    "Content-Type": "application/json",
  },
});
export const login = async (
  username: string,
  password: string,
): Promise<User | null> => {
  const { data: users } = await api.get<User[]>("/user", {
    params: { username },
  });
  const user = users.find(
    (u) => u.password === password && u.username === username,
  );
  return user || null;
};
export async function getPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/post");
  return data;
}
