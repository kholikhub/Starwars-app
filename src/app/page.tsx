'use client';

import { useState } from 'react';

const Home = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearch(query);
    if (query.length > 0) {
      // Simulate fetching suggestions
      const data = [
        'Luke Skywalker',
        'Leia Organa',
        'Darth Vader',
        'Yoda',
        'Obi-Wan Kenobi',
        'Han Solo',
        'Chewbacca',
      ];
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://cdn.wallpapersafari.com/90/29/4LbDOE.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold">Explore the Stars</h1>
            <p className="mt-3 text-sm md:text-lg text-gray-300">Discover the wonders of space and the epic stories of Star Wars.</p>
            <button className="mt-5 px-5 py-2 bg-yellow-500 text-black rounded-md text-sm font-medium hover:bg-yellow-600">Learn More</button>
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
            className="w-full p-3 rounded-md text-black"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white text-black mt-1 rounded-md shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSearch(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="p-6 md:p-12 bg-gray-800">
        <h2 className="text-2xl font-bold text-center" id="films">Why We Love Star Wars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Epic Stories</h3>
            <p className="mt-3 text-gray-300">From the Skywalker saga to standalone tales, Star Wars captivates with its storytelling.</p>
          </div>
          <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">Iconic Characters</h3>
            <p className="mt-3 text-gray-300">Luke, Leia, Darth Vader, and Yoda—unforgettable characters that define generations.</p>
          </div>
          <div className="bg-gradient-to-r from-black via-gray-800 to-black p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-bold">A Galaxy Far, Far Away</h3>
            <p className="mt-3 text-gray-300">Experience the thrill of starships, lightsabers, and intergalactic adventures.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
