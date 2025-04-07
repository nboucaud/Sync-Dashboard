import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { PATHS } from "../../../../../utils/paths";
import { FieldValues, useForm } from "react-hook-form";
import { useSignup } from "../../hooks/useSignup";

export const SignupModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { signupMutation, isPending } = useSignup();

  const handleRegistation = async (data: FieldValues) => {
    await signupMutation(data);
  };

  return (
    <div className={styles.SignupForm}>
      <span className={styles.loginTitle}>Welcome to Sync </span>
      <span className={styles.loginSubtitle}>Please provide your personal informations.</span>
      <form onSubmit={handleSubmit((data) => handleRegistation(data))}>
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" disabled={isPending} {...register("full_name", { required: true })} placeholder="John Doe" />
          {errors.full_name && <span className={styles.warning}>This field is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" disabled={isPending} {...register("email", { required: true })} placeholder="example@mail.com" />
          {errors.email && <span className={styles.warning}>This field is required</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" disabled={isPending} {...register("password", { required: true })} placeholder="************" />
          {errors.password && <span className={styles.warning}>This field is required</span>}
        </div>

        <button disabled={isPending}>Sign up</button>
      </form>
      <div className={styles.redirectLogin}>
        <span>Already have an account?</span>
        <Link to={PATHS.Login}>Login</Link>
      </div>
    </div>
  );
};
