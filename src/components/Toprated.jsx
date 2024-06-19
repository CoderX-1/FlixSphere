import { TMDB_API_KEY } from "../services/Tmdb";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlay, FaInfo, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Toprated = () => {
  const [toprated, setToprated] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("tv");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopRated(selectedCategory);
  }, [selectedCategory]);

  const fetchTopRated = (category) => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/${category}/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        const toprated = response.data.results;
        setToprated(toprated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="w-full my-2">
      <div className="w-full">
        <div className="flex items-center gap-5 justify-between mb-4 md:mb-3">
          <div className="flex flex-col gap-1 tracking-wide">
            <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2 md:tracking-wide w-full flex-shrink-0">
              Top Rated
            </h2>
          </div>
          <div className="flex gap-1 md:gap-2">
            <button
              className={`rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] font-medium text-xs md:text-base`}
            >
            </button>
            <button
              className={`rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] font-medium text-xs md:text-base`}>
            </button>
          </div>
        </div>
        <div className="w-full md:h-[480px] lg:h-[700px] 2xl:h-[750px] 3xl:h-[800px] relative rounded-2xl md:rounded-none xl:rounded-2xl">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="swiper swiper-initialized swiper-horizontal w-full h-full rounded-xl md:rounded-none xl:rounded-2xl overflow-hidden"
          >
            {toprated.map((movie) => (
              <SwiperSlide
                className="swiper-slide flex flex-col md:flex-row w-full relative md:p-10 xl:p-16"
                style={{ width: "100%" }}
              >
                <div className="absolute top-0 left-0 z-[-1] blur-3xl overflow-hidden w-full h-full lg:h-[700px] object-cover opacity-50">
                  <img className="w-full h-full object-cover object-center"/>
                </div>
               
                <div className="w-full max-w-3xl mx-auto order-first md:order-none md:w-[50%] h-[calc(100%-100px)] md:p-5">
                  <div className="w-full aspect-video sm:aspect-[16/10] md:rounded-2xl overflow-hidden bg-white/5 relative group">
                    <img
                      className="w-full object-cover h-full"
                    />
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode
          navigation
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="hidden md:block select-none mt-[-140px] lg:mt-[-200px] swiper-thumbs"
        >
          {toprated.map((movie) => (
            <SwiperSlide
              className="!w-44 !md:w-[177.206px] h-full swiper-slide swiper-slide-visible swiper-slide-next rounded-lg bg-white/5 aspect-[1/1.5] overflow-hidden select-none brightness-50 cursor-pointer active:scale-95 smoothie"
              style={{ marginRight: "10px" }}
            >
              <img className="w-full h-full object-cover z-0"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    );
  }

  return (
    <div className="w-full my-2">
      <div className="w-full">
        <div className="flex items-center gap-5 justify-between mb-4 md:mb-3">
          <div className="flex flex-col gap-1 tracking-wide">
            <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2 md:tracking-wide w-full flex-shrink-0">
              Top Rated
            </h2>
            <div className="hidden lg:block text-x lg:text-sm font-light italic text-white/90">
              Movies and TV Series highly rated by users
            </div>
          </div>
          <div className="flex gap-1 md:gap-2">
            <button
              className={`rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] ${
                selectedCategory === "movie" ? "bg-white text-black" : "bg-transparent text-white ring-white/90 ring-[.025em]"
              } font-medium text-xs md:text-base`}
              onClick={() => setSelectedCategory("movie")}
            >
              Movies
            </button>
            <button
              className={`rounded-md md:rounded-full w-[4.5rem] md:w-[7rem] p-[.4rem] ${
                selectedCategory === "tv" ? "bg-white text-black" : "bg-transparent text-white ring-white/90 ring-[.025em]"
              } font-medium text-xs md:text-base`}
              onClick={() => setSelectedCategory("tv")}
            >
              TV Shows
            </button>
          </div>
        </div>
        <div className="w-full md:h-[480px] lg:h-[700px] 2xl:h-[750px] 3xl:h-[800px] relative rounded-2xl md:rounded-none xl:rounded-2xl">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="swiper swiper-initialized swiper-horizontal w-full h-full rounded-xl md:rounded-none xl:rounded-2xl overflow-hidden"
          >
            {toprated.map((movie) => (
              <SwiperSlide
                className="swiper-slide flex flex-col md:flex-row w-full relative md:p-10 xl:p-16"
                style={{ width: "100%" }}
                key={movie.id}
              >
                <div className="absolute top-0 left-0 z-[-1] blur-3xl overflow-hidden w-full h-full lg:h-[700px] object-cover opacity-50">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="w-full max-w-3xl mx-auto md:w-1/2 lg:w-[45%] mr-auto tracking-wide p-5 pb-6 pt-3 sm:p-8 lg:pt-12 flex gap-2 lg:gap-4 flex-col">
                  <div className="text-2xl lg:text-4xl !leading-tight font-semibold">
                    {movie.title || movie.name}
                  </div>
                  <div className="text-xs flex gap-3">
                    <span className="flex gap-[2px] items-center">
                      <FaStar size={12} color="white" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="uppercase">{selectedCategory}</span>
                    <span>{movie.release_date || movie.first_air_date}</span>
                    <span className="uppercase">{movie.original_language}</span>
                    <span>HD</span>
                  </div>
                  <div className="text-xs lg:text-sm text-gray-200 !italic line-clamp-3 lg:line-clamp-5">
                    {movie.overview.length > 250
                      ? `${movie.overview.substring(0, 400)}...`
                      : movie.overview}
                  </div>
                  <div className="mt-3 flex gap-2 lg:gap-3">
                    <Link
                      className="gap-1 font-semibold flex-shrink-0 text-sm md:text-base p-2 md:py-[.65rem] lg:rounded-lg overflow-hidden justify-center items-center flex w-32 md:w-40 hover:bg-[#dad6d6] bg-white text-black rounded-md"
                      to={`/watch/${selectedCategory}/${movie.id}`}
                    >
                      <FaPlay size={20} />
                      Watch Now
                    </Link>
                    <Link
                      className="flex gap-1 items-center justify-center p-2 text-sm md:text-base hover:bg-white/10 text-white ring-white ring-1 font-medium bg-transparent flex-shrink-0 hover:bg-[#212121] rounded-md"
                      to={`/info/${selectedCategory}/${movie.id}`}
                    >
                      <FaInfo size={20} />
                      Details
                    </Link>
                  </div>
                </div>
                <div className="w-full max-w-3xl mx-auto order-first md:order-none md:w-[50%] h-[calc(100%-100px)] md:p-5">
                  <div className="w-full aspect-video sm:aspect-[16/10] md:rounded-2xl overflow-hidden bg-white/5 relative group">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                      alt={movie.title || movie.name}
                      className="w-full object-cover h-full"
                    />
                    <Link
                      className="backdrop-blur-lg opacity-0 p-3 md:p-5 group-hover:opacity-100 hover:scale-[1.04] hidden md:flex items-center justify-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full smoothie overflow-hidden"
                      to={`/info/${selectedCategory}/${movie.id}`}
                    >
                      <FaPlay size={25} />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode
          navigation
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="hidden md:block select-none mt-[-140px] lg:mt-[-200px] swiper-thumbs"
        >
          {toprated.map((movie) => (
            <SwiperSlide
              className="!w-44 !md:w-[177.206px] h-full swiper-slide swiper-slide-visible swiper-slide-next rounded-lg bg-white/5 aspect-[1/1.5] overflow-hidden select-none brightness-50 cursor-pointer active:scale-95 smoothie"
              style={{ marginRight: "10px" }}
              key={movie.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                loading="lazy"
                alt={movie.title || movie.name}
                className="w-full h-full object-cover z-0"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Toprated;
