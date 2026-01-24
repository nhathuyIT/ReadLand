import { AuthProvider } from "@/context/auth-context";
import { Outlet, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import Header from "@/components/blog/header";
import { useEffect } from "react";
import { generateToken, messaging } from "@/config/firebase";
import { onMessage } from "firebase/messaging";

const AppLayout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/logout"];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification?.body);
    });
  }, []);
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
