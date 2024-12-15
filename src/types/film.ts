// types.ts
export interface Film {
  id:  string;
  title: string;
  episodeID: number;
  releaseDate: string;
  director: string;
  characters: Characters[];
};

export interface Characters {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  mass: string;
  homeworld: string;
};

export interface GetFilmsResponse {
  allFilms: {
    films: Film[];
  };
};
