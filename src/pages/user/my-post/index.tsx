import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  MyPostCard,
  PostFormDialog,
  PostStatusTabs,
} from "@/components/blog";
import { useMyPosts } from "@/hooks/use-my-posts";
import { useAuth } from "@/context/auth-context";
import type { Post, PostStatus, CreatePostInput } from "@/types/post.type";
import { PlusCircle, Loader2, FileText } from "lucide-react";

const MyPost = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<PostStatus | "ALL">("ALL");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>();

  const { posts, loading, error, createPost, updatePost, deletePost } =
    useMyPosts();

  const filteredPosts = useMemo(() => {
    if (activeTab === "ALL") return posts;
    return posts.filter((p) => p.status === activeTab);
  }, [posts, activeTab]);

  const statusCounts = useMemo(() => {
    const counts: Record<PostStatus | "ALL", number> = {
      ALL: posts.length,
      DRAFT: 0,
      PENDING: 0,
      APPROVED: 0,
      REJECTED: 0,
    };

    const validStatuses: PostStatus[] = ["DRAFT", "PENDING", "APPROVED", "REJECTED"];

    posts.forEach((post) => {
      // Only count if status is valid
      if (validStatuses.includes(post.status as PostStatus)) {
        counts[post.status as PostStatus]++;
      }
    });

    return counts;
  }, [posts]);

  const handleCreateClick = () => {
    setEditingPost(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setDialogOpen(true);
  };

  const handleDelete = async (postId: string) => {
    await deletePost(postId);
  };

  const handleSubmit = async (data: CreatePostInput) => {
    if (editingPost) {
      await updatePost(editingPost.id, data);
    } else {
      await createPost(data);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="text-center space-y-4">
          <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground">
            You need to be logged in to view your posts
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="text-center space-y-4">
          <div className="rounded-lg bg-destructive/10 p-4">
            <p className="text-destructive font-medium">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Posts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your blog posts and submissions
            </p>
          </div>
          <Button onClick={handleCreateClick} size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create New Post
          </Button>
        </div>

        {/* Status Tabs */}
        <PostStatusTabs
          activeTab={activeTab}
          onTabChange={setActiveTab as (tab: string) => void}
          counts={statusCounts}
        />

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center space-y-4 p-8">
              <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">
                  {activeTab === "ALL"
                    ? "No posts yet"
                    : `No ${activeTab.toLowerCase()} posts`}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "ALL"
                    ? "Create your first post to get started"
                    : `You don't have any ${activeTab.toLowerCase()} posts`}
                </p>
              </div>
              {activeTab === "ALL" && (
                <Button onClick={handleCreateClick}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Post
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <MyPostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <PostFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        post={editingPost}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MyPost;
