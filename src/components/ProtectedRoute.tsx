
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { isAuthenticated, token } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // This ensures we've loaded the auth state from persist storage
    const checkAuth = async () => {
      try {
        // Small timeout to ensure Zustand persist has loaded
        setTimeout(() => {
          setIsChecking(false);
        }, 500);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
