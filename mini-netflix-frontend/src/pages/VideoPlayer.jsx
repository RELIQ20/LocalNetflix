import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../pagesDesign/VideoPlayer.module.css";
import MovieCard from "../components/MovieCard"; // Bring in your reusable card!

const VideoPlayer = () => {
  const URL = import.meta.env.VITE_URL;
  const params = useParams();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);

  const videoSource = `${URL}:5000/video/${encodeURIComponent(params.videoPath)}`;

  useEffect(() => {
    axios
      .get(`${URL}:5000/movies`)
      .then((response) => {
        const shuffledMovies = response.data.sort(() => 0.5 - Math.random());

        setRecommendations(shuffledMovies.slice(0, 5));
      })
      .catch((err) => console.error("Failed to fetch recommendations:", err));
  }, [URL]);

  const handleRecommendationClick = (folderName) => {
    navigate(`/folder/${encodeURIComponent(folderName)}`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.videoWrapper}>
        <video
          key={videoSource}
          className={styles.videoPlayer}
          autoPlay
          controls
          controlsList="nodownload"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src={videoSource} />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className={styles.recommendationsSection}>
        <h2>More Like This</h2>
        <div className={styles.recommendationsGrid}>
          {recommendations.map((movie) => (
            <MovieCard
              key={movie._id}
              mainClass={styles.card}
              imageClass={styles.poster}
              posterImage={movie.posterImage}
              title={movie.title}
              onCardClick={() => handleRecommendationClick(movie.folderName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
