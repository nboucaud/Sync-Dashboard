import { Navbar } from "../../../components";
import { LoginModal } from "./components";
import styles from "./styles.module.scss";
const Login = () => {
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
