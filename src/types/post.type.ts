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
  createdAt: string;
  updatedAt: string;
  paragraph: string;
}

export interface CreatePostInput {
  title: string;
  description: string;
  topic: string;
  imageUrl?: string;
  status: "DRAFT" | "PENDING";
  createdAt?: string;
  updatedAt?: string;
  paragraph: string;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}

// Helper type for components that need status type
export type PostStatus = Post["status"];
