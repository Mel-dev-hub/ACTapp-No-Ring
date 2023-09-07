import React from "react";
import PropTypes from "prop-types";
import './YoutubeEmbed.css';
import YouTube from "react-youtube";
import { useState } from "react";
import { addExerciseLog } from "../../api/firestoreApi";

const YoutubeEmbed = ({ embedId, videoId }) => {

  const [videoStarted, setVideoStarted] = useState(false);
  
  const handleOnPlay = (e) => {
    if(!videoStarted){
      setVideoStarted(true);
      addExerciseLog("VIDEO PLAYED", videoId);
    }
  };

  const handleOnEnd = (e) => {
    setVideoStarted(false);
    addExerciseLog("VIDEO COMPLETED", videoId);
  };

  return (
   <div className="video-responsive">
    <YouTube
        videoId={embedId}
        onPlay={(e) => handleOnPlay(e)}
        onEnd={(e) => handleOnEnd(e)}
      />
  </div>
);

}
YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;