import React from 'react'
import { endpoints, TMDB_URL } from "../services/Tmdb";
import VerticalCard from "../components/VerticalCard";

const Popular=()=> {
  return (
    <div><VerticalCard items={`${TMDB_URL}${endpoints.popular}`} title="Popular"/></div>
  )
};

export default Popular;