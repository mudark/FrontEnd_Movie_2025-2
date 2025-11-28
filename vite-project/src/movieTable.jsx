import React,{useEffect, useState} from "react";
import search_btn_image from "./assets/search_button.png";
import logo_image from "./assets/logo.png";
import star_image from "./assets/star.svg";
import gray_half_star_image from "./assets/gray_half_star.png";
import yellow_half_star_image from "./assets/yellow_half_star.png";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_LIST_API_KEY,
  }
};
console.log(import.meta.env.LIST_API_KEY);

function MovieTable() {
  const [movie_list, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [movie_detail, setMovieDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [my_vote, setMyVote] = useState(0);

  const handlerSearch = (e) => {
    e.preventDefault();
    setQuery(e.target[0].value);
    console.log("검색어:", e.target[0].value);
    setMovieList([]);
    setPage(1);
  }
  const handlerMovieDetail = async (e) => {
    e.preventDefault();
    const movie_id = e.currentTarget.getAttribute('data-id');
    const detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR`;
    const fetchMovieDetail = async (url) => {
      const response = await fetch(url, options);
      return response.json();
    };
    const detail = await fetchMovieDetail(detail_url);
    setMovieDetail(detail);
    setShowDetail(true);
    const storedVote = localStorage.getItem("my_vote_" + movie_id);
    if (storedVote) {
      const parsedVote = JSON.parse(storedVote);
      setMyVote(parsedVote.value);
    } else {
      setMyVote(0);
    }
  }
  useEffect(() => {
    const setLocalStorageTimer = (key, value, time) => {
        const next = new Date().getTime()+time;
        const item = {value: value, expiry: next};
        localStorage.setItem(key, JSON.stringify(item));
    }
    setLocalStorageTimer("my_vote_"+movie_detail?.id, my_vote, 86400000);
    console.log(`내 별점 ${movie_detail?.id}:`, my_vote);
  },[my_vote]);
  useEffect(() => {
    console.log("영화 상세보기:", movie_detail);
  },[movie_detail]);
  useEffect(() => {
    const url = (query==="")
      ? `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`
      : `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`;
    const fetchMovies = async (url) => {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('영화 정보를 가져오는 데 실패했습니다.');
      }
      const data = await response.json();
      return data.results;
    }
    fetchMovies(url).then(fetchedMovies => {
      setMovieList([...movie_list, ...fetchedMovies]);
    }).catch(error => {
      console.error(error);
    });
  }, [page,query]);
  return (
    <>
    <div
      id="movie-detail-wrap"
      style={{display: showDetail ? "flex" : "none"}}>
      <div id="movie-detail">
        <button id="detail-close-btn"
          type="button"
          onClick={() => setShowDetail(false)}
        >
        X  
        </button>
        <p id="movie-detail-title">{movie_detail?.title}</p>
        <img
            id="movie-detail-poster"
            src={`https://image.tmdb.org/t/p/original${movie_detail?.poster_path}`}
        />
        <div id="movie-detail-info">
            <span>{movie_detail?.genres?.map(genre => genre.name).join(", ")}</span>
            <img src={star_image} />
            <span>{movie_detail?.vote_average.toFixed(1)}</span>
            <p>{movie_detail?.overview}</p>
        </div>
        <div id="my-vote">
            내 별점
            {Array(my_vote).fill(true).map((_, index) => (
              <button
                key={index}
                className="half-star-btn"
                onClick={() => setMyVote(index + 1)}
              >
                <img
                  src={yellow_half_star_image}
                  style={{transform: `scaleX(${(index%2===0) ? -1 : 1})`}}
                />
              </button>
            ))} 
            {Array(10-my_vote).fill(true).map((_, index) => (
              <button
                key={my_vote+index}
                className="half-star-btn"
                onClick={() => setMyVote(my_vote + index + 1)}
              >
                <img
                  src={gray_half_star_image}
                  style={{transform: `scaleX(${((my_vote+index)%2===0) ? -1 : 1})`}}
                />
              </button>
            ))}
            {my_vote}
        </div>
      </div>
    </div>
    <header id="header">
      <button
        id="logo"
        type="button"
        onClick={() => {
          setQuery("");
          setMovieList([]);
          setPage(1);
        }}>
        <img src={logo_image} />
      </button>
      <form id="search" onSubmit={(e) => handlerSearch(e)}>
        <input
          type="text"
          id="search-text"
          placeholder="검색"
          value={query}
          onChange={(e) => {
            setMovieList([]);
            setQuery(e.target.value);
          }}
        />
        <button id="search-btn" type="submit">
          <img src={search_btn_image} />
        </button>
      </form>
    </header>
    <div id="movie-table">
      <p id="movie-table-title">현재 인기있는 영화</p>
      {movie_list.length === 0 && (
        <span>검색 결과 없음</span>
      )}
      {movie_list.map((movie) => (
        <button
          className="movie-card"
          key={movie.id}
          data-id={movie.id}
          onClick={(e) => handlerMovieDetail(e)}
          >
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
          <p>{movie.title}</p>
          <span>{movie.vote_average.toFixed(1)}</span>
          <img src={star_image} />
        </button>
      ))}
      <button
        id="movie-more-btn"
        type="button"
        onClick={() => setPage(page + 1)}
        >
        영화 더보기
      </button>
    </div>
    </>
  );
}

export default MovieTable;
