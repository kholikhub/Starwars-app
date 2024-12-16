"use client";

import { useState, useEffect } from 'react';
import { dummyCharacters, dummyFilms } from "@/app/lib/dummyData"; // Import dummy data
import { Character } from "../types/character"; // Import Character type
import { Film } from "../types/film"; // Import Film type

const Home = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null); // For showing error if no match is found
  const [apiData, setApiData] = useState<Character[]>([]); // Correctly type API data as an array of Character objects
  const [apiFilms, setApiFilms] = useState<Film[]>([]); // Correctly type API films as an array of Film objects

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment below line if API is being used
        // const data: Character[] = await fetchStarwarsData(); 
        const data: Character[] = []; // Type the fetched data as an array of Character
        setApiData(data); // Store the fetched character data

        // Fetch films if needed
        // const filmsData: Film[] = await fetchFilmsData();
        const filmsData: Film[] = []; // Type the fetched films data as an array of Film
        setApiFilms(filmsData); // Store the fetched film data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle search input change
  const handleSearch = (query: string) => {
    setSearch(query);
    if (query.length > 0) {
      // First, filter the dummy characters
      const filteredDummyCharacters = dummyCharacters
        .filter((character) =>
          character.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive comparison
        )
        .map((character) => character.name);

      // Then, filter the dummy films
      const filteredDummyFilms = dummyFilms
        .filter((film) =>
          film.title.toLowerCase().includes(query.toLowerCase()) // Case-insensitive comparison
        )
        .map((film) => film.title);

      // Then, filter the API data
      const filteredApiCharacters = apiData
        .filter((character) =>
          character.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive comparison
        )
        .map((character) => character.name);

      const filteredApiFilms = apiFilms
        .filter((film) =>
          film.title.toLowerCase().includes(query.toLowerCase()) // Case-insensitive comparison
        )
        .map((film) => film.title);

      // Combine all suggestions: characters, films, and API data
      const combinedSuggestions = [
        ...filteredDummyCharacters,
        ...filteredDummyFilms,
        ...filteredApiCharacters,
        ...filteredApiFilms,
      ];
      setSuggestions(combinedSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions when search is empty
      setError(null); // Clear any previous error
    }
  };

  // Function to handle selection of a suggestion
  const handleSelect = (suggestion: string) => {
    setSearch(suggestion);
    setSuggestions([]); // Hide suggestions after selection
    // Redirect to character or film details page (for now assume it's character details)
    if (dummyFilms.some((film) => film.title === suggestion)) {
      const selectedFilm = dummyFilms.find((film) => film.title === suggestion);
      if (selectedFilm) {
        window.location.href = `/films/${selectedFilm.id}`; // Redirect to film details page using id
      }
    } else {
      window.location.href = `/characters/${suggestion}`; // Redirect to character details page
    }
  };

  // Function to handle Enter key press
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && search) {
      // First, search for the selected character in the dummy data
      const selectedCharacter = dummyCharacters.find(
        (character) => character.name.toLowerCase() === search.toLowerCase()
      );

      // Next, search for the selected film in the dummy data
      const selectedFilm = dummyFilms.find(
        (film) => film.title.toLowerCase() === search.toLowerCase()
      );

      // If no match is found in the dummy data, check API data if needed
      if (!selectedCharacter && !selectedFilm) {
        const apiCharacter = apiData.find(
          (character) => character.name.toLowerCase() === search.toLowerCase()
        );

        const apiFilm = apiFilms.find(
          (film) => film.title.toLowerCase() === search.toLowerCase()
        );

        // If API data has the match, redirect accordingly
        if (apiCharacter) {
          window.location.href = `/characters/${apiCharacter.name}`;
        } else if (apiFilm) {
          window.location.href = `/films/${apiFilm.id}`; // Use id here instead of title
        } else {
          setError('Character or Film not found');
        }
      } else {
        // If character or film is found in dummy data, redirect accordingly
        if (selectedCharacter) {
          window.location.href = `/characters/${selectedCharacter.name}`;
        } else if (selectedFilm) {
          window.location.href = `/films/${selectedFilm.id}`; // Use id here instead of title
        }
      }
    }
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Hero Section */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://cdn.wallpapersafari.com/90/29/4LbDOE.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold">Explore the Stars</h1>
            <p className="mt-3 text-sm md:text-lg text-gray-300">
              Discover the wonders of space and the epic stories of Star Wars.
            </p>
            <button className="mt-5 px-5 py-2 bg-yellow-500 text-black rounded-md text-sm font-medium hover:bg-yellow-600">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <section className="p-6 bg-gray-800">
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search films or characters..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleEnter}
            className="w-full p-3 rounded-md text-black"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white text-black mt-1 rounded-md shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p> // Display error if no match is found
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="p-6 md:p-12 bg-gray-800">
        <h2 className="text-2xl font-bold text-center" id="films">
          Why We Love Star Wars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Epic Stories</h3>
            <p className="mt-3 text-gray-300">
              From the Skywalker saga to standalone tales, Star Wars captivates with its storytelling.
            </p>
          </div>
          <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Iconic Characters</h3>
            <p className="mt-3 text-gray-300">
              Luke, Leia, Darth Vader, and Yoda—unforgettable characters that define generations.
            </p>
          </div>
          <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Legendary Universe</h3>
            <p className="mt-3 text-gray-300">
              Explore a galaxy far, far away with stunning visuals, iconic ships, and rich lore.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
