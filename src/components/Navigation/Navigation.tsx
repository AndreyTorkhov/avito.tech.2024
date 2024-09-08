import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/orders"
        className={styles.link}
        style={({ isActive }: { isActive: boolean }) => ({
          backgroundColor: isActive ? "#002aff" : "#fff",
          color: isActive ? "#fff" : "#000",
        })}
      >
        Заказы
      </NavLink>
    </nav>
  );
}

export default Navigation;
