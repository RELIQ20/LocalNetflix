import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from '../pagesDesign/HomePage.module.css';
import MovieCard from "../components/MovieCard";


const HomePage = () => {
  const [Movies, SetMovies] = useState([]);
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    axios.get(`${URL}:5000/movies`)
      .then(response => SetMovies(response.data))
  }, [])

  function handleFolderName(foldername) {
    navigate(`/folder/${foldername}`)
  }

  return (
    <>
      <div className={styles.container}>
        {Movies.map(movie => (
          <MovieCard
            key={movie._id}
            mainClass={styles.card}
            posterImage={movie.posterImage}
            imageClass={styles.poster}
            onCardClick={() => handleFolderName(movie.folderName)}
            title={movie.title}
          />
        ))}
      </div>
    </>
  )
}

export default HomePage
