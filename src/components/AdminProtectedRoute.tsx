import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-premank-bg to-premank-accent/20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-premank-primary mx-auto mb-4" />
          <p className="text-premank-primary font-playfair text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-premank-bg to-premank-accent/20 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center border border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-2xl font-playfair font-bold text-red-600 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            This area is restricted to Premank administrators only. You do not have the required permissions.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-premank-primary text-white rounded-md hover:bg-premank-primary/90 transition-colors font-medium"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
