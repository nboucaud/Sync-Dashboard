import { Navigate } from "react-router-dom";
import { Loader, Navbar } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { TallyPopup } from "./components/TallyPopup";
import { PATHS } from "../../utils/paths";
import { useUser } from "../../hooks/useUser";

const Onboarding = () => {
  const { session } = useAuth();
  const { profile, isLoading } = useUser();
  if (!session) return <Navigate to={PATHS.Login} />;

  if (isLoading) return <Loader />;
  if (profile?.is_verified && profile?.timer_expiration) return <Navigate to={PATHS.Dashboard} />;
  return (
    <div>
      <Navbar />
      <TallyPopup />
    </div>
  );
};

export default Onboarding;
