import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth, db } from "../services/Firebase";
import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import Filter from "bad-words";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { createToast } from "vercel-toast";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const checkForBadWords = (text) => {
    const filter = new Filter();
    return filter.isProfane(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return createToast("Please fill in all the fields.", {
        cancel: "Cancel",
        timeout: 3000,
        type: "error",
      });
    } else {
      if (checkForBadWords(username) || checkForBadWords(email)) {
        alert(
          "Your username or email contains inappropriate words. Please choose a different one."
        );
      } else {
        try {
          const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCred.user;
          const colRef = doc(db, "users", user.uid);
          await setDoc(colRef, { username: username });
          sendEmailVerification(user, {
            url: `${import.meta.env.VITE_WEBSITE_URL}/signup?verified=true`,
          })
            .then(() => {
              return createToast(
                "We Have Sent You An Email For Verification.",
                {
                  cancel: "Hide",
                  timeout: 3000,
                  type: "info",
                }
              );
            })
            .catch((error) => {
              return createToast(error.message, {
                cancel: "Cancel",
                type: "error",
                timeout: 3000,
              });
            });
        } catch (error) {
          if (error.message.includes("email-already-in-use")) {
            return createToast("The Email Is Already Exists.", {
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
            });
          }
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`p-3 flex flex-col items-center justify-center min-h-screen`}
        >
          <div className="container mx-auto relative w-full max-w-md flex flex-col justify-center border-1 border-white rounded-xl h-[75vh] p-4 md:p-6 lg:p-8 gap-4 bg-[#000000cc]">
            <div className="flex flex-col items-start">
              <h1 className="line-clamp-2 font-semibold leading-tight text-3xl lg:text-4xl py-1 flex-shrink-0 text-white mt-2 ">
                Signup
              </h1>
              <p className="line-clamp-2 text-white leading-tight py-1 flex-shrink-0">
                Just some details to get you in.!
              </p>
            </div>
            <form className="w-full flex flex-col justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl text-white border-1 border-white bg-transparent h-14 min-h-unit-10 px-4"
                required={true}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl text-white border-1 border-white bg-transparent h-14 min-h-unit-10 px-4"
                required={true}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl text-white border-1 border-white bg-transparent h-14 min-h-unit-10 px-4"
                required={true}
              />

              <Button
                type="submit"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#628EFF] bg-[#8740CD] to-[#580475] w-full text-base"
              >
                SignUp
              </Button>
              <div className="text-[#4D4D4D]">or</div>
              <div className="flex gap-2">
                <Button
                  onClick={handleGoogleSignIn}
                  isIconOnly
                  className="bg-transparent"
                >
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    ></path>
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                </Button>
                <Button
                  onClick={handleFacebookSignIn}
                  isIconOnly
                  className="bg-transparent"
                >
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    id="facebook"
                  >
                    <defs>
                      <linearGradient
                        id="a"
                        x1="12"
                        x2="12"
                        y1="23"
                        y2="1"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stop-color="#0066ef"></stop>
                        <stop offset="1" stop-color="#00b2ff"></stop>
                      </linearGradient>
                    </defs>
                    <g>
                      <g>
                        <path
                          fill="url(#a)"
                          d="M23 12c0 7.11-2.33 10.26-8.45 10.88A25.38 25.38 0 0 1 12 23h-1.09C3.7 22.71 1 19.66 1 12 1 4 4 1 12 1s11 3 11 11Z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M14.55 10.53v2.33h3.37l-.53 3.42h-2.84v6.6A25.38 25.38 0 0 1 12 23h-1.09v-6.7H7.83v-3.44h3.08v-2.57a4.68 4.68 0 0 1 1.24-3.41C13.89 5 18 6 18 6v2.86h-1.78a1.67 1.67 0 0 0-1.67 1.67Z"
                        ></path>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                      </g>
                    </g>
                  </svg>
                </Button>
              </div>
              <div className="relative z-10 text-white">
                <p className="text-sm xs:text-base">
                Already Registered?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer/>
    </>
  );
};

export default SignUp;
