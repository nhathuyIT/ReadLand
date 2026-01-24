import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Calendar, TrendingUp } from "lucide-react";
import type { Post } from "@/types/post.type";

interface PostDetailSidebarProps {
  post: Post;
}

export function PostDetailSidebar({ post }: PostDetailSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Author Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About the Author</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Author Name</p>
              <p className="text-sm text-muted-foreground">Writer</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Passionate about sharing knowledge and insights.
          </p>
        </CardContent>
      </Card>

      {/* Post Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Post Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>Views</span>
            </div>
            <span className="font-semibold">{post.view}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Published</span>
            </div>
            <span className="text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Share Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Share this post</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Share this article with your network
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
