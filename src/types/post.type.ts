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
  // paragraph: string;
  createdAt: string;
  updatedAt: string;
}
