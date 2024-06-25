import React from 'react'
import { endpoints, TMDB_URL } from "../services/Tmdb";
import VerticalCard from "../components/VerticalCard";

const Trending=()=> {
  return (
    <div><VerticalCard items={`${TMDB_URL}${endpoints.trending}`} title="Trending"/></div>
  )
};

export default Trending;