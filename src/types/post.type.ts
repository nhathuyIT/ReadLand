export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  imageUrl?: string;
  slug: string;
  view: number;
  topic: string;
  paragraph: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    username: string;
    avatarUrl?: string;
  };
}

export interface CreatePostInput {
  title: string;
  description: string;
  paragraph: string;
  topic: string;
  imageUrl?: string;
  status: "DRAFT" | "PENDING";
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}

// Helper type for components that need status type
export type PostStatus = Post["status"];
