import type { Post } from "@/types/post.type";
import { PostCard } from "./post-card";

interface PostGridProps {
  posts: Post[];
  columns?: 2 | 3 | 4;
}

export function PostGrid({ posts, columns = 3 }: PostGridProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
