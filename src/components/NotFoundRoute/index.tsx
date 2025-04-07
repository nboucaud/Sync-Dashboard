import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const NotFoundRoute = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.NotFound}>
      <h1>Route not really found 😢</h1>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};
