import React,{useState,useEffect} from 'react';
import {useMyMoviesContext,saveMoviesInStorage} from '../hooks/useMyMoviesContext.jsx';
import fetchMovieDetail from '../apis/fetchMovieDetail.jsx';
import star_image from '../assets/star.svg';
import yellow_half_star_image from '../assets/yellow_half_star.png';
import gray_half_star_image from '../assets/gray_half_star.png';
import heart_image from '../assets/heart.svg';

export default function MovieDetail() {
    const my_movies=useMyMoviesContext();
    const [my_vote, setMyVote] = useState(0);
    const [movie, setMovie] = useState(null);
    const handlerWishMovie = (e) => {
        e.preventDefault();
        if (my_movies.wished_movies.find(_movie=>_movie.id===movie.id)) {
            my_movies.setWishedMovies(my_movies.wished_movies.filter(_movie=>_movie.id!==movie.id));
        } else {
            my_movies.setWishedMovies([...my_movies.wished_movies, movie]);
        }
        saveMoviesInStorage('wished_movies',my_movies.wished_movies);
    };
    const handlerExitDetail = (e) => {
        e.preventDefault();
        my_movies.setMovieId(null);
    }
    useEffect(() => {
        const fetchMovieDetail2 = async () => {
            const movieDetail = await fetchMovieDetail(my_movies.movie_id);
            setMovie(movieDetail);
        }
        fetchMovieDetail2();
        console.log("movie detail: ", movie);
        const voted_movie = my_movies.voted_movies.find(_movie=>_movie.id===my_movies.movie_id);
        setMyVote(voted_movie?.my_vote||0);
    }, [my_movies.movie_id]);
    useEffect(() => {
        if (movie===null) return;
        movie.my_vote=my_vote;
        if (!my_movies.voted_movies.find(_movie=>_movie.id===movie?.id)) {
            my_movies.setVotedMovies([...my_movies.voted_movies, movie]);
            saveMoviesInStorage('voted_movies',my_movies.voted_movies);
        }
    }, [my_vote]);
    const bg=`!bg-zinc-800`;
    const bg_btn=`!bg-zinc-700`;
    return (
    <div className={`${(movie!==null)?"fixed":"hidden"} w-full h-full !pt-[10px] !bg-black/50`}>
        <div
            className={`!mx-auto relative w-[1000px] !h-[720px] max-[1000px]:!h-[544px] max-[1000px]:min-[750px]:!w-[740px] max-[750px]:w-[390px] rounded-[10px] ${bg}`}  
        >
            <button 
                onClick={e=>handlerExitDetail(e)}
                className={`absolute top-[10px] right-[10px] w-[30px] h-[30px] z-10 text-center bg-black rounded-[50%] ${bg_btn}`}
            >X</button>
            <p 
                className={`absolute top-0 left-0 w-full h-[60px] !p-[20px] text-center rounded-t-[10px] !border-b-2 !border-zinc-700 ${bg}`}
            >{movie?.title}</p>
            <img 
                className={`absolute top-[100px] left-[20px] w-[360px] h-[560px] max-[1000px]:w-[260px] min-[750px]:max-[1000px]:h-[400px] max-[750px]:w-0 object-contain`} 
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            />
            <button 
                onClick={e=>handlerWishMovie(e)}
                className={`absolute top-[100px] right-[20px] z-10 h-[30px] w-[30px] bg-black rounded-[50%] text-center`}   
            >
                <img src={heart_image} className={`w-[20px] h-[20px] object-contain inline`}/>
            </button>
            <div
                className={`absolute top-[110px] right-[20px] max-[1000px]:right-[0px] w-[520px] h-[390px] max-[1000px]:w-[383px] max-[1000px]:h-[205px] ${bg}`}
            >
                <span className={`${bg}`}>{movie?.genres?.map(e=>e.name).join(', ')}</span>
                <img src={star_image} className={`inline ${bg}`}/>
                <span className={`${bg}`}>{movie?.vote_average}</span>
                <p className={`${bg}`}>{movie?.overview}</p>
            </div>
            <div
                className={`absolute bottom-[50px] right-[20px] max-[1000px]:right-[10px] w-[520px] h-[80px] max-[1000px]:w-[373px] max-[1000px]:h-[64px] !p-[20px] text-center rounded-[20px] ${bg_btn}`}
            >
                <span className={`${bg_btn}`}>내 별점 </span>
                {Array(my_vote).fill(true).map((_, index) => (
                    <button
                    key={index}
                    className="w-[10px] h-5 border-none p-0 m-0 bg-[#383838]"
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
                        className={`w-[10px] h-5 border-none p-0 m-0 ${bg_btn}`}
                        onClick={() => setMyVote(my_vote + index + 1)}
                    >
                    <img
                        src={gray_half_star_image}
                        className={`w-[10px] h-5 object-contain ${bg_btn}`}
                        style={{transform: `scaleX(${((my_vote+index)%2===0) ? -1 : 1})`}}
                    />
                    </button>
                ))}
                <span className={`${bg_btn}`}> {my_vote}</span>
            </div>
        </div>
    </div>
    );
}
