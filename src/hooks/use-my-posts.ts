import { useEffect, useReducer, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
import { useTimestamp } from "./use-create-update-at";
import type { Post, CreatePostInput } from "@/types/post.type";
import {
  getPostsByUserId,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from "@/api/api.post";
import { toast } from "sonner";

interface MyPostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

type MyPostsAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Post[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: MyPostsState = {
  posts: [],
  loading: false,
  error: null,
};

function myPostsReducer(
  state: MyPostsState,
  action: MyPostsAction,
): MyPostsState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useMyPosts() {
  const { user } = useAuth();
  const { getCurrentTimestamp } = useTimestamp();
  const [state, dispatch] = useReducer(myPostsReducer, initialState);

  const fetchPosts = useCallback(async () => {
    if (!user) return;

    dispatch({ type: "FETCH_START" });
    try {
      const data = await getPostsByUserId(user.id);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      // If API returns empty array, no error toast needed
      const message = (error as Error).message;
      dispatch({ type: "FETCH_ERROR", payload: message });
      console.error("Failed to fetch posts:", message);
      // Don't show toast for empty results, only for actual errors
      // toast is removed here to avoid confusing users with empty state
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = useCallback(
    async (postData: CreatePostInput) => {
      if (!user) {
        toast.error("You must be logged in to create a post");
        return;
      }

      try {
        const timestamp = getCurrentTimestamp();
        const newPost = await apiCreatePost({
          ...postData,
          userId: user.id,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
        // Refetch after success
        await fetchPosts();

        toast.success("Post created successfully", {
          description:
            postData.status === "DRAFT"
              ? "Saved as draft"
              : "Submitted for review",
        });
        return newPost;
      } catch (error) {
        const message = (error as Error).message;
        toast.error("Failed to create post", {
          description: message,
        });
        throw error;
      }
    },
    [user, fetchPosts, getCurrentTimestamp],
  );

  const updatePost = useCallback(
    async (id: string, postData: Partial<CreatePostInput>) => {
      try {
        const updatedPost = await apiUpdatePost(id, {
          ...postData,
          updatedAt: getCurrentTimestamp(),
        });
        // Refetch after success
        await fetchPosts();

        toast.success("Post updated successfully");
        return updatedPost;
      } catch (error) {
        const message = (error as Error).message;
        toast.error("Failed to update post", {
          description: message,
        });
        throw error;
      }
    },
    [fetchPosts, getCurrentTimestamp],
  );

  const deletePost = useCallback(
    async (id: string) => {
      try {
        await apiDeletePost(id);
        // Refetch after success
        await fetchPosts();

        toast.success("Post deleted successfully");
      } catch (error) {
        const message = (error as Error).message;
        toast.error("Failed to delete post", {
          description: message,
        });
        throw error;
      }
    },
    [fetchPosts],
  );

  return {
    ...state,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
}
