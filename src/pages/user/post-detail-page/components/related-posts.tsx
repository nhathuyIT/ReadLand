import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import type { Post } from "@/types/post.type";
import { useNavigate } from "react-router-dom";

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const navigate = useNavigate();

  if (posts.length === 0) return null;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <Card
            key={post.id}
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            {post.imageUrl && (
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight transition-colors group-hover:text-primary line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
                  <Calendar className="h-3 w-3" />
                  <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
