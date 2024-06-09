import { TMDB_URL, TMDB_API_KEY } from "../services/Tmdb";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Card, CardBody, Image } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const Watchplayer = ({ type, id, season, episode }) => {
  const [player, setPlayer] = useState("vidsrc");
  const [details, setDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(episode || 1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          const filteredData = data.results.filter(
            (item) => item.vote_average > 0
          );
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
          const filteredData = data.results.filter(
            (item) => item.vote_average > 0
          );
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
          : `https://vidsrc.pro/embed/${type}/${id}?&theme=00c1db&s=${selectedSeason}&e=${selectedEpisode}`;
      case "MultiEmbed":
        return type === "movie"
          ? `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`
          : `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`;
      case "vidsrc":
        return type === "movie"
          ? `https://vidsrc.to/embed/movie/${id}`
          : `https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
      case "autoembed":
        return type === "movie"
          ? `https://player.autoembed.cc/embed/movie/${id}`
          : `https://player.autoembed.cc/embed/tv/${id}/${selectedSeason}/${selectedEpisode}/`;
      case "vidsrc2":
        return type === "movie"
          ? `https://vidsrc.xyz/embed/movie?tmdb=${id}`
          : `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`;
      default:
        return "";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const seasonItems = [];
  if (details) {
    for (
      let seasonNumber = 1;
      seasonNumber <= details.number_of_seasons;
      seasonNumber++
    ) {
      seasonItems.push(
        <SelectItem
          key={seasonNumber.toString()}
          value={seasonNumber.toString()}
        >
          Season {seasonNumber}
        </SelectItem>
      );
    }
  }

  return (
    <div className="relative w-full max-w-7xl xl:rounded-lg aspect-[16/11] sm:!aspect-video bg-white/5 mx-auto shadow-xl overflow-hidden">
      <div style={{ height: "100%", width: "100%" }}>
        <div style={{ position: "absolute", zIndex: 1, left: 10, top: 10 }}>
          <select
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="p-3 text-base w-32"
          >
            <option value="vidsrc">VidSrc</option>
            <option value="vidsrcpro">Vidsrcpro</option>
            <option value="MultiEmbed">MultiEmbed</option>
            <option value="autoembed">AutoEmbed (MultiLanguage)</option>
            <option value="vidsrc2">vidsrc2</option>
          </select>
        </div>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}
        >
          {showSidebar ? (
            <IoCloseOutline className="h-8 w-8 " />
          ) : (
            <IoIosMenu className="h-8 w-8" />
          )}
        </button>
        <iframe
          allowFullScreen
          src={getPlayerUrl()}
          width="100%"
          height="100%"
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: showSidebar ? 0 : "-300px",
          width: "300px",
          height: "100%",
          background: "rgba(0, 0, 0, 0.8)",
          zIndex: 2,
          overflowY: "auto",
          padding: "20px",
          transition: "right 0.3s ease-in-out",
        }}
      >
        {type === "tv" && (
          <div className="ml-2 pt-2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
              Seasons
            </h2>
            <div className="text-white">
              <Select
                label="Select Season"
                variant="flat"
                placeholder="Select a season"
                className="max-w-xs mb-2"
                value={String(selectedSeason)}
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
              >
                {seasonItems}
              </Select>
            </div>
          </div>
        )}

        {type === "tv" && (
          <div className="p-3 text-white z-20">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Episodes - Season {selectedSeason}{" "}
              <span className="text-sm text-gray-600">({episodes.length})</span>
            </h2>
            <div className="grid grid-cols-1">
              {episodes.map((episode) => (
                <Card key={episode.id} className="text-center mb-6" shadow>
                  <Image
                    onClick={() => {
                      setSelectedEpisode(episode.episode_number);
                      navigate(
                        `/watch/${type}/${id}/${selectedSeason}/${episode.episode_number}`
                      );
                    }}
                    isZoomed
                    src={
                      episode.still_path
                        ? `https://image.tmdb.org/t/p/original/${episode.still_path}`
                        : "/not-found.png"
                    }
                    alt={episode.name}
                    className="w-full h-auto rounded-lg cursor-pointer"
                  />
                  <CardBody>
                    <h3 className="text-base md:text-lg mt-2 mb-2 overflow-hidden">
                      {episode.episode_number}.{" "}
                      {episode.name.length > 30
                        ? `${episode.name.substring(0, 30)}...`
                        : episode.name}
                    </h3>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {type === "movie" && (
          <div className="p-3 text-white z-20">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Recommended
            </h2>
            <div className="grid grid-cols-1">
              {recommendations.map((movie) => (
                <Link
                  key={movie.id}
                  className="relative flex mb-2 flex-col group gap-2 w-auto rounded-lg flex-shrink-0"
                  to={
                    movie.first_air_date
                      ? `/info/tv/${movie.id}`
                      : `/info/movie/${movie.id}`
                  }
                >
                  <div>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title || movie.name}
                    />
                    <div className="absolute top-1 right-0 gap-1 bg-[#00000098] py-1 px-[5px] rounded-l-md flex items-center justify-center z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="gold"
                        stroke="gold"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span className="!text-xs font-light">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    <div className="absolute opacity-0 xl:group-hover:opacity-100 flex top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 smoothie">
                      <span className=" p-[.6rem] hover:brightness-90 bg-white rounded-full flex items-center justify-center smoothie">
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
                      </span>
                    </div>
                    <div className="flex opacity-1 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
                      <div className="flex md:items-center justify-center gap-1 flex-wrap text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide">
                        <span>
                          {movie.release_date || movie.first_air_date}
                        </span>
                        •
                        <span className="whitespace-nowrap">
                          <span className="uppercase">{type}</span>
                        </span>
                        •<span>HD</span>
                      </div>
                      <div className="line-clamp-2 text-center text-sm font-medium !leading-tight">
                        {movie.title || movie.name}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchplayer;
