import { TMDB_API_KEY } from "../services/Tmdb";
import "./SliderStyles.css";
import {
  Button,
  Card,
  CardFooter,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlay, FaInfo } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const HeroSection = ({tvlink, movielink}) => {
  const { media_type, id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [randomMovie, setRandomMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        const movies = response.data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        setRandomMovie(movies[randomIndex]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div>
        {randomMovie && (
          <Card radius="none" className="mySwiper">
            <Image
              src={`https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`}
              className="z-0 w-full h-[80vh] object-cover"
              loading="lazy"
              removeWrapper
              radius="none"
            />
            <div className="z-10 w-full h-[80vh] absolute justify-center bg-gradient-to-l from-transparent to-[#050505]"></div>
            <CardFooter className="items-start flex-col overflow-hidden bottom-5 xs:bottom-10 py-1 absolute z-10 gap-1 sm:gap-2">
              
              <h1 className="line-clamp-2 text-white font-semibold leading-tight text-2xl md:text-3xl lg:text-4xl py-1 flex-shrink-0">
                {randomMovie.title || randomMovie.name}
              </h1>
              <div class="text-xs 2xl:text-sm tracking-wider text-white/90 flex gap-3 ">
                <span class="flex items-center gap-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="whitesmoke"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{randomMovie.vote_average.toFixed(1)}</span>
                </span>
                <span class="flex gap-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-calendar-range"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="4"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                    <path d="M17 14h-6"></path>
                    <path d="M13 18H7"></path>
                    <path d="M7 14h.01"></path>
                    <path d="M17 18h.01"></path>
                  </svg>
                  <span>{randomMovie.release_date || randomMovie.first_air_date}</span>
                </span>
                <span class="flex items-center gap-1 ">
                  <span class="uppercase">{randomMovie.original_language}</span>
                  <span>•</span>
                  <span>HD</span>
                </span>
              </div>
              <p className="leading-tight text-md !line-clamp-2 !md:line-clamp-3 lg:leading-snug sm:w-9/12 lg:w-3/6 w-full md:text-lg lg:text-xl text-gray-400">
                {randomMovie.overview}
              </p>
              <div className="flex mt-1 sm:mt-4">
                <Button
                  className="gap-1 font-semibold flex-shrink-0 text-sm md:text-base p-2 md:py-[.65rem] lg:rounded-lg overflow-hidden hover:brightness-[.8] justify-center items-center flex w-32 md:w-40 hover:bg-[#dad6d6] bg-white text-black rounded-md ring-1"
                  startContent={<FaPlay />}
                  onClick={() => {
                    if (randomMovie.first_air_date) {
                      navigate(`/watch/tv/${randomMovie.id}/1/1`);
                    } else {
                      navigate(`/watch/movie/${randomMovie.id}`);
                    }
                  }}
                >
                  Watch Now
                </Button>

                <Button
                  className="font-semibold p-2 md:py-[.65rem] lg:rounded-lg hover:brightness-[.8]  flex w-24 text-white ml-2 bg-transparent ring-white gap-1 backdrop-blur group flex-shrink-0 text-sm md:text-base ring-1 rounded-md overflow-hidden hover:bg-white/10 justify-center items-center"
                  onClick={() => {
                    if (randomMovie.first_air_date) {
                      navigate(`/info/tv/${randomMovie.id}`);
                    } else {
                      navigate(`/info/movie/${randomMovie.id}`);
                    }
                  }}
                >
                  <FaInfo />
                  Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
