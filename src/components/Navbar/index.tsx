import NavbarLogo from "../../assets/sync-logo.png";
import styles from "./styles.module.scss";
export const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.NavbarContainer}>
        <img src={NavbarLogo} alt="Navbar logo" className={styles.NavbarLogo} />
        <button className={styles.NavbarBtn}>SUPPORT</button>
      </div>
    </nav>
  );
};
