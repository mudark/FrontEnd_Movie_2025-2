import React,{useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [movie_list, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [input_text, setInputText] = useState("");
  const [query, setQuery] = useState("");
  const [movie_detail, setMovieDetail] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [my_vote, setMyVote] = useState(0);
  const [show_more_btn, setShowMoreBtn] = useState(true);

  const handlerSearch = (e) => {
    e.preventDefault();
    if (input_text === "") return;
    console.log("검색어:", input_text);
    setMovieList([]);
    setPage(1);
    setQuery(input_text);
    navigate("/search?query="+input_text);
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
    const params = new URLSearchParams(location.search);
    const sort = params.get("sort") || "popularity.desc";
    const min_vote = params.get("min_vote") || "0";
    const url = (query==="")
      ? `https://api.themoviedb.org/3/discover/movie?language=ko-KR&page=${page}&sort_by=${sort}&vote_average.gte=${min_vote}`
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
      if (fetchedMovies.length < 20) {
        setShowMoreBtn(false);
      } else {
        setShowMoreBtn(true);
      } 
      setMovieList(prevMovies => {
        let combinedList = (page === 1) ? fetchedMovies : [...prevMovies, ...fetchedMovies];
        if (query !== "") {
          combinedList = [...combinedList].sort((a, b) => {
            if (sort === "vote_average.desc") {
              return b.vote_average - a.vote_average;
            } else {
              return b.popularity - a.popularity;
            }
          });
        }
        combinedList = combinedList.filter(movie => movie.vote_average >= parseFloat(min_vote));
        return combinedList;
      });
    }).catch(error => {
      console.error(error);
    });
  }, [page,query,location.search]);
  return (
    <>
    <div id="movie-detail-wrap"
      className="fixed top-0 left-0 w-full !h-full z-[50] flex-col items-center justify-center bg-black/50"
      style={{display: showDetail ? "flex" : "none"}}>
      <div id="movie-detail"
        className="relative w-[1000px] max-[1000px] h-[720px] !my-5 mx-auto bg-[#212121] rounded-[20px] z-10 min-md:max-[1000px]:!max-w-[740px] max-[1000px]:!h-[544px] min-md:max-[1000px]:w-[740px] max-md:w-[390px]"
      >
        <button id="detail-close-btn"
          type="button"
          className="absolute top-[10px] right-[10px] w-9 h-9 border border-white rounded-[18px] bg-[#383838] text-center leading-[18px] z-20"
          onClick={() => setShowDetail(false)}
        >
        X  
        </button>
        <p id="movie-detail-title"
          className="absolute top-0 w-full text-center !py-[10px] px-0 border-b border-[#383838] bg-[#212121] !rounded-t-[20px] font-bold"
        >
          {movie_detail?.title}
        </p>
        <img
            id="movie-detail-poster"
            className="absolute bottom-10 left-10 w-[360px] h-[540px] object-cover bg-[#212121] max-[1000px]:w-[260px] max-[1000px]:h-[400px] max-md:!hidden"
            src={`https://image.tmdb.org/t/p/original${movie_detail?.poster_path}`}
        />
        <div id="movie-detail-info"
          className="!absolute top-[100px] right-10 w-[520px] h-[200px] text-left bg-[#212121] max-md:!w-[350px] max-md:!right-[5%] min-md:max-[1000px]:!w-[383px]"
        >
            <span className="bg-[#212121]">{movie_detail?.genres?.map(genre => genre.name).join(", ")}</span>
            <img src={star_image} className="inline bg-[#212121]"/>
            <span className="bg-[#212121]">{movie_detail?.vote_average.toFixed(1)}</span>
            <p className="bg-[#212121] mt-2">{movie_detail?.overview}</p>
        </div>
        <div id="my-vote"
          className="!absolute w-[540px] h-[80px] bg-[#383838] bottom-[20px] right-[20px] rounded-[10px] !flex items-center justify-center p-[10px] text-white max-md:!right-[5%] max-md:!w-[350px] min-md:max-[1000px]:!w-[373px]"
        >
            내 별점
            {Array(my_vote).fill(true).map((_, index) => (
              <button
                key={index}
                className="half-star-btn w-[10px] h-5 border-none p-0 m-0 bg-[#383838]"
                onClick={() => setMyVote(index + 1)}
              >
                <img
                  src={yellow_half_star_image}
                  className="w-[10px] h-5 object-contain bg-[#383838]"
                  style={{transform: `scaleX(${(index%2===0) ? -1 : 1})`}}
                />
              </button>
            ))} 
            {Array(10-my_vote).fill(true).map((_, index) => (
              <button
                key={my_vote+index}
                className="half-star-btn w-[10px] h-5 border-none p-0 m-0 bg-[#383838]"
                onClick={() => setMyVote(my_vote + index + 1)}
              >
                <img
                  src={gray_half_star_image}
                  className="w-[10px] h-5 object-contain bg-[#383838]"
                  style={{transform: `scaleX(${((my_vote+index)%2===0) ? -1 : 1})`}}
                />
              </button>
            ))}
            <span className="bg-[#383838] ml-2">{my_vote}</span>
        </div>
      </div>
    </div>
    <header id="header"
      //style={{ display: 'flex', flexDirection: 'row', justifyContent: 'between', alignItems: 'center' }}
      className="group w-full !flex !flex-row !flex-nowrap !justify-between !items-center m-0 p-0"
    >
      <button
        id="logo"
        type="button"
        className="w-[123px] h-[6em] inline-flex flex-none p-0 m-5 border-none bg-black transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] group-has-[input:focus]:w-0"
        onClick={() => {
          if (query === "") return;
          setQuery("");
          setMovieList([]);
          setPage(1);
          navigate("/");
        }}>
        <img src={logo_image} className="h-full w-full object-contain"/>
      </button>
      <form id="search"
        className="w-[324px] !p-[5px] rounded-[10px] bg-white flex items-center mr-5 justify-between max-[440px]:!w-[100px] group-has-[input:focus]:flex-1"
        onSubmit={(e) => handlerSearch(e)}
      >
        <input
          type="text"
          id="search-text"
          placeholder="검색"
          className="bg-white border-none p-0 m-0 text-black outline-none w-full"
          value={input_text}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button id="search-btn" type="submit">
          <img src={search_btn_image} className="h-6 bg-white"/>
        </button>
      </form>
    </header>
    <div id="movie-table"
      className="w-[920px] my-5 mx-auto flex flex-wrap justify-between gap-[10px] bg-black text-black border-none max-md:!w-[90%]"
    >
      <p id="movie-table-title"
        className="w-full text-center m-0"
      >
        {(query === "") ? '현재 인기있는 영화' : `검색 결과 : ${query}`}
      </p>
      {movie_list.length === 0 && (
        <span className="w-full text-center">검색 결과 없음</span>
      )}
      <div className="w-full flex gap-[10px] mb-2">
        <button 
          onClick={() => {
            setPage(1);
            navigate(`${location.pathname}?query=${query}&sort=popularity.desc`);
          }}
          className="px-[1.2em] py-[0.6em] rounded-[8px] border-2 text-black text-[1em] font-bold bg-white"
        >
          인기순
        </button>
        <button 
          onClick={() => {
            setPage(1);
            navigate(`${location.pathname}?query=${query}&sort=vote_average.desc`);
          }}
          className="px-[1.2em] py-[0.6em] rounded-[8px] border-2 text-black text-[1em] font-bold bg-white"
        >
          평점순
        </button>
        <select
          onChange={(e) => {
            setPage(1);
            navigate(`${location.pathname}?query=${query}&sort=popularity.desc&min_vote=${e.target.value}`)
          }}
        >
          <option value="0">모든 평점</option>
          <option value="9">9점 이상</option>
          <option value="8">8점 이상</option>
          <option value="7">7점 이상</option>
          <option value="5">5점 이상</option>
        </select>
      </div>
      {movie_list.map((movie) => (
        <button
          className="movie-card w-[182px] max-[440px]:!w-[140px] max-[440px]:!h-[284px] h-auto md:h-[359px] border-none bg-black text-left m-0 p-0"
          key={movie.id}
          data-id={movie.id}
          onClick={(e) => handlerMovieDetail(e)}
        >
          <img
            className="poster w-full h-[273px] object-cover max-[440px]:h-[220px]"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
          <p className="movie-card-title w-full h-10 overflow-hidden text-ellipsis whitespace-nowrap bg-black">
            {movie.title}
          </p>
          <span className="bg-black">{movie.vote_average.toFixed(1)}</span>
          <img src={star_image} className="inline bg-black ml-1 w-4 h-4"/>
        </button>
      ))}
      <button
        id="movie-more-btn"
        type="button"
        className="w-full !bg-red-600 py-3 rounded-[8px] transition-colors"
        style={{display: show_more_btn ? "block" : "none"}}
        onClick={() => setPage(page + 1)}
      >
        영화 더보기
      </button>
    </div>
    </>
  );
}

export default MovieTable;
