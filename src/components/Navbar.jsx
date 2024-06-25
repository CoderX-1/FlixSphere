import { auth, db } from "../services/Firebase";
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { deleteUser, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { FiEye, FiList, FiSearch } from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { createToast } from "vercel-toast";

const Header = () => {
  const [user, setUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isaccOpen, setIsaccOpen] = useState(false);
  const accdropdown = useRef(null);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    ["mousedown", "touchstart", "scroll"].forEach((event) => {
      document.addEventListener(event, handleClickOutside);
    });

    return () => {
      ["mousedown", "touchstart", "scroll"].forEach((event) => {
        document.removeEventListener(event, handleClickOutside);
      });
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleaccDropdown = () => {
    setIsaccOpen(!isaccOpen);
  };

  const handleOptionClick = (action) => {
    console.log(`Performing action: ${action}`);
    setIsOpen(false);
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

  const handleMylist = () => {
    if (user) {
      navigate("/Watchlist");
    } else {
      createToast(
        "You are not signed in. Please sign in to access your watchlist.",
        {
          action: {
            text: "Login",
            callback(toast) {
              navigate("/Login");
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
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteUser(userToDelete);
        signOut(auth);
        navigate("/");
      } catch (error) {
        console.log(error);
        alert(
          "An error occurred while deleting your account. Please try again later."
        );
      }
    }
  };

  return (
    <div>
      <Navbar
        className={`navbar transition-colors duration-300 ${
          isScrolled ? "bg-black border-b border-divider" : "bg-transparent"
        } fixed backdrop-saturate-100 backdrop-blur-none`}
      >
        <NavbarContent>
        <div className="flex gap-1 items-center">
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          type="button"
          className="group flex items-center justify-center w-6 h-full rounded-small tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 md:hidden text-white shadow-sm text-sm font-medium"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {isOpen ? (
            <IoCloseOutline className="h-8 w-8 "/>
            
          ) : (
            <IoIosMenu className="h-8 w-8"/>

          )}
        </button>

        <div
          className={`z-30 px-6 pt-2 fixed flex max-w-full top-[var(--navbar-height)] inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto backdrop-blur-xl backdrop-saturate-150 bg-background/90 text-white origin-top-right shadow-lg h-screen ${
            isOpen
              ? "transition ease-out duration-100 transform opacity-100 scale-100"
              : "hidden transition ease-in duration-75 transform opacity-0 scale-95"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="flex flex-col gap-1 py-1 w-32" role="none">
            <Button
              className="text-large data-[active=true]:font-semibold"
              onClick={() => {
                navigate("/Search");
                closeDropdown();
              }}
            >
              <FiSearch /> Search
            </Button>
            <Button
              className="text-large data-[active=true]:font-semibold"
              onClick={() => {
                navigate("/Explore");
                closeDropdown();
              }}
            >
              <FiEye /> Explore
            </Button>
            <Button
              className="text-large data-[active=true]:font-semibold"
              onClick={() => {
                handleMylist();
                closeDropdown();
              }}
            >
              <FiList /> My List
            </Button>
            <Button
              className="text-large data-[active=true]:font-semibold"
              onClick={() => {
                navigate("/About");
                closeDropdown();
              }}
            >
              <MdQuestionMark /> About
            </Button>
          </div>
        </div>
      </div>
    </div>
          <div>
            <Link to="/">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-24 md:w-24 lg:w-28 object-contain"
              />
            </Link>
          </div>
        </NavbarContent>
        <div className="hidden md:flex justify-between">
          <div>
            <Button
              className="hover:text-white font-medium bg-transparent"
              onClick={() => navigate("/Search")}
            >
              <FiSearch /> Search
            </Button>
          </div>
          <div>
            <Button
              className="hover:text-white font-medium bg-transparent"
              onClick={() => navigate("/Explore")}
            >
              <FiEye /> Explore
            </Button>
          </div>
          <div>
            <Button
              className="hover:text-white font-medium bg-transparent"
              onClick={handleMylist}
            >
              <FiList /> My List
            </Button>
          </div>
        </div>
        <div justify="center">
          {loading ? (
            <div>
              <Button className="bg-transparent" isLoading></Button>
            </div>
          ) : user ? (
            <div className="flex gap-1 items-center">
              <div
                className="relative inline-block text-left"
                ref={accdropdown}
              >
                <button
                  onClick={toggleaccDropdown}
                  type="button"
                  className="flex justify-center shadow-sm text-sm font-medium"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  <svg
                    className="h-9 w-9"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    id="User"
                  >
                    <path
                      d="M32 32.86a9.22 9.22 0 1 1 9.21-9.22A9.23 9.23 0 0 1 32 32.86zm0-15.43a6.22 6.22 0 1 0 6.21 6.21A6.21 6.21 0 0 0 32 17.43zm0 39.21a24.68 24.68 0 0 1-15.22-5.27 1.52 1.52 0 0 1-.57-1.06v-.47a15.8 15.8 0 1 1 31.6 0v.47a1.52 1.52 0 0 1-.57 1.06A24.68 24.68 0 0 1 32 56.64zm-12.79-7.19a21.62 21.62 0 0 0 25.58 0 12.8 12.8 0 0 0-25.58 0zm27.08.74z"
                      fill="#f2f2f2"
                      class="color000000 svgShape"
                    ></path>
                    <path
                      d="M32 56.64a24.65 24.65 0 1 1 15.22-5.27A24.68 24.68 0 0 1 32 56.64Zm0-46.28A21.63 21.63 0 0 0 18.64 49a21.64 21.64 0 0 0 35-17A21.67 21.67 0 0 0 32 10.36Z"
                      fill="#f2f2f2"
                      class="color000000 svgShape"
                    ></path>
                  </svg>
                </button>

                <div
                  className={`origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white  ${
                    isaccOpen
                      ? "transition ease-out duration-100 transform opacity-100 scale-100"
                      : "hidden transition ease-in duration-75 transform opacity-0 scale-95"
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
                      onClick={() => handleOptionClick("Profile")}
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
            </div>
          ) : (
            <div>
              <Button
                className="font-bold hover:bg-white hover:text-black hover:border-black border bg-black"
                onClick={() => navigate("/Login")}
              >
                Login
              </Button>
            </div>
          )}
        </div>
        <NavbarMenu className="text-white">
          <NavbarMenuItem>
            <Button onClick={() => navigate("/Search")} variant="flat">
              <FiSearch /> Search
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button onClick={() => navigate("/Explore")}>
              <FiEye /> Explore
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button onClick={handleMylist}>
              <FiList /> My List
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button onClick={() => navigate("/About")}>
              <MdQuestionMark /> About
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
};

export default Header;
