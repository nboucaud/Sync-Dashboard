import { Navigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { PATHS } from "../../../utils/paths";
import { useEffect } from "react";
import { useConfirmation } from "./hooks/useConfirmation";
import { useAuth } from "../../../hooks/useAuth";
import { Loader } from "../../../components";

export const Confirmation = () => {
  const { profile, user } = useUser();
  const { session, isLoadingSession } = useAuth();
  const { mutateAsync } = useConfirmation();

  useEffect(() => {
    if (user && profile && session) mutateAsync();
  }, [user, profile, mutateAsync, session]);

  if (!isLoadingSession && !session) return <Navigate to={PATHS.Login} />;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100dvh" }}>
      <Loader />
    </div>
  );
};
