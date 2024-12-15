"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Untuk mendapatkan parameter id
import { Film } from "../../../types/film";
import { dummyFilms } from "../../lib/dummyData"; // Impor data dummy
import Link from "next/link"; // Impor Link untuk navigasi antar halaman

const FilmDetailPage = () => {
  const { id } = useParams(); // Mendapatkan parameter 'id' dari URL

  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Jika id tidak ada, keluar lebih awal

    const fetchFilm = () => {
      try {
        const filmData = dummyFilms.find((film) => film.id === id); // Mencari film berdasarkan id
        setFilm(filmData || null); // Set film jika ditemukan
      } catch (err) {
        setError("Gagal mengambil data film.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-4xl w-full bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
        {loading && <p className="text-gray-200 text-center py-4">Memuat...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        {film ? (
          <div className="p-6">
            {/* <div className="relative mb-6"> // when using image
              <img
                src={film.posterUrl} // Tambahkan gambar poster film
                alt={film.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white bg-black bg-opacity-50 p-2 rounded-lg">{film.title}</h1>
            </div> */}
            <div className="relative mb-6">
              <h1 className="flex items-center justify-center text-3xl font-bold text-white bg-black bg-opacity-60 p-2 rounded-lg">{film.title}</h1>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-100">
                <span className="font-semibold">Episode:</span> {film.episodeID}
              </p>
              <p className="text-lg text-gray-100">
                <span className="font-semibold">Tanggal Rilis:</span> {film.releaseDate}
              </p>
              <p className="text-lg text-gray-100">
                <span className="font-semibold">Sutradara:</span> {film.director}
              </p>

              {/* Character Section with Title */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Character:</h3>
                <div className="flex overflow-x-auto space-x-4">
                  {film.characters.map((character, index) => (
                    <Link
                      key={index}
                      href={`/character/${character.name}`} // Gantilah dengan rute detail karakter sesuai dengan ID atau nama
                    >
                      <div className="w-64 bg-gray-300 bg-opacity-75 rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-200 transition-all">
                        <h4 className="font-semibold text-lg text-black">{character.name}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
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
