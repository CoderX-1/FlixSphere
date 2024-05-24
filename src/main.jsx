// Imports
// Pages
import App from "./App";
import ActorInfoPage from "./pages/ActorInfo";
import InfoPage from "./pages/Info";
import Login from "./pages/Login";
import SearchPage from "./pages/Search";
import SignUp from "./pages/SignUp";
import Watch from "./pages/Watch";
import Watch2 from "./pages/Watch2";
import Watch3 from "./pages/Watch3";
import Popular from "./pages/Popular";
// import Watch4 from "./pages/Watch4";
import Horror from "./pages/Horror";
import WatchlistPage from "./pages/Watchlist";
import NotFound from "./pages/NotFound"; // Import the custom 404 page component
import Discover from "./pages/Discover";
import Airing from "./pages/Airing";
import Trending from "./pages/Trending";
import Animation from "./pages/Animation";
// import Anime from "./pages/Anime";
// Styles
import "./styles/index.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/actor/:id",
    element: <ActorInfoPage />,
  },
  {
    path: "/info/:type/:id",
    element: <InfoPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/watch/:type/:id/:season?/:episode?",
    element: <Watch />,
  },
  {
    path: "/watch2/:type/:id/:season?/:episode?",
    element: <Watch2 />
  },
  {
    path: "/Watch3/:type/:id/:season?/:episode?",
    element: <Watch3 />,
  },
  // {
  //   path: "/Watch4/:type/:id/:season?/:episode?",
  //   element: <Watch4 />,
  // },
  {
    path: "/watchlist",
    element: <WatchlistPage />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },

  {
    path: "/Trending",
    element: <Trending />,
  },
 
  {
    path: "/Popular",
    element: <Popular />,
  },
  
  {
    path: "/Horror",
    element: <Horror />,
  },
  {
    path: "/Animation",
    element: <Animation />,
  },
  {
    path: "/Airing",
    element: <Airing />,
  },
  
  // Add the 404 route at the end
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

// Render the app
ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="w-full h-full bg-[#202020">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
