import React from 'react';
import { Character } from '../types/character';

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Star Wars Characters</h2>
      <ul className="list-disc pl-5">
        {characters.map((character) => (
          <li key={character.id} className="cursor-pointer hover:text-blue-500">
            <a href={`/characters/${character.id}`}>
              <h3 className="text-xl font-bold">{character.name}</h3>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
