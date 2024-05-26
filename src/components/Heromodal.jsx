import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Heromodal = ({ isOpen, toggleModal, tvlink, movielink }) => {
  const { type, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".modal-content")) {
        toggleModal();
      }
    };

    const handleTouchOutside = (e) => {
      if (isOpen && !e.target.closest(".modal-content")) {
        toggleModal();
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        toggleModal();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("touchstart", handleTouchOutside);
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, toggleModal]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-30 bg-black backdrop">
          <div className="bg-zinc-950 bg-opacity-80 rounded-lg p-8 relative modal-content border-1 border-white">
            <button
              className="absolute top-0 left-0 mt-1 ml-2"
              onClick={toggleModal}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h4 className="text-lg flex justify-center">Select Player</h4>
            <div className="flex gap-2 justify-center">
            <div className="mt-4 flex flex-col gap-1">
              <Button
                className="hover:bg-white hover:text-black text-white bg-transparent border-1 p-2"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch${tvlink}`);
                  } else {
                    navigate(`/watch${movielink}`);
                  }
                }}
              >
                <span>Player 1</span>
              </Button>
              <Button
                className="hover:bg-white hover:text-black text-white bg-transparent border-1 p-2"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch1${tvlink}`);
                  } else {
                    navigate(`/watch1${movielink}`);
                  }
                }}
              >
                <span>Player 2</span>
              </Button>
              <Button
                className="hover:bg-white hover:text-black text-white bg-transparent border-1 p-2"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch2${tvlink}`);
                  } else {
                    navigate(`/watch2${movielink}`);
                  }
                }}
              >
                <span>Player 3</span>
              </Button>
              </div>
            <div className="mt-4 flex flex-col gap-1">
            <Button
                className="hover:bg-white hover:text-black text-white bg-transparent border-1 p-2"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch3${tvlink}`);
                  } else {
                    navigate(`/watch3${movielink}`);
                  }
                }}
              >
                <span>Player 4</span>
              </Button>              
            <Button
                className="hover:bg-white hover:text-black text-white bg-transparent border-1 p-2"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch2${tvlink}`);
                  } else {
                    navigate(`/watch2${movielink}`);
                  }
                }}
              >
                <span>Player 5</span>
              </Button>              
            <Button
                className="hover:bg-white hover:text-black text-white bg-transparent border-1 p-2"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch2${tvlink}`);
                  } else {
                    navigate(`/watch2${movielink}`);
                  }
                }}
              >
                <span>Player 6</span>
              </Button>              
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Heromodal;
