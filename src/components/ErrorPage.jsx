import React from "react";
import Navbar from "../components/Navbar";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center text-center p-6">
        <div className="flex flex-col items-center gap-6 p-8 bg-black border-1 border-white bg-opacity-90 rounded-lg shadow-lg">
          <FaExclamationTriangle className="text-6xl text-white mb-4" />
          <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
          <p className="text-lg mb-4">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-sm italic text-gray-400 mb-4">
            <i>{error.statusText || error.message}</i>
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-5 py-3 bg-white text-black rounded-lg hover:bg-gray-300 flex items-center justify-center transition-all duration-300"
          >
            <FaHome className="mr-2" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
