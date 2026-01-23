import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { RoleCode, User } from "@/types/user.type";
import { login as apiLogin } from "@/api/api";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  role: RoleCode;
  isLoading: boolean;
  hasRole: (r: RoleCode) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const hasRole = useCallback(
    (r: RoleCode) => !!user && user.role === r,
    [user],
  );

  const login = useCallback(
    async (username: string, password: string) => {
      const loggedInUser = await apiLogin(username, password);
      if (!loggedInUser) throw new Error("Invalid username or password");

      setUser(loggedInUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));

      if (loggedInUser.role === 0) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    },
    [navigate],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate("/", { replace: true });
  }, [navigate]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      role: user?.role ?? 0,
      isLoading,
      hasRole,
      login,
      logout,
    }),
    [user, isLoading, hasRole, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
