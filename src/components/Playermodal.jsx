import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { FaPlay} from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlayerModal = ({ isOpen, toggleModal }) => {
  const { type, id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if the click is outside the modal content
      if (isOpen && !e.target.closest('.modal-content')) {
        toggleModal();
      }
    };

    const handleTouchOutside = (e) => {
      // Check if the touch event is outside the modal content
      if (isOpen && !e.target.closest('.modal-content')) {
        toggleModal();
      }
    };

    const handleScroll = () => {
      // Close the modal on scroll
      if (isOpen) {
        toggleModal();
      }
    };

    if (isOpen) {
      // Add event listeners when modal is open
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleTouchOutside);
      document.addEventListener('scroll', handleScroll);
    }

    // Clean up event listeners
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, toggleModal]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-30 bg-black backdrop">
          <div className="bg-zinc-950 bg-opacity-80 rounded-lg p-8 relative modal-content border-1 border-cyan-50">
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
            <h4 className="text-lg">Select Player</h4>
            <div className="mt-4 flex flex-col gap-1">
              <Button
              className="hover:bg-transparent hover:border-1 p-0"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch/${type}/${id}/${selectedSeason}/1`);
                  } else {
                    navigate(`/watch/${type}/${id}`);
                  }
                }}
              >
                <span>Player 1</span>
              </Button>
              <Button
              className="hover:bg-transparent hover:border-1 p-0"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch2/${type}/${id}/${selectedSeason}/1`);
                  } else {
                    navigate(`/watch2/${type}/${id}`);
                  }
                }}
              >
                <span>Player 2</span>
              </Button>
              
              <Button 
               className="hover:bg-transparent hover:border-1 p-0"
                radius="md"
                startContent={<FaPlay />}
                onClick={() => {
                  if (type === "tv") {
                    navigate(`/watch3/${type}/${id}/${selectedSeason}/1`);
                  } else {
                    navigate(`/watch3/${type}/${id}`);
                  }
                }}
              >
                <span>Player 3</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerModal;
