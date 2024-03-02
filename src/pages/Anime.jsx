import React from 'react'
import Card from '../components/verticalCard';
import { TMDB_API_KEY, endpoints, TMDB_URL } from "../services/Tmdb";

const Page = ({ items, title, link }) => {


  return (
    <div><Card title="Top Kids" items={`${TMDB_URL}${endpoints.animation}`}/></div>
  )

}
export default Page;
