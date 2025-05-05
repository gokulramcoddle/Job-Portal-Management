import { JSX } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute<T extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<T>
  ) {
    return function AuthWrapper(props: T) {
      const isLoggedIn = Boolean(localStorage.getItem("token"));
  
      if (!isLoggedIn) {
        return <Navigate to="/login" />;
      }
  
      return <Component {...props} />;
    };
  }
  