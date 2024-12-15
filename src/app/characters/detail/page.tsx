"use client";

import { useState, useEffect } from "react";
import { fetchCharacterData } from "../.././lib/api";
import { Character } from "../../../types/character";
import { useParams } from "react-router-dom";

const CharacterDetailPage = () => {
  const { id } = useParams(); // Mengambil parameter "id" dari URL
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const films = await fetchCharacterData(); // Mengambil semua film dengan karakter
        const allCharacters = films.flatMap((film: any) => film.characterConnection.characters);
        const characterData = allCharacters.find((char: Character) => char.name === id); // Mencari karakter berdasarkan ID (atau nama, sesuai data ID karakter)
        setCharacter(characterData || null);
      } catch (err) {
        setError("Failed to fetch character data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-full p-8 bg-white rounded-lg shadow-md">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {character ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">{character.name}</h1>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <p className="text-sm text-gray-700">Gender: {character.gender}</p>
                <p className="text-sm text-gray-700">Birth Year: {character.birthYear}</p>
                <p className="text-sm text-gray-700">Height: {character.height} cm</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Character not found.</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDetailPage;