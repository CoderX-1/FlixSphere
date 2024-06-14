import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';

const Trailer = () => {
  const { type, id } = useParams();
  const [videos, setVideos] = useState([]);
  const [bestTrailer, setBestTrailer] = useState(null);
  const [muted, setMuted] = useState(true); 
  const [isPlaying, setIsPlaying] = useState(false);
  const youtubeRef = useRef(null);

  const getVideos = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=0304cd40d6c7f17cbdb0c3e763a71764&language=en-US`);
      const json = await response.json();
      setVideos(json.results);

      let bestTrailerId = null;
      for (let video of json.results) {
        if (video.site === 'YouTube' && video.type === 'Trailer' && video.name === 'Official Trailer') {
          bestTrailerId = video.key;
          break;
        }
      }

      if (!bestTrailerId && json.results.length) {
        const anyTrailer = json.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
        bestTrailerId = anyTrailer ? anyTrailer.key : null;
      }

      setBestTrailer(bestTrailerId);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVideos();
  }, [type, id]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      mute: muted ? 1 : 0,
      controls: 1,
      showinfo: 0,
      disablekb: 1,
      enablejsapi: 1,
      playsinline: 1,
      cc_load_policy: 0,
    },
  };

  const handlePlayVideo = () => {
    if (youtubeRef.current) {
      youtubeRef.current.internalPlayer.playVideo();
      setIsPlaying(true);
    }
  };

  // const handleMuteUnmute = () => {
  //   if (youtubeRef.current) {
  //     youtubeRef.current.internalPlayer.isMuted().then((muted) => {
  //       if (muted) {
  //         youtubeRef.current.internalPlayer.unMute();
  //         setMuted(false);
  //       } else {
  //         youtubeRef.current.internalPlayer.mute();
  //         setMuted(true);
  //       }
  //     });
  //   }
  // };

  return (
    <div className="relative aspect-video m-3">
      {bestTrailer && (
        <YouTube
          opts={opts}
          ref={youtubeRef}
          videoId={bestTrailer}
          className="absolute top-0 left-0 w-full h-full"
          iframeClassName=" w-full h-full z-10"
        />
      )}
      {/* <div className="absolute bottom-6 z-20 flex w-full items-center justify-end gap-2 px-10">
        <button
          aria-label={`${muted ? 'Unmute' : 'Mute'} video`}
          className="h-auto rounded-full bg-neutral-800 p-1.5 opacity-50 ring-1 ring-slate-400 hover:bg-neutral-800 hover:opacity-100 hover:ring-white focus:ring-offset-0 dark:bg-neutral-800 dark:hover:bg-neutral-800"
          onClick={handleMuteUnmute}
        >
          {muted ? (
            <span className="h-6 w-6" aria-hidden="true">🔇</span>
          ) : (
            <span className="h-6 w-6" aria-hidden="true">🔊</span>
          )}
        </button>
      </div> */}
    </div>
  );
};

export default Trailer;
