import React from 'react';
import star_image from "../assets/star.svg";

export default function MovieCard(props) {
    const movie = props.movie;
    const handlerMovieDetail=(e)=>{
        e.preventDefault();
        console.log("movie_id: ", movie.id);
        props.setMovieId(movie.id);
    };
    //console.log("movieCard movie:", movie);
    return (
        <button
            className="w-[182px] h-[359px] max-[440px]:w-[140px] max-[440px]:h-[284px] text-left"
            onClick={(e) => handlerMovieDetail(e)}
        >
            <img
                className="w-full h-[273px] max-[440px]:h-[220px] rounded-[8px]"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
            <p className="text-left !p-[10px]">
                {movie.title}
            </p>
            <span>{`${movie.vote_average?.toFixed(1)||0} `}</span>
            <img src={star_image} className="inline"/>
        </button>
    );
}
