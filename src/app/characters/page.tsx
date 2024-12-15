"use client";

import { useState, useEffect } from "react";
import { fetchCharacterData } from ".././lib/api";
import { Character } from "../../types/character";

const CharacterPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]); // Menggunakan array untuk menyimpan banyak karakter
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const fetchedCharacters = await fetchCharacterData();
        console.log(fetchedCharacters); // Log data karakter yang diterima
        setCharacters(fetchedCharacters); // Mengatur state characters dengan data yang didapat
      } catch (err) {
        setError("Failed to fetch character data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-full p-8 bg-white rounded-lg shadow-md">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {characters.length > 0 ? (
          <div className="text-center">
            <h1 className="text-xl font-bold text-black">Character List</h1>
            <div className="grid grid-cols-4 grid-rows-2 gap-6 mt-6">
              {characters.map((character) => (
                <div
                  key={character.id}
                  className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
                >
                  <h2 className="text-lg font-semibold text-black">
                    {character.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Gender: {character.gender}
                  </p>
                  <p className="mt-2 text-sm text-gray-700">
                    Birth Year: {character.birthYear}
                  </p>
                  <p className="mt-2 mb-3 text-sm text-gray-700">
                    Height: {character.height} cm
                  </p>
                  <a
                    href={`/characters/${character.id}`}
                    className="mt-4 text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </a>
                </div>
              ))}
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
