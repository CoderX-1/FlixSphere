import Spinner from "../components/Loading";
import Navbar from "../components/Navbar";
import { auth, db } from "../services/Firebase";
import { TMDB_API_KEY } from "../services/Tmdb";
import { Button, Input, Avatar, Image } from "@nextui-org/react";
import { updateProfile, updateEmail } from "firebase/auth";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createToast } from "vercel-toast";
import "vercel-toast/dist/vercel-toast.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [watchlistData, setWatchlistData] = useState([]);
  const [watchlistLoading, setWatchlistLoading] = useState(true);

  const fetchWatchlistData = async (userID) => {
    const apiKey = TMDB_API_KEY;
    const q = query(collection(db, "watchlist"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const userWatchlist = [];
    querySnapshot.forEach((doc) => {
      userWatchlist.push(doc.data());
    });

    const promises = userWatchlist.map(async ({ type, id }) => {
      const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;
      const response = await fetch(url);
      return await response.json();
    });

    const watchlistDetails = await Promise.all(promises);
    setWatchlistData(watchlistDetails);
    setWatchlistLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        setPhotoURL(currentUser.photoURL || "");
        fetchWatchlistData(currentUser.uid);
      } else {
        window.location.href = "/login";
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let newPhotoURL = photoURL;

      if (selectedFile) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `profile_images/${auth.currentUser.uid}`
        );
        await uploadBytes(storageRef, selectedFile);
        newPhotoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: newPhotoURL,
      });

      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName,
        email,
        photoURL: newPhotoURL,
      });

      setPhotoURL(newPhotoURL);
      setSelectedFile(null);
      createToast("Profile updated successfully!", {
        type: "success",
      });
      window.location.reload();
    } catch (error) {
      createToast(error.message, {
        type: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <Spinner size="lg" />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="flex flex-col items-center space-y-4 w-full md:w-auto">
              <Avatar
                src={previewURL || photoURL || "/default-avatar.png"}
                className="w-24 h-24"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
              <Button
                className="font-bold hover:bg-white hover:text-black hover:border-black border bg-black"
                as="label"
                htmlFor="profile-image"
                variant="flat"
              >
                Change Profile Picture
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <Input
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                fullWidth
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                fullWidth
              />
              <Button
                className="font-bold bg-white text-black hover:text-white border-black border hover:border-white hover:bg-black"
                type="submit"
                isLoading={updating}
                fullWidth
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Watchlist</h2>
            {watchlistData.length > 6 && (
              <Link
                className="text-xs lg:text-sm ml-auto text-white/80 flex items-center capitalize"
                to="/watchlist"
              >
                View All
                <FaChevronRight />
              </Link>
            )}
          </div>
          <div>
            {watchlistData.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <p className="text-lg text-gray-400 font-medium">
                  No items in watchlist
                </p>
                <Link to="/explore">
                  <Button color="primary" size="sm">
                    Browse Content
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {watchlistData.slice(0, 6).map((item) => (
                  <Link
                    key={item.id}
                    to={
                      item.first_air_date
                        ? `/info/tv/${item.id}`
                        : `/info/movie/${item.id}`
                    }
                    className="relative group hover:transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-sm text-white line-clamp-2">
                          {item.title || item.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
