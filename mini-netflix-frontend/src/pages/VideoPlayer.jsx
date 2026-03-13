import { useParams } from "react-router-dom"

const VideoPlayer = () => {

  const URL = import.meta.env.VITE_URL;
  const params = useParams()

  const videoSource = `${URL}:5000/video/${encodeURIComponent(params.videoPath)}`
  return (
    <>
      <h1>Trying to play: {videoSource}</h1>
      <video key={videoSource} width="800" height="450" disablePictureInPicture controls autoplay controlsList="nodownload" disableRemotePlayback>
        <source src={videoSource} />
      </video>
    </>
  )
}

export default VideoPlayer
