import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { PATHS } from "../../../../../utils/paths";

export const LoginModal = () => {
  return (
    <div className={styles.LoginModal}>
      <div className={styles.FillerWrapper}>
        <span className={styles.title}>I don’t think I recognize you! Want to join the Club?</span>
        <span className={styles.subtitle}>
          Our mission is to put money back into the hands of business owners like you. Stop missing appointments, Sync Ahead!
        </span>
      </div>

      <div className={styles.LoginForm}>
        <span className={styles.loginTitle}>Welcome Back</span>
        <span className={styles.loginSubtitle}>Please login to continue to your account.</span>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="example@mail.com" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="************" />
          </div>

          <button>Sign in</button>
        </form>{" "}
        <div className={styles.redirectSignup}>
          <span>Need an account?</span>
          <Link to={PATHS.Signup}>Create one</Link>
        </div>
      </div>
    </div>
  );
};
