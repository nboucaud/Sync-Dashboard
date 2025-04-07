import { Navbar } from "../../../components";
import { LoginModal } from "./components";
import styles from "./styles.module.scss";

import { Navigate } from "react-router-dom";
import { PATHS } from "../../../utils/paths";
import { useAuth } from "../../../hooks/useAuth";
const Login = () => {
  const { session } = useAuth();
  if (session) return <Navigate to={PATHS.Dashboard} />;

  return (
    <>
      <Navbar />
      <div className={styles.LoginScreen}>
        <LoginModal />
      </div>
    </>
  );
};

export default Login;
