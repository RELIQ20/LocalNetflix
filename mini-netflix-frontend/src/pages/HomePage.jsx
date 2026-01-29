import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from '../pagesDesign/HomePage.module.css';


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
        <div key={movie._id} className={styles.body}>
          <h1 onClick={() => handleFolderName(movie.folderName)}>{movie.title}</h1>
        </div>
      ))}
    </>
  )
}

export default HomePage
