import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../services/Firebase";
import { useNavigate } from "react-router-dom";

import {
    deleteUser,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        setUserToDelete(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (action) => {
    console.log(`Performing action: ${action}`);
    setIsOpen(false);
  };

  const handleMylist = () => {
    if (user) {
      navigate("/watchlist");
    } else {
      createToast(
        "You are not signed in. Please sign in to access your watchlist.",
        {
          action: {
            text: "Login",
            callback(toast) {
              navigate("/login");
              toast.destroy();
            },
          },
          timeout: 3000,
          cancel: "Cancel",
          type: "dark",
        }
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUser(userToDelete);
        signOut(auth);
        navigate("/");
      } catch (error) {
        console.log(error);
        alert("An error occurred while deleting your account. Please try again later.");
      }
    }
  };
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex justify-center shadow-sm text-sm font-medium"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <svg className='h-9 w-9' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="User"><path fill="#111111" fill-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z" clip-rule="evenodd" class="color000000 svgShape"></path></svg>
      </button>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white  ${
          isOpen ? 'transition ease-out duration-100 transform opacity-100 scale-100' : 'transition ease-in duration-75 transform opacity-0 scale-95'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          <button
            onClick={handleMylist}
            className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            My List
          </button>
          <button
            onClick={() => handleOptionClick('Profile')}
            className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Profile
          </button>
          <button
            onClick={handleSignOut}
            className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Sign Out
          </button>
          <button
            onClick={handleDelete}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
