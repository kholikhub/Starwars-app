"use client";

import { useState, useEffect } from "react";
import { dummyCharacters } from "../lib/dummyData";
// import { fetchStarwarsData } from "../lib/api";
import Link from "next/link"; // Import Link for navigation
import { Character } from "@/types/character";

const CharacterPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(8);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // const fetchedCharacter:[Character] = await fetchStarwarsData();
        // setCharacters(fetchedCharacter || []);
        const fetchedCharacter = dummyCharacters; // Using dummy data
        setCharacters(fetchedCharacter);
      } catch {
        setError("Failed to fetch character data."); // Set error if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Adjust films per page based on screen width
  useEffect(() => {
    const updateCharactersPerPage = () => {
      if (window.innerWidth <= 640) {
        setCharactersPerPage(4); // Display 4 films on mobile
      } else {
        setCharactersPerPage(8); // Display 8 films on larger screens
      }
    };

    updateCharactersPerPage();
    window.addEventListener("resize", updateCharactersPerPage);

    return () => {
      window.removeEventListener("resize", updateCharactersPerPage);
    };
  }, []);

  const totalPages = Math.ceil(characters.length / charactersPerPage);
  const currentCharacters = characters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
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

        {characters.length > 0 ? (
          <div className="flex-grow text-center">
            <h1 className="text-4xl font-bold text-white mb-4">CHARACTER LIST</h1>
            {/* Grid layout for character cards */}
            <div className="grid gap-3 mt-6 mb-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {currentCharacters.map((character) => (
                <div
                  key={character.name}
                  className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl border border-gray-600 hover:shadow-2xl transition-all"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-white">
                        {character.name}
                      </h2>
                      <p className="mt-2 text-xs text-gray-400">Gender: {character.gender}</p>
                      <p className="mt-2 text-xs text-gray-400">Birth Year: {character.birthYear}</p>
                      <p className="mt-2 text-xs text-gray-400">Height: {character.height}</p>
                      <p className="mt-2 text-xs text-gray-400">Mass: {character.mass}</p>
                      <p className="mt-2 mb-2 text-xs text-gray-400">Homeworld: {character.homeworld}</p>
                    </div>
                    <Link
                      href={`/characters/${character.name}`}
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
          <p className="text-gray-500">No characters available.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterPage;
