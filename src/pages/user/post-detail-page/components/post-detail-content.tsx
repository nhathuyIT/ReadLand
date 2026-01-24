import type { Post } from "@/types/post.type";

interface PostDetailContentProps {
  post: Post;
}

export function PostDetailContent({ post }: PostDetailContentProps) {
  return (
    <div className="space-y-8">
      {/* Featured Image */}
      {post.imageUrl && (
        <div className="relative w-full h-96 rounded-xl overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-foreground">
          {post.paragraph}
        </p>
        {/* Add more content sections here as needed */}
      </div>
    </div>
  );
}
