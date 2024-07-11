import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const Trailer = () => {
  const { type, id } = useParams();
  const [videos, setVideos] = useState([]);
  const [details, setDetails] = useState(null);
  const [bestTrailer, setBestTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ended, setEnded] = useState(false); // State to track if the video has ended
  const [muted, setMuted] = useState(true);
  const youtubeRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=0304cd40d6c7f17cbdb0c3e763a71764&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, [type, id]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=0304cd40d6c7f17cbdb0c3e763a71764&language=en-US`
        );
        const json = await response.json();
        setVideos(json.results);

        let bestTrailerId = null;
        for (let video of json.results) {
          if (
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.name === "Official Trailer"
          ) {
            bestTrailerId = video.key;
            break;
          }
        }

        if (!bestTrailerId && json.results.length) {
          const anyTrailer = json.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
          );
          bestTrailerId = anyTrailer ? anyTrailer.key : null;
        }

        setBestTrailer(bestTrailerId);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    getVideos();
  }, [type, id]);

  const opts = {
    height: "390",
    width: "640",
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

  const handleStateChange = (event) => {
    if (event.data === 0) {
      // Video ended
      setEnded(true);
    } else if (event.data === 1) {
      // Video playing
      setEnded(false);
    }
  };

  const handlePlayVideo = () => {
    if (youtubeRef.current) {
      youtubeRef.current.internalPlayer.playVideo();
      setEnded(false);
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
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          {details && (
            <img
              src={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`}
              alt="Backdrop"
              width="100%"
              height="100%"
              className="w-full h-full object-cover opacity-60 xl:opacity-50"
            />
          )}
          <button
            onClick={handlePlayVideo}
            className="absolute p-[.6rem] hover:brightness-90 bg-white rounded-full flex items-center justify-center smoothie z-10"
            aria-label="Play Video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="#000000"
              stroke="#000000d5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-play"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      ) : (
        bestTrailer && (
          <YouTube
            opts={opts}
            ref={youtubeRef}
            videoId={bestTrailer}
            className="absolute top-0 left-0 w-full h-full"
            iframeClassName="w-full h-full z-10"
            onStateChange={handleStateChange}
          />
        )
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
      {ended && details && (
        <div className="absolute z-20 flex items-center justify-center">
          <div className="z-2 w-full h-full absolute justify-center bg-gradient-to-l from-transparent to-[#050505]"></div>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`}
            alt="Backdrop"
            width="100%"
            height="100%"
            className="w-full h-full object-cover"
          />
          <button
            onClick={handlePlayVideo}
            className="absolute p-[.6rem] hover:brightness-90 bg-white rounded-full flex items-center justify-center smoothie z-10"
            aria-label="Play Video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="#000000"
              stroke="#000000d5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-play"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Trailer;
