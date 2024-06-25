import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-dark bg-opacity-50 z-50">
     <div>
      <img
        src="/logo.png"
        alt="Logo"
        className="w-44 md:w-44 lg:w-60 object-contain animate-pulse"
      />
  </div>
    </div>
  );
};

export default Loading;
