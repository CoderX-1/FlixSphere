export const TMDB_URL = "https://api.themoviedb.org/3";
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API;

export const endpoints = {

  netflix: "/discover/tv?with_networks=213",
  trending: "/trending/all/week",
  trending_tv: "/trending/tv/week",
  trending_movies: "/trending/movie/week",
  airing_today: "/tv/airing_today?language=en-US&sort_by=popularity.desc",
  popular: "/movie/popular",
  search: "/search/multi?language=en-US&sort_by=popularity.desc",
  animation: "/discover/movie?&with_genres=16",
  discover: "/discover/movie",
  horror:"/discover/movie?&with_genres=27",
  action:"/discover/movie?&with_genres=28",
  comedy:"/discover/movie?&with_genres=35",
  romance:"/discover/movie?&with_genres=10749",
  documentary:"/discover/movie?&with_genres=99",
};
