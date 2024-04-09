import HeroSection from "./components/Hero";
import Loading from "./components/Loading";
import Row from "./components/MovieRow";
import Header from "./components/Navbar";
import { TMDB_URL, TMDB_API_KEY, endpoints } from "./services/Tmdb";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
          <Header />
          <HeroSection />
          <div>
            {data.netflix && 
              <Row items={data.netflix} title="Netflix Originals" link="/Netflix" />
            }
          </div>
          <div>
            {data.trending && 
              <Row items={data.trending} title="Trending" link="/Trending" />
            }
          </div>
          {data.popular && <Row items={data.popular} title="Popular" link="/Popular" />}
          {data.animation && <Row items={data.animation} title="Top Kids" link="/Animation" />}
          
          {data.horror && <Row items={data.horror} title="Top Horror" link="/Horror" />}
          
          {data.documentary && 
            <Row items={data.documentary} title="Top Documentaries" link="Documentary"/>
          }
        </>
      )}
    </>
  );
};

export default App;
