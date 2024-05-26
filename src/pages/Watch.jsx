import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { type, id, season, episode } = useParams();

  useEffect(() => {
    const iframeElement = document.querySelector("iframe");

    if (iframeElement) {
      if (iframeElement.requestFullscreen) {
        iframeElement.requestFullscreen();
      } else if (iframeElement.mozRequestFullScreen) {
        iframeElement.mozRequestFullScreen();
      } else if (iframeElement.webkitRequestFullscreen) {
        iframeElement.webkitRequestFullscreen();
      } else if (iframeElement.msRequestFullscreen) {
        iframeElement.msRequestFullscreen();
      }
    }

    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
  }, []); 
  return (
    <iframe
      allowFullScreen
      src={
        type === "movie"
          ? ` https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
          : ` https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
      }
      width="100%"
      height="100%"
      style={{
        height: "100vh",
        width: "100%",
      }}
    />
  );
};

export default Watch;
