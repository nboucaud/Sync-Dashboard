import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { PATHS } from "../../../../../utils/paths";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";

export const LoginModal = () => {
  const { register, handleSubmit, watch } = useForm();
  const { loginMutation, isPending } = useLogin();
  const isSubmitDisabled = !(Boolean(watch("email")) && Boolean(watch("password")));
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
        <form onSubmit={handleSubmit((data) => loginMutation(data))}>
          <div>
            <label htmlFor="email">Email</label>
            <input disabled={isPending} type="email" placeholder="example@mail.com" {...register("email", { required: true })} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              disabled={isPending}
              type="password"
              placeholder="************"
              {...register("password", { required: true })}
            />
          </div>

          <button disabled={isSubmitDisabled || isPending}>Sign in</button>
        </form>{" "}
        <div className={styles.redirectSignup}>
          <span>Need an account?</span>
          <Link to={PATHS.Signup}>Create one</Link>
        </div>
      </div>
    </div>
  );
};
