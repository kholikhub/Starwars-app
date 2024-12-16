"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Film } from "../../../types/film";
import { fetchStarwarsData } from "../../lib/api";
import Link from "next/link";
import { dummyFilms } from "@/app/lib/dummyData";

const FilmDetailPage = () => {
  const { id } = useParams();

  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilm = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const allFilms = dummyFilms; // using dummy data
      // const allFilms = await fetchStarwarsData(); // using api data
      const filmData = allFilms.find((film: Film) => film.id === id); 
      setFilm(filmData || null);
    } catch (err) {
      console.error("Error fetching film data:", err);
      setError("Gagal mengambil data film.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFilm(id as string); // Pastikan id berupa string
    }
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-4xl w-full bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
        {loading && <p className="text-gray-200 text-center py-4">Memuat...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        {film ? (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white">{film.title}</h1>
            <p className="text-lg text-gray-100">Episode: {film.episodeID}</p>
            <p className="text-lg text-gray-100">Rilis: {film.releaseDate}</p>
            <p className="text-lg text-gray-100">Sutradara: {film.director}</p>

            {/* Character List using api*/}
            {/* <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Characters:</h3>
               <div className="flex overflow-x-auto space-x-4">
                {film.characterConnection.characters.map((character, index) => (
                  <Link key={index} href={`/character/${character.name}`}>
                    <div className="w-64 bg-gray-300 rounded-lg shadow-md p-4 hover:bg-gray-200">
                      <h4 className="font-semibold text-lg text-black">{character.name}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div> */}

            {/* Character List using dummy data*/}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Characters:</h3>
               <div className="flex overflow-x-auto space-x-4">
                {film.characters && film.characters.length > 0?(
                  film.characters.map((character, index) => (
                    <Link key={index} href={`/characters/${character.name}`}>
                      <div className="w-64 bg-gray-300 rounded-lg shadow-md p-4 hover:bg-gray-200">
                        <h4 className="font-semibold text-lg text-black">{character.name}</h4>
                      </div>
                    </Link>
                  ))
                ): (
                  <p className="text-gray-500 text-center py-4">Character tidak ditemukan.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Film tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default FilmDetailPage;
