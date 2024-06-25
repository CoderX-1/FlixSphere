import React from 'react'
import { endpoints, TMDB_URL } from "../services/Tmdb";
import VerticalCard from "../components/VerticalCard";

const Animation=()=> {
  return (
    <div><VerticalCard items={`${TMDB_URL}${endpoints.animation}`} title="Top Kids"/></div>
  )
};

export default Animation;