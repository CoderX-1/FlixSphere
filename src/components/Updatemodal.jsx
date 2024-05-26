import React, { useEffect, useState, useRef } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';

function Updatemodal() {
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const Updatemodal = useRef(null);


  useEffect(() => {
    setShowModal(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const nextWednesday = new Date();
      nextWednesday.setDate(now.getDate() + ((3 + 7 - now.getDay()) % 7));
      nextWednesday.setHours(0, 0, 0, 0);

      const difference = nextWednesday - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();
    const timerInterval = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (Updatemodal.current && !Updatemodal.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      {showModal && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out">
          <div ref={Updatemodal} className="flex flex-col items-center bg-black p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-transform duration-500 ease-out scale-100">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <FiX size={24} />
            </button>
            <div className="flex items-center mb-4">
              <FiInfo size={32} className="mr-2" />
              <h2 className="text-2xl font-bold">New Update Coming Soon!</h2>
            </div>
            <p className="mb-2 text-center">We are excited to bring you the latest features:</p>
            <ul className="list-disc list-inside mb-4 text-center">
              <li>Enhanced User Interface for better navigation.</li>
              <li>New trending and Top Rated section with more personalized content.</li>
              <li>Introducing a new card layout for an improved user experience.</li>
              <li>Modern and advanced UI/UX enhancements.</li>
              <li>Improved performance and bug fixes.</li>
              <li>And much more...</li>
            </ul>
            <p className="text-sm text-gray-600">Check out the updates and let us know your feedback!</p>
            <p className="text-lg text-red-600 font-semibold">Next update in: {timeLeft}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Updatemodal;
