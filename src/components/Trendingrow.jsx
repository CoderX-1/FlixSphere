import { TMDB_API_KEY } from "../services/Tmdb";
import "./SliderStyles.css";
import { Card, CardFooter, Image } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Trendingrow = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        const movies = response.data.results;
        setMovies(movies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Swiper
      className="h-full w-full my-3"
      spaceBetween={10}
      slidesPerView={1.4}
      breakpoints={{
        700: {
          slidesPerView: 2.85,
        },
        990: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3.5,
        },
        1400: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 4.5,
        },
        1800: {
          slidesPerView: 5,
        },
        2000: {
          slidesPerView: 5.5,
        },
        2200: {
          slidesPerView: 6,
        },
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Autoplay]}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      freeMode={true}
    >
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide
              className="container aspect-[2/1] h-fit rounded-2xl lg:rounded-3xl overflow-hidden transition-transform duration-300 ease-linear w-[364.857px]"
              key={index}
            >
              <div className="container aspect-[2/1] h-fit rounded-2xl lg:rounded-3xl overflow-hidden transition-transform duration-300 ease-linear w-[364.857px] bg-[#272727] animate-pulse">
                <div className="relative w-full h-full flex flex-col justify-end p-4 bg-gradient-to-b from-transparent to-gray-600 opacity-50">
                  {/* <div className="h-6 bg-gray-900 rounded mb-2"></div>
                  <div className="h-4 bg-gray-900 rounded w-3/4"></div> */}
                </div>
              </div>
            </SwiperSlide>
          ))
        : movies.map((movie) => {
            const link = movie.first_air_date
              ? `/info/tv/${movie.id}`
              : `/info/movie/${movie.id}`;
            return (
              <SwiperSlide
                className="container aspect-[2/1] h-fit rounded-2xl lg:rounded-3xl overflow-hidden active:scale-[.98] transition-transform duration-300 ease-linear w-[364.857px]"
                key={movie.id}
              >
                <Link to={link}>
                  <div className="z-10 justify-center relative">
                    <div className="relative">
                      <Card radius="none" className="z-0">
                        <span className="lazy-load-image-background lazy-load-image-loaded bg-transparent inline-block h-full w-full">
                          <Image
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            className="z-0 w-full h-full object-cover object-center group-hover:scale-[1.03] smoothie!duration-300"
                            style={{
                              filter: "brightness(80%)",
                              background:
                                "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)",
                            }}
                            removeWrapper
                            radius="none"
                          />

                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505] opacity-50"></div>
                        </span>
                        <CardFooter className="flex flex-col hover:ring-[2px] ring-[#c2b8b8] ring-inset gradient-opacity absolute w-full h-full gap-1 md:gap-2 justify-end bottom-[0.75rem] sm:bottom-[1.35rem] smoothie rounded-2xl lg:rounded-3xl items-start">
                          <h1 className="line-clamp-2 uppercase tracking-wide !leading-none text-sm md:text-base font-bold">
                            {movie.title || movie.name}
                          </h1>
                          <div className="flex flex-wrap text-xs !leading-tight text-[#2cdfff] font-normal tracking-wider gap-1">
                            <span>Rating: {movie.vote_average.toFixed(1)}</span>
                            <span>•</span>
                            <span>
                              {(
                                movie.release_date || movie.first_air_date
                              ).substring(0, 4)}
                            </span>
                            <span>•</span>
                            <span className="uppercase">
                              {movie.original_language}
                            </span>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};

export default Trendingrow;
