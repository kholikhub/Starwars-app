"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Character } from "../../../types/character";  // Assuming Character type exists
import { dummyCharacters } from "@/app/lib/dummyData";  // Correcting dummy data import
// import { fetchStarwarsData } from "../../lib/api";
import Link from "next/link";

const CharacterDetailPage = () => {
  const { name } = useParams();  // Using 'name' instead of 'id'

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacter = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const allCharacters = dummyCharacters; // using dummy data
      // const allCharacters = await fetchStarwarsData(); // using api data
    
      const filmCharacter = allCharacters.find((character: Character)=> character.name === name);
      setCharacter(filmCharacter || null);
    } catch (err) {
      console.error("Error fetching Character data:", err);
      setError("Gagal mengambil data Character.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (name) {
      fetchCharacter(name as string); 
    }
  }, [name]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-4xl w-full bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
        {loading && <p className="text-gray-200 text-center py-4">Memuat...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        {character ? (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white">{character.name}</h1>
            <p className="text-lg text-gray-100">Gender: {character.gender}</p>
            <p className="text-lg text-gray-100">Birth Year: {character.birthYear}</p>
            <p className="text-lg text-gray-100">Height: {character.height}</p>
            <p className="text-lg text-gray-100">Mass: {character.mass}</p>
            <p className="text-lg text-gray-100">Homeworld: {character.homeworld}</p>

            {/* Films section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Films:</h3>
              <div className="space-y-4">
                {character.films && character.films.length > 0 ? (
                  character.films.map((film, index) => (
                    <Link key={index} href={`/films/${film.id}`}>
                      <div className="w-64 bg-gray-300 rounded-lg shadow-md p-4 hover:bg-gray-200" >
                      <h4 className="font-semibold text-lg text-black">{film.title}</h4>
                      <p className="text-sm text-gray-600">Released: {film.releaseDate}</p>
                      <p className="text-sm text-gray-600">Director: {film.director}</p>
                      <p className="text-sm text-gray-600">Episode: {film.episodeID}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">No films available for this character.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Karakter tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;
