import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TMDB_URL, TMDB_API_KEY } from "../services/Tmdb";
import  Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";
import Spinner from "../components/Loading";

const Watch = () => {
  const { type, id, season, episode } = useParams();
  const [player, setPlayer] = useState("vidsrcpro");
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${TMDB_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDetails(data);

        const castResponse = await fetch(
          `${TMDB_URL}/${type}/${id}/credits?api_key=${TMDB_API_KEY}`
        );
        if (castResponse.ok) {
          const castData = await castResponse.json();
          setCast(castData.cast);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [type, id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `${TMDB_URL}/${type}/${id}/recommendations?api_key=${TMDB_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.results.filter(item => item.vote_average > 0);
          setRecommendations(filteredData);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();

    const fetchSimilar = async () => {
      try {
        const response = await fetch(
          `${TMDB_URL}/${type}/${id}/similar?api_key=${TMDB_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.results.filter(item => item.vote_average > 0);
          setSimilar(filteredData);
        }
      } catch (error) {
        console.error("Error fetching similar:", error);
      }
    };

    fetchSimilar();
  }, [type, id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (type === "tv") {
        const response = await fetch(
          `${TMDB_URL}/${type}/${id}/season/${selectedSeason}?api_key=${TMDB_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          const filteredEpisodes = data.episodes.filter(episode => episode.vote_average > 0);
          setEpisodes(filteredEpisodes);
        }
      }
    }
  });


  useEffect(() => {
    const fetchEpisodes = async () => {
      if (type === "tv") {
        const response = await fetch(
          `${TMDB_URL}/${type}/${id}/season/${selectedSeason}?api_key=${TMDB_API_KEY}`
        );
        if (response.ok) {
          const data = await response.json();
          setEpisodes(data.episodes);
        }
      }
    };

    fetchEpisodes();
  }, [type, id, selectedSeason]);

  const getPlayerUrl = () => {
    switch (player) {
      case "vidsrcpro":
        return type === "movie"
          ? `https://vidsrc.pro/embed/${type}/${id}?&theme=00c1db`
          : `https://vidsrc.pro/embed/${type}/${id}?&theme=00c1db`;
      case "MultiEmbed":
        return type === "movie"
          ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
          : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      case "vidsrc":
        return type === "movie"
          ? `https://vidsrc.to/embed/movie/${id}`
          : `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
      case "autoembed":
        return type === "movie"
          ? `https://player.autoembed.cc/embed/movie/${id}`
          : `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}/`;
      case "vidsrc2":
        return type === "movie"
          ? `https://vidsrc.xyz/embed/movie?tmdb=${id}`
          : `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      default:
        return "";
    }
  };


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto overflow-auto">
      <div className="fixed top-0 left-0 z-[-1] blur-sm h-screen w-full bg-white/5">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`}
          className="w-full h-full object-cover !opacity-40"
          alt="Backdrop"
        />
      </div>
      <div>
        <div className="pt-16 lg:pb-8 xl:pb-14 w-full relative align-left overflow-hidden flex flex-wrap xl:flex-col">
          <div className="w-full mx-auto text-gray-300 p-2 sm:p-3 flex justify-between">
            <div className="!hidden sm:!flex gap-2 w-full">
              <Link className="hover:underline underline-offset-2 !line-clamp-1" href="/">Home</Link>
              <span>/</span>
              <Link className="hover:underline capitalize underline-offset-2 !line-clamp-1" href={`/explore?type=${type}`}>{type}</Link>
              <span>/</span>
              <Link className="text-[#00c1db] hover:underline underline-offset-2 !line-clamp-1 shrink-0" href={`/info/${type}/${details.id}`}>
                {details.title || details.name}
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full sm:px-2 flex-wrap">
            <div className="w-full max-w-7xl xl:rounded-lg relative aspect-[16/11] sm:!aspect-video bg-white/5 mx-auto shadow-xl overflow-hidden">
            <div style={{ height: "100%", width: "100%" }}>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <select
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          className="p-3 text-base"
        
        >
          <option value="vidsrcpro">Vidsrcpro</option>
          <option value="MultiEmbed">MultiEmbed</option>
          <option value="vidsrc">VidSrc</option>
          <option value="autoembed">AutoEmbed (MultiLanguage)</option>
          <option value="vidsrc2">vidsrc2</option>
        </select>
      </div>
      <iframe
        allowFullScreen
        src={getPlayerUrl()}
        width="100%"
        height="100%"
        
      />
    </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-3">
          <div className="w-full max-w-7xl 2xl:max-w-[113rem] gap-5 lg:gap-7 flex flex-col md:flex-row mx-auto my-5 md:my-8">
            <div className="hidden md:block w-[20%] flex-shrink-0 select-none h-fit rounded-lg shadow-md overflow-hidden aspect-[1/1.5] bg-white/10">
              <img
                src={`https://image.tmdb.org/t/p/w780/${details.poster_path}`}
                className="w-full object-cover aspect-[1/1.5]"
                alt="Poster"
              />
            </div>
            <div className="flex w-full lg:w-[70%] md:w-[80%] flex-col gap-2">
              <span className="text-[22px] lg:text-3xl mb-1 line-clamp-3 w-full font-semibold tracking-wide !leading-tight">
                {details.title || details.name}
              </span>
              <div className="flex flex-shrink-0 gap-2 mb-1 flex-wrap items-center">
                {details.genres.map(genre => (
                  <a
                    key={genre.id}
                    className="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium bg-[#00c1db33] rounded-md text-[#00c1db]"
                    href={`/explore?type=${type}&genre=${genre.id}`}
                  >
                    {genre.name}
                  </a>
                ))}
              </div>
              <div className="mb-1 p-2 bg-white/10 rounded-lg leading-snug">
                <span className="text-white/70 font-light !line-clamp-4 text-pretty text-sm lg:text-sm">
                  {details.overview}
                </span>
              </div>
              <div className="flex flex-col flex-wrap gap-[.6rem] lg:gap-[.4rem] tracking-wide">
                <div className="text-xs line-clamp-1 lg:text-sm font-medium">
                  Date: <span className="font-light tracking-wider">{details.release_date || details.first_air_date}</span>
                </div>
                <div className="text-xs line-clamp-1 lg:text-sm font-medium">
                  Rating: <span className="font-light">{details.vote_average}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="w-[95%] bg-white/10 h-[1px] mt-10 mx-auto max-w-7xl"></div>
        <div className="m-4">
        {similar.length > 0 ? (
                <MovieRow items={similar} title="similar"/>
              ) : (
                
                <p className="ml-2 text-lg">No similar movies/shows found.</p>
              )}
        </div>
        <div className="m-4">
          {recommendations.length > 0 ? (
                <MovieRow items={recommendations} title="Recommendations"/>
              ) : (
                <p className="ml-2 text-lg">No recommended movies/shows found.</p>
              )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Watch;
