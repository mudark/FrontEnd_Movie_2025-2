export const tmdb_url = 'https://api.themoviedb.org/3';
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_LIST_API_KEY,
  }
};