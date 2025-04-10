import { useTimer } from "react-timer-hook";
import { useUser } from "../../../hooks/useUser";
import { Loader, Navbar } from "../../../components";
import { Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "../../../utils/paths";
import styles from "./styles.module.scss";
import { useAuth } from "../../../hooks/useAuth";

export const Waitlist = () => {
  const navigate = useNavigate();
  const { profile, isLoading } = useUser();
  const { session, isLoadingSession } = useAuth();

  const { totalSeconds, seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(profile?.timer_expiration || 0),
    onExpire: () => {
      if (profile) return navigate(PATHS.Dashboard);
    },
    interval: 20,
  });

  if (!isLoadingSession && !session) return <Navigate to={PATHS.Login} />;
  if (isLoading)
    return (
      <div className={styles.LoaderScreen}>
        <Loader />
      </div>
    );
  if (totalSeconds === 0 && profile) return <Navigate to={PATHS.Dashboard} />;

  return (
    <>
      <Navbar />
      <div className={styles.WaitlistScreen}>
        <div className={styles.container}>
          <h1>You are on waitlist</h1>
          <p>When timer ends, you will automatically be redirected to dashboard</p>

          <div className={styles.timer}>
            <div>
              <span className={styles.placeholder}>DAYS</span>
              <span className={styles.timeValue}>{days}</span>
            </div>

            <div>
              <span className={styles.placeholder}>HOURS</span>
              <span className={styles.timeValue}>{hours}</span>
            </div>
            <div>
              <span className={styles.placeholder}>MIN</span>
              <span className={styles.timeValue}>{minutes}</span>
            </div>

            <div>
              <span className={styles.placeholder}>SEC</span>
              <span className={styles.timeValue}>{seconds}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
