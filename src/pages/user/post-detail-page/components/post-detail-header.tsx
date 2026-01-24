import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, User } from "lucide-react";
import type { Post } from "@/types/post.type";

interface PostDetailHeaderProps {
  post: Post;
}

export function PostDetailHeader({ post }: PostDetailHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Topic Badge */}
      <div>
        <Badge className="text-sm px-4 py-1">{post.topic}</Badge>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        {post.title}
      </h1>

      {/* Description */}
      <p className="text-xl text-muted-foreground leading-relaxed">
        {post.description}
      </p>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Author</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time>{new Date(post.createdAt).toLocaleDateString()}</time>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span>{post.view} views</span>
        </div>
      </div>
    </div>
  );
}
