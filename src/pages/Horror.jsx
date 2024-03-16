import React from 'react'
import VerticalCard from "@/components/verticalCard";
import { endpoints, TMDB_URL } from "../services/Tmdb";

const Page = ({ items, title, link }) => {


  return (
    <div><VerticalCard title="Top Horror" items={`${TMDB_URL}${endpoints.horror}`}/></div>
  )

}
export default Page;
