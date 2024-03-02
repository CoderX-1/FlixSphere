import React from 'react'
import VerticalCard from '../components/verticalCard';
import { endpoints, TMDB_URL } from "../services/Tmdb";

const Page = ({ items, title, link }) => {


  return (
    <div><VerticalCard title="Documentaries" items={`${TMDB_URL}${endpoints.documentary}`}/></div>
  )

}
export default Page;
