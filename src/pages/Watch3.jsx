import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Watch2 = () => {
  const { type, id, season, episode } = useParams();

  useEffect(() => {
    const iframeElement = document.querySelector("iframe");

    if (iframeElement) {
      // Check if fullscreen mode is supported by the browser
      if (iframeElement.requestFullscreen) {
        iframeElement.requestFullscreen();
      } else if (iframeElement.mozRequestFullScreen) {
        // Firefox
        iframeElement.mozRequestFullScreen();
      } else if (iframeElement.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        iframeElement.webkitRequestFullscreen();
      } else if (iframeElement.msRequestFullscreen) {
        // IE/Edge
        iframeElement.msRequestFullscreen();
      }
    }

    // Cleanup when the component unmounts
    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    };
  }, []);

  return (
    <iframe
      allowFullScreen
      src={
        type === "movie"
          ? `https://estore.digital/embed1/player.php?id=${id}`
          : `https://estore.digital/embed1/player.php?id=${id}/${season}/${episode}/`
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

export default Watch2;
// https://embed.nxstreaming.site/movie/tmdb/${id}/
// https://embed.nxstreaming.site/tv/tmdb/${id}/S${season}/E${episode}/ 