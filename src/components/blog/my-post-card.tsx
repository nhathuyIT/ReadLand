import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Calendar,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    FileEdit,
    XCircle,
} from "lucide-react";
import type { Post, PostStatus } from "@/types/post.type";

interface MyPostCardProps {
    post: Post;
    onEdit: (post: Post) => void;
    onDelete: (postId: string) => void;
}

const statusConfig: Record<
    PostStatus,
    {
        badge: string;
        text: string;
        icon: React.ComponentType<{ className?: string }>;
    }
> = {
    DRAFT: {
        badge: "bg-gray-500 hover:bg-gray-600",
        text: "Draft",
        icon: FileEdit,
    },
    PENDING: {
        badge: "bg-yellow-500 hover:bg-yellow-600",
        text: "Pending Review",
        icon: Clock,
    },
    APPROVED: {
        badge: "bg-green-600 hover:bg-green-700",
        text: "Approved",
        icon: CheckCircle,
    },
    REJECTED: {
        badge: "bg-red-600 hover:bg-red-700",
        text: "Rejected",
        icon: XCircle,
    },
};

export function MyPostCard({ post, onEdit, onDelete }: MyPostCardProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Safe config lookup with fallback
    const config = statusConfig[post.status] || statusConfig.DRAFT;
    const StatusIcon = config.icon;

    const handleDelete = () => {
        onDelete(post.id);
        setShowDeleteDialog(false);
    };

    return (
        <>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                {post.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <Badge className={`absolute left-4 top-4 ${config.badge}`}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {config.text}
                        </Badge>
                    </div>
                )}

                <CardContent className="p-6">
                    <div className="space-y-4">
                        {!post.imageUrl && (
                            <Badge className={config.badge}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {config.text}
                            </Badge>
                        )}

                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold leading-tight transition-colors group-hover:text-primary line-clamp-2">
                                {post.title}
                            </h3>

                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.description}
                            </p>

                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                    {post.topic}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{post.view}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => onEdit(post)}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            post "{post.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
