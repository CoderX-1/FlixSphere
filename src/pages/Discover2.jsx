import Navbar from "../components/Navbar";
import { TMDB_API_KEY, endpoints, TMDB_URL } from "../services/Tmdb";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, Image, Button } from "@nextui-org/react";
import { useNavigate, useLocation } from "react-router-dom";

const VerticalCard = ({ items, title }) => {
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1;
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${TMDB_URL}${endpoints.discover}`, {
          params: {
            api_key: TMDB_API_KEY,
            page: page,
          },
        });
        setResults(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    navigate(`?page=${page}`, { replace: true });
  }, [page, navigate]);

  const getDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    return year;
  };

  const fetchNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchPreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const fetchFirstPage = () => {
    setPage(1);
  };

  const fetchLastPage = () => {
    setPage(500);
  };

  return (
    <div className="md:container mx-auto text-white">
      <Navbar />
      <div className=" p-4 mt-8">
        <h1 className="text-3xl font-bold mb-4 pl-4">Discover</h1>
        <div className="relative mb-4">
          <div className="p-4 grid grid-cols-2 Card gap-4"> 
          {/* grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
            {results.map((result) => (
              <Card
                key={result.id}
                className="bg-[]] transition ease-in-out hover:-translate-y-1 hover:scale-105 cursor-pointer hover:opacity-75 "
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
                  <p className="text-xs xs:text-sm md:text-base 2xl:text-lg font-semibold">
                    {result.title || result.name} (
                    {getDate(result.release_date || result.first_air_date)})
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex gap-[2px] justify-center items-center rounded-lg overflow-hidden select-none">
            <button
              onClick={fetchFirstPage}
              disabled={page === 1}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg>
            </button>
            <button
              onClick={fetchPreviousPage}
              disabled={page === 1}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"></path></svg>
            </button>
            <span className="bg-white/10 p-1 min-w-[2.5rem] text-center select-nonetext-white">
              {page}
            </span>
            <button
              onClick={fetchNextPage}
              disabled={page === totalPages}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
            <button
              onClick={fetchLastPage}
              disabled={page === totalPages}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
