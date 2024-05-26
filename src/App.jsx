import React from 'react';
import HeroSection from "./components/Hero";
import Loading from "./components/Loading";
import Row from "./components/MovieRow";
import Header from "./components/Navbar";
import Trendingrow from "./components/Trendingrow";
import Toprated from "./components/Toprated";
import Footer from "./components/Footer";
import { TMDB_URL, TMDB_API_KEY, endpoints } from "./services/Tmdb";
import axios from "axios";
import { useEffect, useState } from "react";
import Updatemodal from "./components/Updatemodal";

const useFetchData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    trending: null,
    airing_today: null,
    popular: null,
    animation: null,
    horror: null,
    action: null,
    comedy: null,
    romance: null,
    documentary: null,
  });

  useEffect(() => {
    const fetchDataPromises = Object.entries(endpoints).map(([key, endpoint]) =>
      axios
        .get(`${TMDB_URL}${endpoint}`, { params: { api_key: TMDB_API_KEY } })
        .then((response) => [key, response.data.results])
    );

    Promise.all(fetchDataPromises)
      .then((results) => {
        setData(Object.fromEntries(results));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return { loading, data };
};

const App = () => {
  const { loading, data } = useFetchData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Updatemodal /> 
          <Header />
          <HeroSection />
          <div className="m-4">
            <h1 className="font-medium flex items-center tracking-wide w-full text-xl md:text-2xl py-1 flex-shrink-0 text-white">
              What's Trending Today
            </h1>
            <Trendingrow />
            {data.popular && (
              <Row items={data.popular} title="Popular" link="/Popular" />
            )}
            {data.animation && (
              <Row items={data.animation} title="Top Kids" link="/Animation" />
            )}
            <Toprated />
            {data.horror && (
              <Row items={data.horror} title="Top Horror" link="/Horror" />
            )}
            {data.airing_today && (
              <Row
                items={data.airing_today}
                title="Airing Today"
                link="Airing"
              />
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
