import { TMDB_API_KEY } from "../services/Tmdb";
import "./SliderStyles.css";
import {
  Button,
  ButtonGroupProvider,
  Card,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlay, FaInfo, FaPlus, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PlayerModal from "../components/Playermodal";


const HeroSection = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


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
          <Card radius="none" className="swiper">
            <Image
              src={`https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`}
              className="z-0 w-full h-[80vh] object-cover"
              removeWrapper
              radius="none"
            />
            <div className="z-10 w-full h-[80vh] absolute justify-center bg-gradient-to-l from-transparent to-[#050505]"></div>
            <CardFooter className="items-start  flex-col overflow-hidden bottom-10 py-1 absolute ml-1 z-10">
              <h1 className="smtruncate text-3xl md:text-5xl lg:text-6xl font-extrabold text-white">
                {randomMovie.title || randomMovie.name}
              </h1>
              <p className="smtruncate text-lg w-[100%] md:text-xl lg:text-2xl font-semibold text-gray-400">
                {randomMovie.overview.substring(0, 165)}...
              </p>
              <div className="flex mt-4">
              
                <Button
                  className="hover:bg-[#dad6d6] bg-white text-black rounded-md"
                  startContent={<FaPlay />} onClick={toggleModal}
                >
                  Watch Now
                </Button>
                <PlayerModal isOpen={modalOpen} toggleModal={toggleModal} />

                <Button
                  className="ml-2 hover:bg-[#212121] bg-[#262626] text-white rounded-md"
                  onClick={() => {
                    if (randomMovie.first_air_date) {
                      navigate(`/info/tv/${randomMovie.id}`);
                    } else {
                      navigate(`/info/movie/${randomMovie.id}`);
                    }
                  }}
                  
                >
                  <FaInfo /> Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>{" "}
    </div>
  );
};

export default HeroSection;
