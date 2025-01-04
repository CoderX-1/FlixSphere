import App from "./App";
import Airing from "./pages/Airing";
import Animation from "./pages/Animation";
import Explore from "./pages/Explore";
import Horror from "./pages/Horror";
import InfoPage from "./pages/Info";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Popular from "./pages/Popular";
import SearchPage from "./pages/Search";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Trending from "./pages/Trending";
import Dmca from "./pages/Dmca";
import PrivacyPolicy from "./pages/Privacy";
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './components/ErrorPage';
import Watch from "./pages/Watch";
import WatchlistPage from "./pages/Watchlist";
import "./styles/index.css";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Info/:type/:id",
    element: <InfoPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Search",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Watch/:type/:id/:season?/:episode?",
    element: <Watch />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Watchlist",
    element: <WatchlistPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Explore",
    element: <Explore />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Trending",
    element: <Trending />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Dmca",
    element: <Dmca />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Popular",
    element: <Popular />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Horror",
    element: <Horror />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Animation",
    element: <Animation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Airing",
    element: <Airing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ErrorBoundary>
        <main className="w-full h-full">
          <RouterProvider router={router} />
        </main>
      </ErrorBoundary>
    </NextUIProvider>
  </React.StrictMode>
);
