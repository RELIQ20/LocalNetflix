import { useParams } from "react-router-dom"

const VideoPlayer = () => {

  const params = useParams()

  const videoSource = `http://192.168.61.103:5000/video/${encodeURIComponent(params.videoPath)}`
  return (
    <>
      <h3>Trying to play: {videoSource}</h3>
      <video key={videoSource} width="800" height="450" controls autoPlay>
        <source src={videoSource} />
      </video>
    </>
  )
}

export default VideoPlayer
