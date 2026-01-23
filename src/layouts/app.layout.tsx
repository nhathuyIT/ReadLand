import { AuthProvider } from "@/context/auth-context";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "@/components/blog/header";

const AppLayout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/logout"];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      <AuthProvider>
        {showHeader && <Header />}
        <Outlet />
        <Toaster position="top-center" />
      </AuthProvider>
    </>
  );
};

export default AppLayout;
