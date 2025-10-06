import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { accessToken } = useContext(AuthContext);

  // Si no hay token, redirige a la pantalla de login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza el componente hijo
  return <>{children}</>;
};
