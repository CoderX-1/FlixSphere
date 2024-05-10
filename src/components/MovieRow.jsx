import { Button, Image, Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";
import React from "react";


import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";

const Row = ({ items, title, link }) => {
  const [loading, setLoading] = React.useState(true);

  const isMobile = window.innerWidth <= 768;

  const Items = items.map((item, index) => ({
    id: `anime-${index}`,
    item: item,
  }));

  React.useEffect(() => {
    if (items.length > 5) {
      setLoading(false);
    }
  }, [items]);

  return (
    <div>
      <div className="flex justify-between my-3 items-center">
      {title && (
        <h2 className="text-2xl font-semibold text-white ml-3">{title}</h2>
      )}
      <div className="flex">
      <Link className="flex items-center mr-3" to={link}>Load More<FaChevronRight /></Link>
      </div>
      </div>
      {loading ? (
        <div className="w-full h-10 flex items-center justify-center mb-4">
          <Spinner size="lg" color="default" />
        </div>
      ) : (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {Items.map(({ id, item }) => (
            <RowCard key={id} item={item} isMobile={isMobile} />
          ))}
        </ScrollMenu>
      )}
    </div>
  );
};

function LeftArrow() {
  const { scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Button
      onClick={() => scrollPrev()}
      className={`h-60 left-[-0.25rem] absolute bg-transparent z-20 rounded-none w-12`}
      isIconOnly
    >
      <IoIosArrowBack className="w-8 h-8" />
    </Button>
  );
}

function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <Button
      onClick={() => scrollNext()}
      className={`h-60 absolute right-[0.001rem] z-10 bg-[#15161533] rounded-none w-10`}
      isIconOnly
    >
      <IoIosArrowForward className="w-8 h-8" />
    </Button>
  );
}

function RowCard({ item, isMobile }) {
  const onClick = async () => {
    if (item.first_air_date) {
      window.location.href = `/info/tv/${item.id}`;
    } else {
      window.location.href = `/info/movie/${item.id}`;
    }
  };

  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="w-40 mx-3"
    >
      <div
        className={`relative group ${
          isMobile
            ? "cursor-pointer"
            : "hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        }`}
      >
        <div className="rounded-lg overflow-hidden cursor-pointer">
          <Image
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            alt={item.name || item.title}
           className="w-40 h-60 object-cover z-0"
            fallbackSrc="/not-found.png"
          />
          <div
              className="flex flex-col items-center justify-center duration-300"
            >
              <h3 className="truncate font-semibolds w-36 py-2 text-base sm:text-base md:text-lg lg:text-xl capitalize text-center text-white">
                {item.name || item.title}
              </h3>
              
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default Row;
