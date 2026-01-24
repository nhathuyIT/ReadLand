import type { Post } from "@/types/post.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Card
      className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 border-2"
      onClick={handleClick}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {post.imageUrl && (
          <div className="relative overflow-hidden h-64 lg:h-80">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <Badge className="absolute top-6 left-6 bg-orange-600 text-white gap-1">
              Featured
            </Badge>
          </div>
        )}

        <CardContent className="p-10 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time>{new Date(post.createdAt).toLocaleDateString()}</time>
            </div>

            <h2 className="text-4xl font-bold leading-tight transition-colors group-hover:text-primary">
              {post.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>

            <div className="flex items-center gap-3 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {post.view} reads
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
