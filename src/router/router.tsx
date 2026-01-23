import AppLayout from "@/layouts/app.layout";
import { HomePage, LoginPage, MyPost, MyProfile, SignupPage, PostDetailPage } from "@/pages/user";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/post/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/account",
        children: [
          {
            index: true,
            element: <Navigate to="/account/my-profile" replace />,
          },
          {
            path: "my-profile",
            element: <MyProfile />,
          },
          {
            path: "my-posts",
            element: <MyPost />,
          },
        ],
      },
    ],
  },
]);
