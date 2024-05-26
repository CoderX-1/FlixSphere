import React from "react";
import Navbar from "../components/Navbar";
import { FaFrown } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center text-white text-center">
        <div className="flex flex-col items-center gap-3 p-4">
          <FaFrown className="text-6xl" />
          <h1 className="text-4xl font-bold">404 | Page Not Found</h1>
          <p className="text-lg">This page could not be found.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
