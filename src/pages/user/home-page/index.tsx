import { useState } from "react";
import {
  HeroSection,
  FeaturedPost,
  PostGrid,
  CategoryFilter,
} from "@/components/blog";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Clock, Zap } from "lucide-react";
import usePosts from "@/hooks/use-post";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { posts, loading, error } = usePosts();
  const approvedPosts = posts.filter((p) => p.status === "APPROVED");
  const featuredPost = approvedPosts[0];
  const recentPosts = approvedPosts.slice(1, 4);
  const morePosts = approvedPosts.slice(4);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0 || approvedPosts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <HeroSection />
        <div className="container mx-auto px-4 py-16">
          <p className="text-center text-muted-foreground">
            No approved posts available yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Featured Post */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            <h2 className="text-3xl font-bold">Featured Story</h2>
          </div>
          <FeaturedPost post={featuredPost} />
        </section>

        <Separator />

        {/* Recent Posts */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Clock className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold">Recent Articles</h2>
          </div>
          <PostGrid posts={recentPosts} columns={3} />
        </section>

        <Separator />

        {/* Category Filter */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Zap className="h-6 w-6 text-purple-600" />
            <h2 className="text-3xl font-bold">Explore by Topic</h2>
          </div>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </section>

        {/* More Posts */}
        <section>
          <PostGrid posts={morePosts} columns={3} />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
