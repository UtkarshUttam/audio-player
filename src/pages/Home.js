import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import Playlist from '../components/Playlist';
import { theme } from '../styles';

const Home = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('audioFiles')) || [];
    setFiles(storedFiles);

    const lastPlayedFileIndex = parseInt(localStorage.getItem('lastPlayedFileIndex'), 10) || 0;
    setCurrentFileIndex(lastPlayedFileIndex);
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFiles = [...files, { name: selectedFile.name, data: reader.result }];
        setFiles(newFiles);
        localStorage.setItem('audioFiles', JSON.stringify(newFiles));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePlay = (index) => {
    setCurrentFileIndex(index);
    localStorage.setItem('lastPlayedFileIndex', index);
  };

  const handleEnded = () => {
    if (currentFileIndex < files.length - 1) {
      handlePlay(currentFileIndex + 1);
    }
  };

  const containerStyle = {
    backgroundColor: theme.primaryBg,
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: theme.textColor,
  };

  return (
    <div style={containerStyle}>
      <h1>Audio Player App</h1>
      <input type="file" accept=".mp3" onChange={handleFileChange} />
      {files.length > 0 && (
        <>
          <AudioPlayer src={files[currentFileIndex].data} onEnded={handleEnded} />
          <Playlist files={files} onPlay={handlePlay} />
        </>
      )}
    </div>
  );
};

export default Home;
