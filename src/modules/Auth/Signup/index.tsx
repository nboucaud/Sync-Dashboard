import { Navigate } from "react-router-dom";
import { Navbar } from "../../../components";
import { SignupModal } from "./components";
import styles from "./styles.module.scss";
import { PATHS } from "../../../utils/paths";
import { useAuth } from "../../../hooks/useAuth";

const Signup = () => {
  const { session } = useAuth();
  if (session) return <Navigate to={PATHS.Dashboard} />;

  return (
    <>
      <Navbar />
      <div className={styles.SignupScreen}>
        <SignupModal />
      </div>
    </>
  );
};

export default Signup;
