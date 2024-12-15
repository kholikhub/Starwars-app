export const fetchFilmData = async () => {
  const query = `
      query {
        allFilms {
          films {
            id
            title
            releaseDate
            episodeID
            director
          }
          totalCount
        }
      }
    `;

  try {
    const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Mengembalikan data film jika ada
    if (data.data && data.data.allFilms && data.data.allFilms.films) {
      return data.data.allFilms.films; // Kembalikan array films
    } else {
      throw new Error('No films data found');
    }
  } catch (err) {
    console.error(err); // Log error untuk debugging
    throw new Error('Failed to fetch film data.');
  }
};

export const fetchCharacterData = async () => {
  const query = `
      query {
        allFilms {
          films {
            id
            title
            releaseDate
            episodeID
            director
            characterConnection {
                characters {
                    name
                    gender
                    birthYear
                    height
                    mass
                    homeworld {
                        name
                    }               
                }
            }
          }
          totalCount
        }
      }
    `;

  try {
    const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Mengembalikan data film jika ada
    if (data.data && data.data.allFilms && data.data.allFilms.films) {
      return data.data.allFilms.films; // Kembalikan array films
    } else {
      throw new Error('No films data found');
    }
  } catch (err) {
    console.error(err); // Log error untuk debugging
    throw new Error('Failed to fetch film data.');
  }
};

