// src/components/SongDetails.js
import React, { useState, useEffect } from 'react';
import defaultThumbnail from '../media/defaultThumbnail.jpg'; // Replace with the correct path
import musicIcon from '../media/Music.png'; // Replace with the correct path

const SongDetails = ({ audioFile }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      if (audioFile) {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          setThumbnailUrl(fileReader.result);
        };

        if (audioFile.thumbnail) {
          // If the song has a thumbnail property, try to read it as a file
          try {
            const response = await fetch(audioFile.thumbnail);
            const blob = await response.blob();
            fileReader.readAsDataURL(blob);
          } catch (error) {
            console.error('Error fetching thumbnail:', error);
          }
        } else {
          // If no thumbnail property, use the default thumbnail
          setThumbnailUrl(defaultThumbnail);
        }
      }
    };

    fetchThumbnail();
  }, [audioFile]);

  return (
    <div className="song-details">
      {audioFile && (
        <>
          <marquee>
            <span className="marquee-content">
              <img src={musicIcon} alt="Music Icon" className="music-icon" />
              {` ${audioFile.name} - ${audioFile.artists} | Album: ${audioFile.album}`}
            </span>
          </marquee>
          <img
            src={thumbnailUrl || defaultThumbnail}
            alt="Song Thumbnail"
            className="thumbnail"
          />
        </>
      )}
    </div>
  );
};

export default SongDetails;
