// src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileUploader from './components/FileUploader';
import Playlist from './components/Playlist';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const handleFileUpload = (file) => {
    setAudioFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleAudioSelect = (index) => {
    setCurrentAudioIndex(index);
  };

  const handlePlaybackEnd = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handleNext = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handlePrevious = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex - 1 + audioFiles.length) % audioFiles.length);
  };

  useEffect(() => {
    localStorage.setItem('currentAudioIndex', currentAudioIndex);
  }, [currentAudioIndex]);

  useEffect(() => {
    const savedIndex = localStorage.getItem('currentAudioIndex');
    if (savedIndex) {
      setCurrentAudioIndex(Number(savedIndex));
    }
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1 className="text-light">Audio Player</h1>
      </header>
      <div className="main-content">
        <div className="row">
          <div className="col-md-3">
            <Playlist audioFiles={audioFiles} onAudioSelect={handleAudioSelect} />
          </div>
          <div className="col-md-6">
            <AudioPlayer
              audioFile={audioFiles[currentAudioIndex]}
              onPlaybackEnd={handlePlaybackEnd}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        </div>
        <FileUploader onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default App;
