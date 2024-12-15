// src/types/character.ts
export interface Character {
    name: string;
    gender: string;
    birthYear: string;
    height: string;
    mass: string;
    homeworld: string;
    films: Film[];
  }

export interface Film {
    id:  string;
    title: string;
    episodeID: number;
    releaseDate: string;
    director: string;
}

export interface GetCharactersResponse {
  allCharacters: {
    characters: Film[];
  };
};