"use client";

import { useState, useEffect } from "react";
import { fetchFilmData } from ".././lib/api";
import { Film } from "../../types/film";

const Home = () => {
  const [films, setFilms] = useState<Film[]>([]); // Menggunakan array untuk menyimpan banyak film
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const fetchedFilms = await fetchFilmData();
        console.log(fetchedFilms); // Log data film yang diterima
        setFilms(fetchedFilms); // Mengatur state films dengan data yang didapat
      } catch (err) {
        setError("Failed to fetch film data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-full p-8 bg-white rounded-lg shadow-md">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {films.length > 0 ? (
          <div className="text-center">
            <h1 className="text-xl font-bold text-black">Film List</h1>
            <div className="grid grid-cols-4 grid-rows-2 gap-6 mt-6">
              {films.map((film) => (
                <div
                  key={film.id}
                  className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
                >
                  <h2 className="text-lg font-semibold text-black">
                    {film.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Release Date: {film.releaseDate}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Director: {film.director}
                  </p>
                  <p className="mt-2 mb-3 text-sm text-gray-700">
                    Episode: {film.episodeID}
                  </p>
                  <a
                    href={`/films/${film.id}`}
                    className="mt-4 text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No films available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
