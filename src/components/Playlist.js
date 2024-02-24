// src/components/Playlist.js
import React from 'react';

const Playlist = ({ audioFiles, onAudioSelect }) => {
  return (
    <div className="playlist-container">
      <h2>Playlist</h2>
      <ul>
        {audioFiles.map((file, index) => (
          <li key={index} onClick={() => onAudioSelect(index)}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
