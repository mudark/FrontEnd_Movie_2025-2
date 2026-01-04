import React,{useEffect, useState} from "react";
import useUser from "../store/user.jsx";
import MovieHeader from "../components/movieHeader.jsx";
import MovieTable from "../components/movieTable.jsx";
import MovieDetail from "../components/movieDetail.jsx";
import bolonaze_image from "../assets/bolonaze.jpg";

export default function MyPage() {
    const user=useUser();
    const [movies,setMovies] = useState([]);
    const [show,setShow] = useState(`voted_movies`);
    const handlerVotedMovies=(e)=>{
        e.preventDefault();
        setShow(`voted_movies`);
        setMovies(user.voted_movies);
    };
    const handlerWishedMovies=(e)=>{
        e.preventDefault();
        setShow(`wished_movies`);
        setMovies(user.wished_movies);
    };
    useEffect(()=>{
        setMovies(user.voted_movies);
    },[]);
    console.log("MyPage movies:", movies);
    const bg=`!bg-zinc-800`;
    return (
    <>
        <MovieHeader/>
        <div
            className={`mx-auto !p-[20px] !my-[20px] w-[1000px] max-[1000px]:w-[90%] rouneded-[10px] ${bg} [&_*]:bg-transparent [&_*]:!m-[10px] !text-[32px] max-[1000px]:!text-[20px] !font-[600] rounded-[10px]`}
        >
            <img 
                src={bolonaze_image}
                className={`w-[150px] h-[150px] rounded-[50%] object-cover`}
            />
            <p>{user.name}</p>
            <p>평가 영화 수 : <b className={`text-red-500`}>{user.voted_movies.length}</b></p>
            <p>선호 장르 : {user.genres.join(',')}</p>
        </div>
        <div className={`mx-auto !my-[20px] w-[1000px] max-[1000px]:w-[90%] flex justify-start gap-[10px] !border-b-[2px] !border-zinc-700 !text-[24px] max-[1000px]:!text-[16px]`}>
            <button 
                className={`${(show===`voted_movies`)?`border-b-[3px]`:`border-0`} border-red-700 pb-[10px]`}
                onClick={e=>handlerVotedMovies(e)}
            >
                평가한 영화
            </button>
            <button 
                className={`${(show===`wished_movies`)?`border-b-[3px]`:`border-0`} border-red-700 pb-[10px]`}
                onClick={e=>handlerWishedMovies(e)}
            >
                보고싶은 영화
            </button>
        </div>
        <MovieTable
            movies={movies}
            page={1}
            setPage={()=>1}
            show_more={false}
        />
    </>
    )
}
