import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";

export const ProtectPrivateLayout = ({ children }: { children: ReactNode }) => {
  const { session, isLoadingSession } = useAuth();

  if (isLoadingSession) return <h1>LOADING.....</h1>;
  if (!session?.user) return <Navigate to={PATHS.Login} />;
  return children;
};
