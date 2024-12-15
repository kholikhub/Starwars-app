"use client"; // Add this directive to mark the file as a client-side component

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // To get the 'id' parameter from the URL
import { dummyCharacters } from "../../lib/dummyData"; // Import dummy data

const CharacterDetailPage = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL

  const [character, setCharacter] = useState<any | null>(null); // State to store character data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = () => {
      try {
        const characterData = dummyCharacters.find((char) => char.name === id);
        if (!characterData) throw new Error("Character not found.");
        setCharacter(characterData);
      } catch (err) {
        setError("Failed to fetch character details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!character) return <p className="text-center text-gray-500">Character not found.</p>;

  // Safely check if films exists
  const films = character.films || []; // Default to empty array if films is undefined or null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-indigo-900 to-black">
      <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl border border-gray-600 hover:shadow-2xl transition-all">
        <h1 className="text-4xl font-bold text-white mb-6">{character.name}</h1>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-200"><span className="font-semibold">Gender:</span> {character.gender}</p>
          <p className="text-lg text-gray-200"><span className="font-semibold">Height:</span> {character.height}</p>
          <p className="text-lg text-gray-200"><span className="font-semibold">Birth Year:</span> {character.birthYear}</p>
          <p className="text-lg text-gray-200"><span className="font-semibold">Mass:</span> {character.mass}</p>
          <p className="text-lg text-gray-200"><span className="font-semibold">Homeworld:</span> {character.homeworld}</p>
          
          {/* Related Films Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Related Films:</h3>
            <div className="flex flex-wrap gap-4">
              {films.length > 0 ? (
                films.map((film: any) => (
                  <div key={film.id} className="w-64 bg-gray-300 p-4 rounded-lg shadow-md">
                    <h4 className="font-semibold text-black">{film.title}</h4>
                    <p className="text-xs text-gray-600">Episode: {film.episodeID}</p>
                    <p className="text-xs text-gray-600">Director: {film.director}</p>
                    <p className="text-xs text-gray-600">Release Date: {film.releaseDate}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No films available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
