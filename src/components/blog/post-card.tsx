import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, User } from "lucide-react";
import type { Post } from "@/types/post.type";

interface PostCardProps {
  post: Post;
  variant?: "default" | "featured";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
      {post.imageUrl && (
        <div
          className={`relative overflow-hidden ${isFeatured ? "h-80" : "h-48"}`}
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.status === "APPROVED" && (
            <Badge className="absolute top-4 left-4 bg-green-600">
              Published
            </Badge>
          )}
        </div>
      )}
      <CardContent className={isFeatured ? "p-8" : "p-6"}>
        <div className="space-y-3">
          <h3
            className={`font-semibold leading-tight transition-colors group-hover:text-primary ${
              isFeatured ? "text-3xl" : "text-xl"
            }`}
          >
            {post.description}
          </h3>

          <p
            className={`text-muted-foreground line-clamp-2 ${isFeatured ? "text-base" : "text-sm"}`}
          >
            {post.title}
          </p>

          <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="" />
                <AvatarFallback>
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span>Author</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
