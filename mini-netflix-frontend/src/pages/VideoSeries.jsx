import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'


const VideoSeries = () => {
  const params = useParams();
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://192.168.61.103:5000/files/${params.foldername}`)
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
