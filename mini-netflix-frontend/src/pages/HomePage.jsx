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
      {Movies.map(movie => (
        <MovieCard
          key={movie._id}
          mainClass={styles.card}
          image={movie.image}
          imageClass={styles.poster}
          onCardClick={() => handleFolderName(movie.folderName)}
          title={movie.title}
        />

      ))}
    </>
  )
}

export default HomePage
