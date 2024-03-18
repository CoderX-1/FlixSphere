import { Button, Card, CardFooter, Image, Spinner } from "@nextui-org/react";
import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Row = ({ items }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  const isMobile = window.innerWidth <= 768;

  const Items = items.map((item, index) => ({
    id: `cast-${index}`,
    item: item,
  }));

  React.useEffect(() => {
    if (items.length > 1) {
      setLoading(false);
    }
  }, [items]);

  return (
    <div>
      {loading ? (
        <div className="w-full h-10 flex items-center justify-start mb-4 ml-3">
          <Spinner size="lg" color="default" />
        </div>
      ) : (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {Items.map(({ id, item }) => (
            <RowCard
              key={id}
              item={item}
              isMobile={isMobile}
              navigate={navigate}
            />
          ))}
        </ScrollMenu>
      )}
    </div>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
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
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Button
      disabled={isLastItemVisible}
      color="default"
      onClick={() => scrollNext()}
      className={`h-60 absolute right-[0.001rem] z-10 bg-[#15161533] rounded-none w-10`}
      isIconOnly
    >
      <IoIosArrowForward className="w-8 h-8" />
    </Button>
  );
}

function RowCard({ item, isMobile, navigate }) {
  const onClick = async () => {
    if (item.id) {
      navigate(`/actor/${item.id}`);
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
          <Card isFooterBlurred radius="lg" className="border-none">
            <Image
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt={item.name}
              className="w-40 h-60 object-cover"
              fallbackSrc="/not-found.png"
            />
            <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden p-2 absolute before:rounded-xl rounded-large bottom-3 text-center md:w-[100px] w-[200px] ml-4 shadow-small z-10">
              <p className="text-tiny text-white/80">{item.name}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Row;
