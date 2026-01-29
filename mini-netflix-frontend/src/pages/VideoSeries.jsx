import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'


const VideoSeries = () => {
  const params = useParams();
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate()


  const URL = import.meta.env.VITE_URL;
  useEffect(() => {
    axios.get(`${URL}:5000/files/${params.foldername}`)
      .then(response => setEpisodes(response.data));
  }, [])

  function handleSubfolderName(movie) {
    const fullPath = encodeURIComponent(`${params.foldername}/${movie}`);
    navigate(`/watch/${fullPath}`);
  }

  return (
    <>
      {episodes.map(movie => (
        <div key={movie}>
          <h1 onClick={() => handleSubfolderName(movie)}>{movie}</h1>
        </div>
      ))
      }
    </>
  )
}

export default VideoSeries
