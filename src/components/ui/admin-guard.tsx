import { useAuth } from "@/context/auth-context";
import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";
const AdminGuard = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 0) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;
