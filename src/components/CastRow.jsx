import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardFooter, Image, Spinner } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

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
        <div className="w-full h-10 flex items-center justify-start mb-4">
          <Spinner size="lg" color="default" />
        </div>
      ) : (
        <Swiper
          slidesPerView="auto"
          navigation
          freeMode={true}
          modules={[Navigation ,FreeMode]}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
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
    <div className="w-40 mx-3">
      <div className="relative group cursor-pointer hover:transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="rounded-full overflow-hidden cursor-pointer my-2">
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt={item.name}
              className="w-full h-full object-cover z-0"
              fallbackSrc="/not-found.png"
            />
            <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden p-2 absolute before:rounded-xl rounded-large bottom-3 text-center md:w-[100px] w-[200px] ml-7 shadow-small z-0">
              <p className="text-tiny text-white/80">{item.name}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Row;
