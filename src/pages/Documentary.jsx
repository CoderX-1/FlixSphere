import React from 'react'
import Card from '../components/verticalCard';
import { TMDB_API_KEY, endpoints, TMDB_URL } from "../services/Tmdb";

const Page = ({ items, title, link }) => {


  return (
    <div><Card title="Documentaries" items={`${TMDB_URL}${endpoints.documentary}`}/></div>
  )

}
export default Page;
