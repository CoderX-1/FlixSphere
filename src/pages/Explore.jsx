import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TMDB_API_KEY, TMDB_URL } from "../services/Tmdb";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
  { id: 10764, name: "Reality" },
];

const countries = {
  "United States": "us",
  "United Kingdom": "gb",
  "Canada": "ca",
  "Australia": "au",
  "Germany": "de",
  "France": "fr",
  "Italy": "it",
  "Japan": "jp",
  "Spain": "es",
  "India": "in",
  "China": "cn",
  "Brazil": "br",
  "Russia": "ru",
  "South Korea": "kr",
  "Mexico": "mx",
  "Pakistan": "pk" 
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const Explore = () => {
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("tv");

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialType = queryParams.get("type") || "movie";
  const initialGenre = queryParams.get("genre") || "";
  const initialYear = queryParams.get("year") || "";
  const initialSortBy = queryParams.get("sort_by") || "popularity.desc";
  const initialCountry = queryParams.get("country") || "";

  const [page, setPage] = useState(initialPage);
  const [type, setType] = useState(initialType);
  const [genre, setGenre] = useState(initialGenre);
  const [year, setYear] = useState(initialYear);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [country, setCountry] = useState(initialCountry);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${TMDB_URL}/discover/${type}?api_key=${TMDB_API_KEY}`, {
          params: {
            api_key: TMDB_API_KEY,
            page: page,
            with_genres: genre,
            primary_release_year: year,
            sort_by: sortBy,
            region: country,
          },
        });
        setResults(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [page, genre, year, sortBy, country, type]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page !== 1) params.set("page", page);
    if (type) params.set("type", type);
    if (genre) params.set("genre", genre);
    if (year) params.set("year", year);
    if (sortBy !== "popularity.desc") params.set("sort_by", sortBy);
    if (country) params.set("country", country);

    navigate(`?${params.toString()}`, { replace: true });
  }, [page, type, genre, year, sortBy, country, navigate]);

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setType("movie");
    setGenre("");
    setYear("");
    setSortBy("popularity.desc");
    setCountry("");
    setPage(1);
  };

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
    <div className="text-white">
      <Navbar />
      <div className="mt-8">
        <div className="flex gap-6 flex-col pt-14 max-w-[1400px] mx-auto">
          <div className="flex items-end flex-wrap lg:flex-nowrap justify-center gap-y-1 px-2 md:px-4">
            <div className="filter-options relative">
              <div className="relative mt-1 !tracking-wide w-full">
                <label className="block mb-1 text-sm uppercase text-gray-300">Type</label>
                <select
                  value={type}
                  onChange={handleFilterChange(setType)}
                  className="relative w-full cursor-default rounded-lg !bg-[#1b1f29] py-2 pl-3 pr-10 text-left shadow-md !outline-none sm:text-sm"
                >
                  <option className="block truncate !tracking-wide" value="movie">Movie</option>
                  <option className="block truncate !tracking-wide" value="tv">TV Show</option>
                </select>
              </div>
            </div>
            <div className="filter-options relative">
              <div className="relative mt-1 !tracking-wide w-full">
                <label className="block mb-1 text-sm uppercase text-gray-300">Genre</label>
                <select
                  value={genre}
                  onChange={handleFilterChange(setGenre)}
                  className="relative w-full cursor-default rounded-lg !bg-[#1b1f29] py-2 pl-3 pr-10 text-left shadow-md !outline-none sm:text-sm"
                >
                  <option className="block truncate !tracking-wide" value="">All</option>
                  {genres.map((g) => (
                    <option className="block truncate !tracking-wide" key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="filter-options relative">
              <div className="relative mt-1 !tracking-wide w-full">
                <label className="block mb-1">Year</label>
                <select
                  value={year}
                  onChange={handleFilterChange(setYear)}
                  className="relative w-full cursor-default rounded-lg !bg-[#1b1f29] py-2 pl-3 pr-10 text-left shadow-md !outline-none sm:text-sm"
                >
                  <option className="block truncate !tracking-wide" value="">All</option>
                  {years.map((year) => (
                    <option className="block truncate !tracking-wide" key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="filter-options relative">
              <div className="relative mt-1 !tracking-wide w-full">
                <label className="block mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={handleFilterChange(setSortBy)}
                  className="relative w-full cursor-default rounded-lg !bg-[#1b1f29] py-2 pl-3 pr-10 text-left shadow-md !outline-none sm:text-sm p-1"
                >
                   <option className="block truncate !tracking-wide" value="popularity.desc">Popularity</option>
                <option className="block truncate !tracking-wide" value="release_date.desc">Latest Release</option>
                <option className="block truncate !tracking-wide" value="release_date.asc">Oldest Release</option>
                {/* <option className="block truncate !tracking-wide" value="original_title.asc">Title (A-Z)</option>
                <option className="block truncate !tracking-wide" value="original_title.desc">Title (Z-A)</option> */}
                {/* <option className="block truncate !tracking-wide" value="vote_average.desc">High Rated</option> */}
                {/* <option className="block truncate !tracking-wide" value="vote_average.asc">Low Rated</option> */}
                <option className="block truncate !tracking-wide" value="vote_count.desc">Most Voted</option>
                {/* <option className="block truncate !tracking-wide" value="vote_count.asc">Least Voted</option> */}
                </select>
              </div>
            </div>
            <div className="filter-options relative">
              <div className="relative mt-1 !tracking-wide w-full">
                <label className="block mb-1">Country</label>
                <select
                  id="country-select"
                  onChange={(e) => handleFilterChange(setCountry)(e)}
                  className="relative w-full cursor-default rounded-lg !bg-[#1b1f29] py-2 pl-3 pr-10 text-left shadow-md !outline-none sm:text-sm"
                  value={country}
                >
                  <option className="block truncate !tracking-wide" value="">All Countries</option>
                  {Object.entries(countries).map(([countryName, countryCode]) => (
                    <option className="block truncate !tracking-wide" key={countryCode} value={countryCode}>{countryName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex self-end">
              <button className="p-3 h-[2.3rem] flex items-center justify-center gap-1 font-medium active:hover:scale-95 tracking-wide bg-[#1b1f29] rounded-md" onClick={clearFilters}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
              </button>
            </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-2 md:px-4 mt-8">
            {results.length === 0 ? (
              <div className="flex items-center justify-center py-40">
                <h3 className="text-xl text-gray-400">No results found</h3>
              </div>
            ) : (
              <div className="flex overflow-x-auto no-scrollbar-atAll flex-wrap">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    className="relative flex p-[.5rem] mb-2 flex-col group gap-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/7  rounded-lg flex-shrink-0 group cursor-pointer hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
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
                      <div className="flex opacity-1 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
                        <div className="flex md:items-center justify-center gap-1 flex-wrap text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide">
                          <span>{getDate(result.release_date || result.first_air_date)}</span>•
                          <span className="whitespace-nowrap">
                            <span className="uppercase">{type}</span>
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
            )}
          </div>
          <div className="my-4 flex gap-[2px] justify-center items-center rounded-lg overflow-hidden select-none">
            <button
              onClick={fetchFirstPage}
              disabled={page === 1}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevrons-left"
              >
                <path d="m11 17-5-5 5-5"></path>
                <path d="m18 17-5-5 5-5"></path>
              </svg>
            </button>
            <button
              onClick={fetchPreviousPage}
              disabled={page === 1}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <span className="bg-white/10 p-1 min-w-[2.5rem] text-center select-none text-white">
              {page}
            </span>
            <button
              onClick={fetchNextPage}
              disabled={page === totalPages}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
            <button
              onClick={fetchLastPage}
              disabled={page === totalPages}
              className="disabled:bg-white/5 bg-white/10 p-1 flex items-center justify-center disabled:opacity-60 disabled:hover:text-white hover:text-[#4aeadc] hover:bg-white/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevrons-right"
              >
                <path d="m6 17 5-5-5-5"></path>
                <path d="m13 17 5-5-5-5"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Explore;
