import React from 'react';
import useModal from '../store/modal';
import star_image from "../assets/star.svg";

export default function MovieCard(props) {
    const {movie_detail_id,setMovieDetailId}=useModal();
    const movie = props.movie;
    const handlerMovieDetail=(e)=>{
        e.preventDefault();
        console.log("movie_id: ", movie.id);
        setMovieDetailId(movie.id);
    };
    //console.log("movieCard movie:", movie);
    return (
        <button
            className="w-[182px] h-[359px] max-[440px]:w-[140px] max-[440px]:h-[284px] text-left [&_*]:text-[18px] max-[440px]:[&_*]:text-[16px] m-[30px]"
            onClick={(e) => handlerMovieDetail(e)}
        >
            <img
                className="w-full h-[273px] max-[440px]:h-[220px] rounded-[8px]"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
            <p className="h-[54px] max-[440px]:h-[48px] flex items-center text-left">
                {movie.title}
            </p>
            <div className="flex w-fit gap-[2px] max-[440px]:justify-end">
                <span>{`${movie.vote_average?.toFixed(1)||0} `}</span>    
                <img src={star_image} className="inline w-[20px] h-[20px] translate-y-[-2px]"/>
            </div>
        </button>
    );
}
