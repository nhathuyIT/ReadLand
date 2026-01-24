import { useState, useCallback } from "react";
import { updatePostStatus } from "@/api/api";
import type { Post } from "@/types/post.type";

export function useAdminOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = useCallback(
    async (postId: string, newStatus: Post["status"]) => {
      setLoading(true);
      setError(null);

      try {
        const updatedPost = await updatePostStatus(postId, newStatus);
        setLoading(false);
        return updatedPost;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Có lỗi xảy ra";
        setError(errorMessage);
        setLoading(false);
        throw err;
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    handleStatusUpdate,
    clearError,
  };
}
