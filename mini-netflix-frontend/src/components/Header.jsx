import styles from "../componentCss/Header.module.css";
import { useNavigate } from "react-router-dom";

export const Header = ({ isLoggedIn, setIsLoggedIn, setShowLogin }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        N
      </div>

      {isLoggedIn && (
        <ul className={styles.mainNav}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>My List</li>
        </ul>
      )}
      <div className={styles.rightControls}>
        {isLoggedIn ? (
          <ul className={styles.profileNav}>
            <li>Search</li>
            <li>Profile Avatar</li>
            <li onClick={handleLogoutClick}>Sign Out</li>
          </ul>
        ) : (
          <button className={styles.signInButton} onClick={handleLoginClick}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
