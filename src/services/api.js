// src/api.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
export async function fetchMovieById(id) {
  const res = await fetch(
    `${API_BASE_URL}/movie/${id}&language=en-US`,
    API_OPTIONS
  );

  if (!res.ok) throw new Error("Failed to fetch movie");

  return await res.json();
}
