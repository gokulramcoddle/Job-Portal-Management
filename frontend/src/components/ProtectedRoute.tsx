import { Navigate } from "react-router-dom";

export function ProtectedRoute(Component: React.ComponentType) {
    return function AuthWrapper() {
      const isLoggedIn = Boolean(localStorage.getItem("token"));
      if (!isLoggedIn) {
          return <Navigate to="/login" />;
      }
      return <Component />;
  };
}
