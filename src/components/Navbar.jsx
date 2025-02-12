import { auth, db } from "../services/Firebase";
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
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
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accdropdown.current && !accdropdown.current.contains(event.target)) {
        setIsaccOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleaccDropdown = () => {
    setIsaccOpen(!isaccOpen);
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
  const handleAccount = () => {
    if (user) {
      navigate("/Account");
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
            <IoCloseOutline className="h-8 w-8 z-30"/>

          ) : (
            <IoIosMenu className="h-8 w-8"/>

          )}
        </button>
        <div
          className={`z-10 px-6 pt-14 fixed flex max-w-full top-0 inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto backdrop-blur-xl backdrop-saturate-150 bg-background/90 text-white origin-top-right shadow-lg h-screen ${
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
                  <Avatar
                    src={auth.currentUser?.photoURL || <img src="https://api.iconify.design/mdi:account-circle.svg?color=white" alt="User Icon" className="h-9 w-9"/>}
                    className="h-9 w-9"
                  />
                </button>

                <div
                  className={`origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-black/90 backdrop-blur-xl border border-white/10 ${
                    isaccOpen
                      ? "transition ease-out duration-100 transform opacity-100 scale-100"
                      : "hidden transition ease-in duration-75 transform opacity-0 scale-95"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-2 px-1" role="none">
                    <button
                      onClick={handleMylist}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 rounded-lg transition-all duration-200"
                      role="menuitem"
                    >
                      <FiList className="w-4 h-4" />
                      My List
                    </button>
                    <button
                      onClick={handleAccount}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 rounded-lg transition-all duration-200"
                      role="menuitem"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Account
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 rounded-lg transition-all duration-200"
                      role="menuitem"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                    <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                      role="menuitem"
                    >
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Account
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