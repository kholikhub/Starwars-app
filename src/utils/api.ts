// src/utils/api.ts
export const fetchData = async <T>(query: string): Promise<T> => {
    const response = await fetch('https://graphql.org/swapi-graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    });
    const { data } = await response.json();
    return data as T; // Menggunakan tipe generik untuk response
  };
  