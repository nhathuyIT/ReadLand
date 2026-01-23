export interface User {
  id: string;
  role: RoleCode; //0: User, 1: Admin
  avatarUrl?: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
export type RoleCode = 0 | 1;
