import Row from "../components/CastRow";
import Footer from "../components/Footer";
import Spinner from "../components/Loading";
import MovieRow from "../components/MovieRow";
import Navbar from "../components/Navbar";
import Trailer from "../components/Trailer";
import { auth, db } from "../services/Firebase";
import { TMDB_URL, TMDB_API_KEY } from "../services/Tmdb";
import {
  Card,
  CardFooter,
  Image,
  CardBody,
  Button,
  Spinner as CSpinner,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createToast } from "vercel-toast";

const InfoPage = () => {
  const { type, id } = useParams();
  const [details, setDetails] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOverview, setExpandedOverview] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [cast, setCast] = useState([]);
  const [user, setUser] = useState(false);
  const [userID, setUserID] = useState();
  const [watchlistLoading, setWatchlistLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleOverview = (episodeId) => {
    setExpandedOverview((prevState) => ({
      ...prevState,
      [episodeId]: !prevState[episodeId],
    }));
  };

  const qFunc = async (user_id) => {
    const q = query(
      collection(db, "watchlist"),
      where("userID", "==", user_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().type === type && doc.data().id === id) {
        setWatchlist(true);
        setWatchlistLoading(false);
      }
    });
    setWatchlistLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(true);
        setUserID(user.uid);
        qFunc(user.uid);
      } else {
        setUser(false);
        setWatchlistLoading(false);
      }
    });
  }, []);

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
    if (type === "tv" && id === "95479") {
      alert(
        "NOTE: The Second Season Episodes Of Jujutsu Kaisen Shows In Season 1 So Scroll Down To See Second Season Episodes"
      );
    } else {
      return;
    }
  }, [type, id]);

  // useEffect(() => {
  //   const fetchRecommendations = async () => {
  //     try {
  //       const response = await fetch(
  //         `${TMDB_URL}/${type}/${id}/recommendations?api_key=${TMDB_API_KEY}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setRecommendations(data.results);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching recommendations:", error);
  //     }
  //   };

  //   fetchRecommendations();

  //   const fetchSimilar = async () => {
  //     try {
  //       const response = await fetch(
  //         `${TMDB_URL}/${type}/${id}/similar?api_key=${TMDB_API_KEY}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setSimilar(data.results);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching similar:", error);
  //     }
  //   };

  //   fetchSimilar();
  // }, [type, id]);

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

  if (isLoading) {
    return <Spinner />;
  }

  let inProduction = "Unknown";
  if (details.last_episode_to_air) {
    const { episode_type, season_number } = details.last_episode_to_air;

    if (episode_type === "finale") {
      inProduction = "Ended";
    } else if (episode_type === "standard") {
      inProduction = `Now Airing: Season ${season_number}`;
    }
  }

  const addToWatchList = async (itemId, itemType) => {
    if (!user) {
      return createToast("You need to be logged in to use this feature.", {
        action: {
          text: "Login",
          callback(toast) {
            navigate("/login");
            toast.destroy();
          },
        },
        timeout: 3000,
        cancel: "Cancel",
        type: "dark",
      });
    }
    if (!userID) {
      return createToast("Please wait. Try again after 2 seconds.", {
        timeout: 2000,
        cancel: "Cancel",
        type: "dark",
      });
    }
    setWatchlistLoading(true);
    const docRef = await addDoc(collection(db, "watchlist"), {
      type: itemType,
      id: itemId,
      userID: userID,
    }).then(() => {
      setWatchlistLoading(false);
    });
    qFunc(userID);
  };

  const removeFromWatchlist = async (id, type) => {
    setWatchlistLoading(true);
    const q = query(collection(db, "watchlist"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data.type === type && data.id === id) {
        const docRef = doc.ref;
        await deleteDoc(docRef).then(() => {
          setWatchlist(false);
          setWatchlistLoading(false);
        });
      }
      qFunc(userID);
    });
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const seasonItems = [];
  for (
    let seasonNumber = 1;
    seasonNumber <= details.number_of_seasons;
    seasonNumber++
  ) {
    seasonItems.push(
      <SelectItem
        key={seasonNumber.toString()}
        value={seasonNumber.toString()}
        textValue={`Season ${seasonNumber}`}
        onClick={() => {
          setSelectedSeason(seasonNumber);
        }}
      >
        Season {seasonNumber}
      </SelectItem>
    );
  }

  return (
    <div className="h-screen w-full">
      <div className="fixed z-[-1] bottom-0 left-0 w-full h-screen">
        <span
          className="lazy-load-image-background opacity lazy-load-image-loaded"
          style={{
            color: "transparent",
            display: "inline-block",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280/${details.backdrop_path}`}
            width="100%"
            height="100%"
            className="w-full h-full object-cover opacity-60 xl:opacity-50"
            // blur
          />
        </span>
        <div id="opacity-layer-info"></div>
      </div>

      <div className="container mx-auto flex flex-col gap-9 md:gap-16">
        <Navbar />
        <div className="z-20">
          <Card
            radius="none"
            className="flex relative flex-col items-center justify-center gap-10 md:gap-3 text-white bg-transparent shadow-none"
          >
            <div className="mt-[75px] md:mt-[150px] gap-5 py-8 px-4 max-w-7xl mx-auto flex flex-col md:flex-row overflow-hidden relative w-full">
              {" "}
              <CardFooter
                radius="none"
                className="flex md:flex-row flex-col justify-center items-center"
              >
                <div className="flex md:pr-8 mb-4 md:mb-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300/${details.poster_path}`}
                    alt="Poster"
                    radius="lg"
                    className="w-48 md:w-64"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col gap-1 sm:gap-3">
                  <div className="flex flex-col gap-2 items-center md:items-start">
                    <div className="text-xl sm:text-2xl lg:text-3xl !uppercase line-clamp-3 !leading-tight text-center md:text-start font-bold">
                      <h1>{type === "movie" ? details.title : details.name}</h1>
                    </div>

                    <div className="flex gap-1 items-center">
                      <div className=" text-slate-300 text-sm tracking-wider">
                        {type === "movie" ? (
                          <span>{details.release_date}</span>
                        ) : (
                          <span>
                            {details.first_air_date} - {inProduction}
                          </span>
                        )}
                      </div>
                      <div className="gap-1 bg-[#00c1db17] py-1 px-2 rounded-md flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="gold"
                          stroke="gold"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span className="!text-xs font-medium">
                          {details.vote_average.toFixed(1)}
                        </span>
                      </div>
                      <span className="uppercase !text-sm text-slate-200">
                        {details.original_language}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 gap-2 flex-wrap justify-center md:justify-start items-center">
                    {details.genres.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/Explore?type=${type}&genre=${genre.id}`}
                        className="py-[6px] flex justify-center items-center text-center px-3 text-sm font-medium  bg-[#00c1db33] rounded-md text-[#00c1db]"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>

                  <div>
                    <p className="text-base md:text-lg">
                      {details.overview.length > 155 && !showFullText
                        ? `${details.overview.substring(0, 150)}...`
                        : details.overview}
                      {details.overview.length > 155 && (
                        <Button
                          className="p-0 bg-transparent outline-0 text-gray-400"
                          onClick={toggleText}
                        >
                          {showFullText ? "Read Less" : "Read More"}
                        </Button>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start">
                    <Button
                      className="hover:bg-[#dad6d6] bg-white text-black rounded-md"
                      startContent={<FaPlay />}
                      onClick={() => {
                        if (details.first_air_date) {
                          navigate(`/watch/tv/${details.id}/1/1`);
                        } else {
                          navigate(`/watch/movie/${details.id}`);
                        }
                      }}
                    >
                      Watch Now
                    </Button>

                    {watchlistLoading ? (
                      <Button
                        disabled
                        className="ml-2 bg-transparent ring-white gap-1 backdrop-blur group flex-shrink-0 text-sm md:text-base ring-1 p-2 rounded-md overflow-hidden hover:bg-white/10 justify-center items-center"
                      >
                        <CSpinner color="white" size="md" />
                      </Button>
                    ) : (
                      <>
                        {watchlist ? (
                          <Button
                            onClick={() => {
                              removeFromWatchlist(id, type);
                            }}
                            radius="full"
                            className="ml-2 ring-white bg-transparent gap-1 backdrop-blur group flex-shrink-0 text-sm md:text-base ring-1 p-2 rounded-md overflow-hidden hover:bg-white/10 justify-center items-center"
                          >
                            <span className="gap-1 flex justify-center items-center smoothie !duration-500 origin-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="white"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-heart"
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                              </svg>
                              Added
                            </span>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              addToWatchList(id, type);
                            }}
                            radius="full"
                            className="ml-2 ring-white bg-transparent gap-1 backdrop-blur group flex-shrink-0 text-sm md:text-base ring-1 p-2 rounded-md overflow-hidden hover:bg-white/10 justify-center items-center flex  "
                          >
                            <span className="gap-1 flex justify-center items-center smoothie !duration-500 origin-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="transparent"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-heart"
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                              </svg>
                              Add To List
                            </span>
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardFooter>
            </div>
          </Card>
        </div>
        <Trailer />
        <div>
          {type === "tv" && (
            <div className="ml-2 pt-2">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">
                Seasons
              </h2>
              <div className="text-white">
                <Select
                  label="Select Season"
                  variant="flat"
                  placeholder="Select an season"
                  className="max-w-xs mb-2"
                  defaultSelectedKeys={"1"}
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
                <span className="text-sm text-gray-600">
                  ({episodes.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {episodes.map((episode) => (
                  <Card key={episode.id} className="text-center mb-6" shadow>
                    <Image
                      onClick={() =>
                        navigate(
                          `/watch/${type}/${id}/${selectedSeason}/${episode.episode_number}`
                        )
                      }
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
                      <p
                        className={`text-xs md:text-sm ${
                          expandedOverview[episode.id]
                            ? "overflow-visible"
                            : "overflow-hidden"
                        }`}
                      >
                        {expandedOverview[episode.id]
                          ? episode.overview
                          : episode.overview.substring(0, 100)}
                        ...
                        {episode.overview.length > 100 && (
                          <button
                            className="underline ml-1 text-gray-400"
                            onClick={() => toggleOverview(episode.id)}
                          >
                            {expandedOverview[episode.id]
                              ? "Read Less"
                              : "Read More"}
                          </button>
                        )}
                      </p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className=" mb-2">
          <h2 className="text-2xl ml-2 md:text-3xl font-semibold mb-2 text-white">
            Cast
          </h2>
          <Row items={cast} />
        </div>

        <div className="m-3">
          {similar.length > 0 ? (
            <MovieRow items={similar} title="Similar" />
          ) : (
            <p className="ml-2 text-lg">No similar movies/shows found.</p>
          )}
        </div>
        <div className="m-4">
          {recommendations.length > 0 ? (
            <MovieRow items={recommendations} title="Recommendations" />
          ) : (
            <p className="ml-2 text-lg">No recommended movies/shows found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
