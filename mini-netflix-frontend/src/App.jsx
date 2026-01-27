import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import VideoPlayer from './pages/VideoPlayer'
import VideoSeries from './pages/VideoSeries'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/folder/:foldername' element={<VideoSeries />} />
        <Route path="/watch/:videoPath" element={<VideoPlayer />} />
      </Routes>
    </>
  )
}

export default App
