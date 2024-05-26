import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';

const Trailer = () => {
  const { type, id, season, episode } = useParams();
  const [videos,setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState(6);

  const getVideos = async () => {
    try {
      await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=0304cd40d6c7f17cbdb0c3e763a71764&language=en-US`)
       .then(res => res.json())
       .then(json => setVideos(json.results.filter(video => video.type!== 'Featurette' && video.type!== 'chip')));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    getVideos()
  }, [])

  const opts = {
    height: '180',
    width: '360',
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleVideoEnd = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const loadMoreVideos = () => {
    setLoadedVideos(loadedVideos + 2);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
      {videos.slice(0, loadedVideos).map((video, index) => (
        <div key={video.key} style={{ marginRight: '10px' }}>
          <YouTube
            id="youtube-player"
            videoId={video.key}
            opts={opts}
            onReady={(event) => {
               {
                event.target.stopVideo();
              }
            }}
            onEnd={handleVideoEnd}
          />
          <div style={{ marginTop: '10px' }}>
            <h3>{video.name}</h3>
            <p>{video.type} - {new Date(video.published_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
      {loadedVideos < videos.length && <button onClick={loadMoreVideos}>Load More</button>}
    </div>
  );
};

export default Trailer;