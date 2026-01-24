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
export interface SignupPayload {
  username: string;
  password: string;
}
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

export async function getPostById(postId: string): Promise<Post> {
  const { data } = await api.get<Post>(`/post/${postId}`);
  return data;
}

export async function updatePostStatus(
  postId: string,
  status: Post["status"],
): Promise<Post> {
  console.log(`API: Updating post ${postId} to status ${status}`);
  console.log(`API URL: ${DEVMOCK_API}/post/${postId}`);

  const { data } = await api.put<Post>(`/post/${postId}`, {
    status,
    updatedAt: new Date().toISOString(),
  });

  console.log("API response:", data);
  return data;
}

export async function getPostsByStatus(
  status?: Post["status"],
): Promise<Post[]> {
  const params = status ? { status } : {};
  const { data } = await api.get<Post[]>("/post", { params });
  return data;
}

export const signup = async (payload: SignupPayload): Promise<User> => {
  // Directly create new user (POST)
  const { data: user } = await api.post<User>("/user", payload);
  return user;
};
