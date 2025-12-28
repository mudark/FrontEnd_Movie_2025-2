import React,{useEffect, useState} from "react";
import {useMyMoviesContext} from '../hooks/useMyMoviesContext.jsx';
import MovieHeader from "../components/movieHeader.jsx";
import MovieTable from "../components/movieTable.jsx";
import MovieDetail from "../components/movieDetail.jsx";
import bolonaze_image from "../assets/bolonaze.jpg";

export default function MyPage() {
    const my_movies = useMyMoviesContext();
    const [show,setShow] = useState(`voted_movies`);
    console.log('my id :',my_movies.id);
    const handlerVotedMovies=(e)=>{
        e.preventDefault();
        setShow(`voted_movies`);
        my_movies.setMovies(my_movies.voted_movies);
    };
    const handlerWishedMovies=(e)=>{
        e.preventDefault();
        setShow(`wished_movies`);
        my_movies.setMovies(my_movies.wished_movies);
    };
    useEffect(()=>{
        my_movies.setMovies(my_movies.voted_movies);
        my_movies.setShowMore(false);
        my_movies.setPage(1);
    },[]);
    console.log("MyPage movies:", my_movies.movies);
    const bg=`!bg-zinc-800`;
    return (
    <>
        <MovieHeader/>
        <div
            className={`mx-auto !p-[20px] !my-[20px] w-[1000px] max-[1000px]:w-[90%] rouneded-[10px] ${bg} [&_*]:${bg}`}
        >
            <img 
                src={bolonaze_image}
                className={`w-[150px] h-[150px] rounded-[50%] object-cover`}
            />
            <p>{my_movies.name}</p>
            <p>평가 영화 수 : {my_movies.voted_movies.length}</p>
            <p>선호 장르 : {my_movies.genres}</p>
        </div>
        <div className={`mx-auto !my-[20px] !p-[10px] w-[1000px] max-[1000px]:w-[90%] flex justify-start gap-[10px] !border-b-[2px] !border-zinc-700`}>
            <button 
                className={`${(show===`voted_movies`)?`border-b-[3px]`:`border-0`} border-red-700`}
                onClick={e=>handlerVotedMovies(e)}
            >
                평가한 영화
            </button>
            <button 
                className={`${(show===`wished_movies`)?`border-b-[3px]`:`border-0`} border-red-700`}
                onClick={e=>handlerWishedMovies(e)}
            >
                보고싶은 영화
            </button>
        </div>
        <MovieTable/>
        <MovieDetail/>
    </>
    )
}
