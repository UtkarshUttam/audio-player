// src/components/AudioPlayer.js
import React, { useRef, useEffect } from 'react';
import SongDetails from './SongDetails';

const AudioPlayer = ({ audioFile, onPlaybackEnd, onNext, onPrevious }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioFile) {
      audioRef.current.src = URL.createObjectURL(audioFile);
      audioRef.current.play();
    }
  }, [audioFile]);

  return (
    <div className="audio-player-container">
      <SongDetails audioFile={audioFile} />
      <div className="audio-player-controls">
        <button onClick={onPrevious}>&lt; Previous</button>
        <audio ref={audioRef} controls onEnded={onPlaybackEnd} className="audio-player" />
        <button onClick={onNext}>Next &gt;</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
