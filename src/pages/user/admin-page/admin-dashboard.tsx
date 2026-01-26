import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Eye,
  Calendar,
  Filter,
  User,
} from "lucide-react";
import type { Post } from "@/types/post.type";
import type { User as userpost } from "@/types/user.type";
import { getPosts, getUserById } from "@/api/api";
import { useAdminOperations } from "@/hooks/use-admin-operations";

// Component to fetch and display username
const UserName = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<userpost | null>(null);
  console.log(user?.id);
  const [username, setUsername] = useState<string>(
    userId ? "Loading..." : "Unknown",
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
        setUsername(fetchedUser.username);
      } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        setUsername("Unknown");
      }
    };

    fetchUser();
  }, [userId]);

  return <span>{username}</span>;
};

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "REJECTED"
  >("ALL");
  const [updatingPostIds, setUpdatingPostIds] = useState<Set<string>>(
    new Set(),
  );

  const {
    handleStatusUpdate,
    error: adminError,
    clearError,
  } = useAdminOperations();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleStatusChange = async (
    postId: string,
    newStatus: Post["status"],
  ) => {
    try {
      clearError();
      setUpdatingPostIds((prev) => new Set([...prev, postId]));

      console.log(`Updating post ${postId} to status: ${newStatus}`);
      const updatedPost = await handleStatusUpdate(postId, newStatus);
      console.log("Updated post:", updatedPost);

      // Update local state
      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? updatedPost : post)),
      );
    } catch (error) {
      console.error("Error updating post status:", error);
    } finally {
      setUpdatingPostIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || post.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Prioritize PENDING first
      const statusPriority = {
        PENDING: 1,
        APPROVED: 2,
        REJECTED: 3,
        DRAFT: 4,
      };

      const priorityA = statusPriority[a.status] || 5;
      const priorityB = statusPriority[b.status] || 5;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If same status, sort by newest creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getStatusBadge = (status: Post["status"]) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge
            variant="default"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="destructive"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "DRAFT":
        return (
          <Badge
            variant="secondary"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Draft
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPostStats = () => {
    const pending = posts.filter((p) => p.status === "PENDING").length;
    const approved = posts.filter((p) => p.status === "APPROVED").length;
    const rejected = posts.filter((p) => p.status === "REJECTED").length;
    return { pending, approved, rejected, total: posts.length };
  };

  const stats = getPostStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage and approve posts</p>
        {adminError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{adminError}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearError}
              className="mt-2 text-red-700 hover:text-red-800"
            >
              Close
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Posts
                </p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approved
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.approved}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Rejected
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Filter className="h-4 w-4 mt-2.5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as typeof statusFilter)
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Posts List ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No posts found
              </div>
            ) : (
              filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Post Image */}
                    {post.imageUrl && (
                      <div className="lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Post Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-2 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>
                                User's name: <UserName userId={post.userId} />
                              </span>
                              <span></span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(post.createdAt).toLocaleDateString(
                                  "en-US",
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.view} views</span>
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(post.status)}
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-sm font-medium">Topic:</span>
                        <Badge variant="outline">{post.topic}</Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:w-32">
                      {post.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusChange(post.id, "APPROVED")
                            }
                            className="bg-green-600 hover:bg-green-700"
                            disabled={updatingPostIds.has(post.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            {updatingPostIds.has(post.id)
                              ? "Processing..."
                              : "Approve"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleStatusChange(post.id, "REJECTED")
                            }
                            disabled={updatingPostIds.has(post.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            {updatingPostIds.has(post.id)
                              ? "Processing..."
                              : "Reject"}
                          </Button>
                        </>
                      )}
                      {post.status === "APPROVED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(post.id, "REJECTED")
                          }
                          disabled={updatingPostIds.has(post.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          {updatingPostIds.has(post.id)
                            ? "Processing..."
                            : "Revoke"}
                        </Button>
                      )}
                      {post.status === "REJECTED" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(post.id, "APPROVED")
                          }
                          className="bg-green-600 hover:bg-green-700"
                          disabled={updatingPostIds.has(post.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          {updatingPostIds.has(post.id)
                            ? "Processing..."
                            : "Re-approve"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
