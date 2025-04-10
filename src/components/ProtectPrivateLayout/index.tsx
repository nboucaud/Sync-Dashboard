import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { Loader } from "../Loader";
import styles from "./styles.module.scss";

export const ProtectPrivateLayout = ({ children }: { children: ReactNode }) => {
  const { session, isLoadingSession } = useAuth();

  if (isLoadingSession)
    return (
      <div className={styles.ProtectScreen}>
        <Loader />
      </div>
    );
  if (!session?.user) return <Navigate to={PATHS.Login} />;
  return children;
};
