"use client";

import { useState, useEffect } from "react";
// import { fetchStarwarsData } from "../lib/api";
import { Film } from "../../types/film";
import { dummyFilms } from "../lib/dummyData";
import Link from "next/link"; // Import Link for navigation

const FilmPage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filmsPerPage, setFilmsPerPage] = useState(8);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        // const fetchedFilms: [Film] = await fetchStarwarsData(); // using API
        // setFilms(fetchedFilms || []);
        const fetchedFilms = dummyFilms; // using dummy data
        setFilms(fetchedFilms);
      } catch {
        setError("Failed to fetch film data."); // Set error if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  // Adjust films per page based on screen width
  useEffect(() => {
    const updateFilmsPerPage = () => {
      if (window.innerWidth <= 640) {
        setFilmsPerPage(4); // Display 4 films on mobile
      } else {
        setFilmsPerPage(8); // Display 8 films on larger screens
      }
    };

    updateFilmsPerPage();
    window.addEventListener("resize", updateFilmsPerPage);

    return () => {
      window.removeEventListener("resize", updateFilmsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(films.length / filmsPerPage);
  const currentFilms = films.slice(
    (currentPage - 1) * filmsPerPage,
    currentPage * filmsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-900 to-black">
      <div className="w-full max-w-7xl p-8 bg-transparent rounded-lg shadow-lg flex flex-col">
        {loading && <p className="text-gray-300">Loading...</p>}
        
        {/* Show error message if there's an error */}
        {error && <p className="text-red-500">{error}</p>}

        {films.length > 0 ? (
          <div className="flex-grow text-center">
            <h1 className="text-4xl font-bold text-white mb-6">FILM LIST</h1>
            {/* Grid layout for film cards */}
            <div className="grid gap-6 mt-6 mb-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentFilms.map((film) => (
                <div
                  key={film.id}
                  className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl border border-gray-600 hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-white">{film.title}</h2>
                      <p className="mt-2 text-xs text-gray-400">Release Date: {film.releaseDate}</p>
                      <p className="mt-2 text-xs text-gray-400">Director: {film.director}</p>
                      <p className="mt-2 mb-3 text-xs text-gray-400">Episode: {film.episodeID}</p>
                    </div>
                    <Link
                      href={`/films/${film.id}`}
                      className="text-blue-400 text-xs hover:text-blue-500 font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-auto">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:bg-gray-400 text-xs"
              >
                Prev
              </button>

              <span className="px-4 py-2 text-white text-xs">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:bg-gray-400 text-xs"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No films available.</p>
        )}
      </div>
    </div>
  );
};

export default FilmPage;
