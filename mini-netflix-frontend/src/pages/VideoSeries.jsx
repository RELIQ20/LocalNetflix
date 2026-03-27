import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import MovieCard from "../components/MovieCard";
import Banner from "../components/Banner"; // 1. Import the new component
import styles from "../pagesDesign/HomePage.module.css";

const VideoSeries = () => {
  const params = useParams();
  const [movieContents, setMovieContents] = useState([]);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    axios
      .get(`${URL}:5000/files/${params.foldername}`)
      .then((response) => setMovieContents(response.data));
  }, [params.foldername]);

  function handleSubfolderName(fileName) {
    const fullPath = encodeURIComponent(`${params.foldername}/${fileName}`);
    navigate(`/watch/${fullPath}`);
  }

  const movieInfo = movieContents.length > 0 ? movieContents[0] : null;

  return (
    <div className={styles.pageContainer}>
      {/* 2. Pass the data into your clean new component */}
      {movieInfo && (
        <Banner
          title={movieInfo.title}
          plot={movieInfo.plot}
          posterImage={movieInfo.posterImage}
        />
      )}

      <h3 style={{ color: "white", paddingLeft: "40px", marginBottom: "20px" }}>
        Playable Files
      </h3>

      <div className={styles.container}>
        {movieContents.map((movie) => (
          <MovieCard
            key={movie._id}
            mainClass={styles.card}
            posterImage={movie.posterImage}
            imageClass={styles.poster}
            onCardClick={() => handleSubfolderName(movie.fileName)}
            title={movie.fileName}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSeries;
