import {tmdb_url, options} from './tmdbConfig.jsx';

export default async function fetchMovies(
    query="", page=1, sort="popularity.desc", min_vote="0"
){
    const fetch_url = (query==="")
    ? `${tmdb_url}/discover/movie?language=ko-KR&page=${page}&sort_by=${sort}&vote_average.gte=${min_vote}`
    : `${tmdb_url}/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`;
    console.log("fetch_url:", fetch_url);
    const fetchMovies2 = async (url) => {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('영화 정보를 가져오는 데 실패했습니다.');
      }
      const data = await response.json();
      return data.results;
    }
    const fetch_movies = await fetchMovies2(fetch_url);
    return fetch_movies;
}