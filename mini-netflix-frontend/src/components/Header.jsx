import styles from "../componentCss/Header.module.css";
import { useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>N</div>

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
          </ul>
        ) : (
          <button className={styles.signInButton}>Sign In</button>
        )}
      </div>
    </header>
  );
};
