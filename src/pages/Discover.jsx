import Navbar from "../components/Navbar";
import { TMDB_API_KEY, endpoints, TMDB_URL } from "../services/Tmdb";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Card, CardBody, Image, Button } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VerticalCard = ({ items, title }) => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${TMDB_URL}${endpoints.discover}`, {
        params: {
          api_key: TMDB_API_KEY,
          page: page,
        },
      });
      setResults((prevResults) => [...prevResults, ...response.data.results]);
    };

    fetchData();
  }, [page]);

  const getDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    return year;
  };

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="relative mb-4">
          <InfiniteScroll
            dataLength={results.length}
            next={fetchNextPage}
            hasMore={true}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>End of Results</b>
              </p>
            }
          >
            <div className="m-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="transition ease-in-out hover:-translate-y-1 hover:scale-105 cursor-pointer hover:opacity-75 py-1"
                >
                  <Image
                    onClick={() =>
                      result.first_air_date
                        ? (window.location.href = `/info/tv/${result.id}`)
                        : (window.location.href = `/info/movie/${result.id}`)
                    }
                    src={
                      result.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${result.poster_path}`
                        : "/not-found.png"
                    }
                    alt={result.title || result.name}
                    className="w-full rounded-lg"
                    fallbackSrc="/not-found.png"
                  />
                  <CardBody>
                    <p className="mt-2 text-sm font-semibold">
                      {result.title || result.name} (
                      {getDate(result.release_date || result.first_air_date)})
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;