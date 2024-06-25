import React from 'react'
import { endpoints, TMDB_URL } from "../services/Tmdb";
import VerticalCard from "../components/VerticalCard";

const Horror=()=> {
  return (
    <div><VerticalCard items={`${TMDB_URL}${endpoints.horror}`} title="Horror"/></div>
  )
};

export default Horror;