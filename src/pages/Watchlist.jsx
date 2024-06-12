import Spinner from "../components/Loading";
import Navbar from "../components/Navbar";
import { auth } from "../services/Firebase";
import { db } from "../services/Firebase";
import { TMDB_API_KEY } from "../services/Tmdb";
import { Link } from "react-router-dom";
import {
  Spinner as NextSpinner,
  Image,
  Button,
} from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";

const WatchlistPage = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);

  const fetchWatchlistData = async (userID) => {
    const apiKey = TMDB_API_KEY;

    const q = query(collection(db, "watchlist"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);

    const userWatchlist = [];
    querySnapshot.forEach((doc) => {
      userWatchlist.push(doc.data());
    });

    const promises = userWatchlist.map(async ({ type, id }) => {
      const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
      const response = await fetch(url);
      return await response.json();
    });

    const watchlistDetails = await Promise.all(promises);
    setWatchlistData(watchlistDetails);
    setWatchlistLoading(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userID = user.uid;
        setUserID(userID);
        fetchWatchlistData(userID).then(() => {
          setLoading(false);
        });
      } else {
        setLoading(true);
        window.location.href = "/";
      }
    });
  }, []);

  const removeFromWatchlist = async (id, type) => {
    const q = query(collection(db, "watchlist"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      setWatchlistLoading(true);
      const data = doc.data();
      if (data.type == type && data.id == id) {
        const docRef = doc.ref;
        await deleteDoc(docRef).then(() => {
          setWatchlistLoading(false);
          fetchWatchlistData(userID);
        });
      }
    });
  };

  if (loading) {
    <Spinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-8 h-screen flex gap-6 flex-col pt-14 max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <div>
          {watchlistLoading ? (
            <div className="flex items-center justify-center">
              <NextSpinner color="primary" size="xl" className="mb-6 mt-2" />
            </div>
          ) : watchlistData.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-gray-500">Your watchlist is currently empty.</p>
            </div>
          ) : (
            <div className="flex overflow-x-auto no-scrollbar-atAll flex-wrap">
              {watchlistData.map((item) => (
                <Link
                key={item.id}
                    className="relative flex p-[.5rem] mb-2 flex-col group gap-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/7  rounded-lg flex-shrink-0"
                    to={item.first_air_date ? `/info/tv/${item.id}` : `/info/movie/${item.id}`}
                  >
                  
                    <div className="w-full relative aspect-[1/1.5] rounded-lg overflow-hidden bg-[var(--light)] smoothie">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.04] smoothie relative aspect-[1/1.5] rounded-lg overflow-hidden bg-[var(--light)] smoothie"
                      />
                      <button
                      className="absolute top-1 left-0 gap-1 bg-[#00000098] py-1 px-[5px] rounded-r-md flex items-center justify-center z-50"
                      onClick={() => {
                        if (item.title) {
                          removeFromWatchlist(item.id, "movie");
                        } else {
                          removeFromWatchlist(item.id, "tv");
                        }
                      }}
                    >
                      Remove
                    </button>
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
                      <div className="flex opacity-1 lg:group-hover:opacity-100 p-[.35rem] pb-2 tracking-wide flex-col gap-1 justify-end w-full h-full bg-gradient-to-t z-10 from-[#000000d0] absolute top-0 bottom-0 left-0 right-0 smoothie">
                        <div className="flex md:items-center justify-center gap-1 flex-wrap text-xs 2xl:text-sm text-[#d8d8d8] font-normal tracking-wide">
                          <span>{item.release_date || item.first_air_date}</span>•
                          <span className="whitespace-nowrap">
                            <span className="uppercase">{item.first_air_date ? (
                        <p>
                          Tv
                        </p>
                      ) : (
                        <p>
                          Movie
                        </p>
                      )}</span>
                          </span>
                          •<span>HD</span>
                        </div>
                        <div className="line-clamp-2 text-center text-sm font-medium !leading-tight">
                          {item.title || item.name}
                        </div>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default WatchlistPage;
