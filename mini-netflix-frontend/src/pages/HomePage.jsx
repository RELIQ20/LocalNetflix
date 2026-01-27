import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react"

const HomePage = () => {

  const [Movies, SetMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.168.61.103:5000/movies')
      .then(response => SetMovies(response.data))
  }, [])

  function handleFolderName(foldername) {
    navigate(`/folder/${foldername}`)
  }

  return (
    <>
      {Movies.map(movie => (
        <div key={movie._id}>
          <h1 onClick={() => handleFolderName(movie.folderName)}>{movie.title}</h1>
        </div>
      ))}
    </>
  )
}

export default HomePage
