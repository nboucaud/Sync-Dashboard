import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { Loader } from "../Loader";
import styles from "./styles.module.scss";
import { useUser } from "../../hooks/useUser";

export const ProtectPrivateLayout = ({ children }: { children: ReactNode }) => {
  const { session, isLoadingSession } = useAuth();
  const { profile, isLoading: isLoadingUser } = useUser();

  if (isLoadingSession || isLoadingUser)
    return (
      <div className={styles.ProtectScreen}>
        <Loader />
      </div>
    );
  if (!session?.user) return <Navigate to={PATHS.Login} />;

  if (!profile?.is_verified || !profile?.timer_expiration) return <Navigate to={PATHS.Onboarding} />;

  const timerExpiration = new Date(profile.timer_expiration);
  const currentTime = new Date();

  if (currentTime >= timerExpiration) return children;
  else return <Navigate to={PATHS.Waitlist} />;
};
