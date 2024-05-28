import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { type, id, season, episode } = useParams();
  const [player, setPlayer] = useState("multiembed");

  const getPlayerUrl = () => {
    switch (player) {
      case "multiembed":
        return type === "movie"
          ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
          : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      case "vidsrc.to":
        return type === "movie"
          ? `https://vidsrc.to/embed/movie/${id}`
          : `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
      case "autoembed":
        return type === "movie"
          ? `https://player.autoembed.cc/embed/movie/${id}`
          : `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}/`;
      case "vidsrc.xyz":
        return type === "movie"
        ? `https://vidsrc.xyz/embed/movie?tmdb=${id}`
        : `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      default:
        return "";
    }
  };

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
  }, [player]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1 }}>
        <select
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="multiembed">MultiEmbed</option>
          <option value="vidsrc.to">VidSrc</option>
          <option value="autoembed">AutoEmbed (MultiLanguage)</option>
          <option value="vidsrc.xyz">VidSrc2</option>
        </select>
      </div>
      <iframe
        allowFullScreen
        src={getPlayerUrl()}
        width="100%"
        height="100%"
        style={{
          height: "100vh",
          width: "100%",
        }}
      />
    </div>
  );
};

export default Watch;
