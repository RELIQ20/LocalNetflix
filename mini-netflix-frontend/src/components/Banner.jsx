import styles from "../componentCss/Banner.module.css";
import placeholder from "../assets/notfound.png";

const Banner = ({ title, plot, posterImage }) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.posterWrapper}>
        <img
          src={posterImage && posterImage !== "N/A" ? posterImage : placeholder}
          alt={title}
          className={styles.poster}
        />
      </div>

      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.plot}>{plot}</p>
      </div>
    </div>
  );
};

export default Banner;
