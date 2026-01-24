import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PostDetailHeader,
  PostDetailContent,
  PostDetailSidebar,
  RelatedPosts,
} from "./components";
import { getPostById } from "@/api/api";
import usePosts from "@/hooks/use-post";
import type { Post } from "@/types/post.type";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);

    async function fetchPost() {
      if (!id) {
        setError("Post ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">
            {error || "Post not found"}
          </p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  // Filter related posts (same topic, exclude current)
  const relatedPosts = posts
    .filter((p) => p.topic === post.topic && p.id !== post.id && p.status === "APPROVED")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <PostDetailHeader post={post} />
            <Separator />
            <PostDetailContent post={post} />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <PostDetailSidebar post={post} />
            </div>
          </aside>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto px-4 py-12">
          <Separator className="mb-12" />
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
