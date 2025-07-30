import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../services/api";
import Spinner from "../components/spinner";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieById(id)
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Pattern Layer */}
      <div className="pattern"></div>

      {/* Content */}
      <main className="wrapper text-white relative z-10">
        {loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}

        {!loading && !movie && (
          <p className="text-red-500 text-lg">Movie not found.</p>
        )}

        {!loading && movie && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-2xl w-full shadow-lg"
            />

            <div className="md:col-span-2">
              <h1 className="text-gradient text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <span className="bg-light-100/10 px-3 py-1 rounded-lg text-light-200">
                  Release: {movie.release_date}
                </span>
                <span className="bg-light-100/10 px-3 py-1 rounded-lg text-light-200">
                  Language: {movie.original_language.toUpperCase()}
                </span>
                <span className="bg-light-100/10 px-3 py-1 rounded-lg text-light-200">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
              </div>

              {movie.genres && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="bg-purple-900/40 text-sm px-3 py-1 rounded-full text-light-200"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-100 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
