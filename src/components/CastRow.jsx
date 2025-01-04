import { Card, CardFooter, Image } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Row = ({ items }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (items.length > 1) {
      setLoading(false);
    }
  }, [items]);

  return (
    <div>
      {loading ? (
        <div className="w-full flex items-center justify-start mb-4">
          <Swiper className="m-0" slidesPerView="auto" freeMode={true} modules={[FreeMode]}>
            {[...Array(5)].map((_, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <div className="w-40 mx-3 animate-pulse">
                  <div className="relative group cursor-pointer hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
                    <div className="rounded-full overflow-hidden cursor-pointer my-2 bg-[#272727] animate-pulse">
                      <div isFooterBlurred radius="lg" className="border-none">
                        <div className="w-full h-40 bg-[#272727] animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <Swiper
          slidesPerView="auto"
          navigation
          freeMode={true}
          modules={[Navigation, FreeMode]}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <MemoizedRowCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

const RowCard = ({ item }) => {
  return (
    <div className="w-40 mx-3">
      <div className="relative group cursor-pointer hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="rounded-full overflow-hidden cursor-pointer my-2">
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt={item.name}
              className="w-full h-full object-cover z-0"
              fallbackSrc="/not-found.png"
              width="176"
              height="256"
            />
            <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden p-2 absolute before:rounded-xl rounded-large bottom-3 text-center md:w-[100px] w-[200px] ml-7 shadow-small z-0">
              <p className="text-tiny text-white/80">{item.name}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

const MemoizedRowCard = React.memo(RowCard);

export default Row;