import {options, tmdb_url} from './tmdbConfig.jsx';

export default async function fetchMovieDetail(movie_id){
  if (!movie_id) return null;
  const detail_url = `${tmdb_url}/movie/${movie_id}?language=ko-KR`;
  const fetchMovieDetail = async (url) => {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  };
  const fetched_movie_detail = await fetchMovieDetail(detail_url);
  console.log("fetched_movie_detail:", fetched_movie_detail);
  return fetched_movie_detail;
};