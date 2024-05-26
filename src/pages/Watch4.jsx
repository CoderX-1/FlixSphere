import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from 'react-youtube';

const Watch2 = () => {
  const { type, id, season, episode } = useParams();
  const [videos, setVideos] = useState([]);
  const [bestTrailer, setBestTrailer] = useState(null);
  const [muted, setMuted] = useState(true); 

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

      if (!bestTrailerId) {
        bestTrailerId = json.results[json.results.length - 1].key;
      }

      setBestTrailer(bestTrailerId);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
      mute: muted,
    },
  };
  
  const handleMuteUnmute = () => {
    setMuted(!muted);
  };

  

  return (
    <div>
      {bestTrailer && (
        <>
          <YouTube
          id="youtube-player"
            videoId={bestTrailer}
            opts={opts}
            onReady={(event) => {
              event.target.playVideo();
            }}
          />
          <button onClick={handleMuteUnmute}>{muted? 'Unmute' : 'Mute'}</button> 
        </>
      )}
      {!bestTrailer && (
        <p>No trailer available</p>
      )}
    </div>
  );
};

export default Watch2;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import YouTube from 'react-youtube';

// const Trailer = () => {
//   const { type, id, season, episode } = useParams();
//   const [bestTrailer, setBestTrailer] = useState(null);
// const [videos,setVideos] = useState([])
//   const [muted, setMuted] = useState(true); 

// const getVideos =async ()=>{
// try{
//     await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=0304cd40d6c7f17cbdb0c3e763a71764&language=en-US`)
//     .then(res => res.json())
//     .then(json => setVideos(json.results))

// }catch(err){
//     console.error(err)
// }
// }

// useEffect(()=>{
//     getVideos()
// })

//   const opts = {
//     height: '390',
//     width: '640',
//     playerVars: {
//       autoplay: 1,
//       showinfo: 0,
//       modestbranding: 1,
//       rel: 0,
//       mute: muted,
//     },
//   };
  
//   const handleMuteUnmute = () => {
//     setMuted(!muted);
//   };

  

//   return (
//     <div>
     
//      <YouTube
//           id="youtube-player"
//           videoId={videos[0]?.key}
//             opts={opts}
//             onReady={(event) => {
//               event.target.playVideo();
//             }}
//           />
     
//     </div>
//   );
// };

// export default Trailer;