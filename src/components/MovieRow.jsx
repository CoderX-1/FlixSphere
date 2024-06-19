import { Image, Spinner } from "@nextui-org/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Row = ({ items, title, link }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (items.length > 5) {
      setLoading(false);
    }
  }, [items]);

  return (
    <div>
      <div className="flex justify-between my-3 items-center">
        {title && (
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {title}
          </h2>
        )}
        <div className="flex">
          <Link
            className="text-xs lg:text-sm ml-auto text-white/80 flex items-center capitalize"
            to={link}
          >
            View All
            <FaChevronRight />
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-10 flex items-center justify-center mb-4">
          <Spinner size="lg" color="default" />
        </div>
      ) : (
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          navigation
          freeMode={true}
          modules={[Navigation, FreeMode]}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <RowCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

function RowCard({ item }) {
  return (
    <div className="w-44 md:w-48 my-2">
      <Link
        to={
          item.first_air_date ? `/info/tv/${item.id}` : `/info/movie/${item.id}`
        }
      >
        <div className="relative group cursor-pointer hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="rounded-lg overflow-hidden cursor-pointer">
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt={item.name || item.title}
              loading="lazy"
              className="w-44 md:w-48 object-cover z-0"
              fallbackSrc="/not-found.png"
            />
            <div className="absolute top-1 right-0 gap-1 bg-[#00000098] py-1 px-[4px] rounded-l-md rounded-tr-lg flex items-center justify-center">
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
                {item.vote_average?.toFixed(1)}
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
            <div className="flex opacity-1 lg:opacity-0 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
              <div className="flex md:items-center justify-center gap-1 flex-wrasp text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide ">
                <span>{item.release_date || item.first_air_date}</span>•
                <span className="whitespace-nowrap">
                  <span className="uppercase">{item.original_language}</span>
                </span>
                •<span>HD</span>
              </div>
              <div className="line-clamp-2 text-center text-sm font-medium !leading-tight ">
                {item.name || item.title}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Row;
