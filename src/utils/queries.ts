// Query untuk mengambil daftar film
// utils/queries.ts
export const GET_FILMS = `
  query GetFilms {
    allFilms {
      films {
        episodeID
        title
        releaseDate
        director
      }
    }
  }
`;


// Query untuk mengambil detail film berdasarkan id
export const GET_FILM_BY_ID = (id: string) => `
  query {
    film(id: "${id}") {
      id
      title
      director
      episodeID
      openingCrawl
    }
  }
`;

// Query untuk mengambil detail karakter berdasarkan id
export const GET_CHARACTER_BY_ID = (id: string) => `
  query {
    person(id: "${id}") {
      id
      name
      gender
      birthYear
      height
      mass
    }
  }
`;

