import Navbar from "../components/Navbar";
import { TMDB_API_KEY, endpoints, TMDB_URL } from "../services/Tmdb";
import { Input, Image } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${TMDB_URL}${endpoints.search}`, {
          params: {
            query: query,
            api_key: TMDB_API_KEY,
          },
        });
        const filteredResults = res.data.results.filter(
          (result) => result.vote_average > 0
        );
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  const getDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    return year;
  };

  return (
    <div className="text-white">
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <div className="relative mb-4">
          <Input
            value={query}
            startContent={<FaSearch />}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to search?"
          />
          <div className="flex overflow-x-auto no-scrollbar-atAll flex-wrap px-2 md:px-4">
            {results.map((result) => (
              <Link
                key={result.id}
                className="relative flex p-[.5rem] mb-2 flex-col group gap-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/7  rounded-lg flex-shrink-0"
                to={result.first_air_date ? `/info/tv/${result.id}` : `/info/movie/${result.id}`}
              >
                <div className="w-full relative aspect-[1/1.5] rounded-lg overflow-hidden bg-[var(--light)] smoothie">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                    alt={result.title || result.name}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.04] smoothie relative aspect-[1/1.5] rounded-lg overflow-hidden bg-[var(--light)] smoothie"
                  />
                  
                  <div className="absolute top-1 right-0 gap-1 bg-[#00000098] py-1 px-[5px] rounded-l-md flex items-center justify-center z-10">
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
                      {result.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <div className="absolute opacity-0 xl:group-hover:opacity-100 flex top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 smoothie">
                    <span className="p-[.6rem] hover:brightness-90 bg-white rounded-full flex items-center justify-center smoothie">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="#000000d5"
                        stroke="#000000d5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-play"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </span>
                  </div>
                  <div className="flex opacity-1 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
                    <div className="flex md:items-center justify-center gap-1 flex-wrasp text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide">
                      <span>{getDate(result.release_date || result.first_air_date)}</span>•
                      <span className="whitespace-nowrap">
                        <span className="uppercase">{result.media_type}</span>
                      </span>
                      •<span>HD</span>
                    </div>
                    <div className="line-clamp-2 text-center text-sm font-medium !leading-tight">
                      {result.title || result.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
