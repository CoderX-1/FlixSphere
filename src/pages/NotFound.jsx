import Navbar from "../components/Navbar";
import React from "react";
import { FaFrown } from "react-icons/fa";

const NotFound = () => {
  return (
    <div>
    <Navbar/>
    <div className="flex capitalize items-center justify-center text-2xl font-semibold gap-3">
      <FaFrown />
      <h1>404 |</h1>
      <p>This page could not be found.</p>
    </div>
    </div>
    
  );
};

export default NotFound;
