import { getPosts } from "@/api/api";
import { useAuth } from "@/context/auth-context";
import type { Post } from "@/types/post.type";
import { useEffect, useReducer } from "react";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}
type PostsAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Post[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_POST"; payload: Post }
  | { type: "UPDATE_POST"; payload: Post }
  | { type: "DELETE_POST"; payload: string };

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

function postsReducer(state: PostsState, action: PostsAction): PostsState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_POST":
      return { ...state, posts: [...state.posts, action.payload] };
    case "UPDATE_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post,
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
}
function usePosts() {
  const { user, hasRole } = useAuth();
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    async function fetchPosts() {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await getPosts();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
      }
    }
    fetchPosts();
  }, []);

  return state;
}

export default usePosts;
