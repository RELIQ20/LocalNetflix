import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VideoPlayer from "./pages/VideoPlayer";
import VideoSeries from "./pages/VideoSeries";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLogin={setShowLogin}
      />

      {showLogin && (
        <AuthModal setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />
          }
        />
        <Route path="/folder/:foldername" element={<VideoSeries />} />
        <Route path="/watch/:videoPath" element={<VideoPlayer />} />
      </Routes>
    </>
  );
}

export default App;
