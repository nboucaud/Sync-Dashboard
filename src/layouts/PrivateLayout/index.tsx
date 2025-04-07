import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaChartPie, FaStar } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

import styles from "./styles.module.scss";
import Logo from "../../assets/sync-logo.png";
import { PATHS } from "../../utils/paths";

export const PrivateLayout = () => {
  const path = useLocation();
  return (
    <div className={styles.PrivateLayout}>
      <div className={styles.Navigation}>
        <img src={Logo} />

        <ul className={styles.NavList}>
          <li className={path.pathname === PATHS.Dashboard ? styles.active : ""}>
            <FaHome color="#ffff" />
            <Link to={PATHS.Dashboard}>Home</Link>
          </li>
          <li>
            <FaChartPie color="#ffff" />
            <Link to={PATHS.Dashboard}>Payments</Link>
          </li>
          <li>
            <MdBusinessCenter color="#ffff" />
            <Link to={PATHS.Dashboard}>My Business</Link>
          </li>
          <li>
            <FaStar color="#ffff" />
            <Link to={PATHS.Dashboard}>Bookings</Link>
          </li>

          <li className={path.pathname === PATHS.Settings ? styles.active : ""}>
            <IoMdSettings color="#ffff" />
            <Link to={PATHS.Settings}>Settings</Link>
          </li>
        </ul>
      </div>
      <div className={styles.MainPortion}>
        <Outlet />
      </div>
    </div>
  );
};
