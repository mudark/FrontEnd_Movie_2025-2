import React,{useState,useEffect} from 'react';
import useUser from "../store/user.jsx";
import useModal from "../store/modal.jsx";
import fetchMovieDetail from '../apis/fetchMovieDetail.jsx';
import star_image from '../assets/star.svg';
import yellow_half_star_image from '../assets/yellow_half_star.png';
import gray_half_star_image from '../assets/gray_half_star.png';
import heart_image from '../assets/heart.svg';

export default function MovieDetail(props) {
    const user=useUser();
    const movie_detail_id=useModal(state=>state.movie_detail_id);
    const setMovieDetailId=useModal(state=>state.setMovieDetailId);
    const [my_vote, setMyVote] = useState(0);
    const [movie, setMovie] = useState(null);
    const [show_haert,setShowHeart] = useState(false);
    const handlerWishMovie = (e) => {
        e.preventDefault();
        user.wishOrDeleteMovie(movie);
        setShowHeart(!show_haert);
    };
    const handlerExitDetail = (e) => {
        e.preventDefault();
        setMovieDetailId(null);
    }
    useEffect(() => {
        const fetchMovieDetail2 = async () => {
            const movieDetail = await fetchMovieDetail(movie_detail_id);
            setMovie(movieDetail);
        }
        fetchMovieDetail2();
        console.log("movie detail: ", movie);
        const voted_movie = user.voted_movies
            .find(_movie=>_movie.id===movie_detail_id);
        setMyVote(voted_movie?.my_vote||0);
        const is_wished=user.wished_movies
            .some(_movie=>_movie.id===movie_detail_id);
        setShowHeart(is_wished);
    }, [movie_detail_id]);
    useEffect(() => {
        if (movie===null) return;
        movie.my_vote=my_vote;
        user.voteMovie(movie);
    }, [my_vote]);
    const bg=`!bg-zinc-800`;
    const bg_btn=`!bg-zinc-700`;
    const vote_result=[
        `평가하세요`,
        `최악이에요`,
        `싫어요`,
        `재미없어요`,
        `별로에요`,
        `괜찮아요`,
        `보통이에요`,
        `재밌어요`,
        `좋아요`,
        `끝내줘요`,
        `최고에요`,
    ];
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
                className={`absolute top-0 left-0 w-full h-[60px] !p-[20px] text-center max-[750px]:text-left rounded-t-[10px] !border-b-2 !border-zinc-700 ${bg} !text-[24px] min-[750px]:max-[1000px]:!text-[20px] max-[750px]:!text-[18px] !font-[600]`}
            >{movie?.title}</p>
            <img 
                className={`absolute top-[100px] left-[40px] w-[360px] h-[560px] max-[1000px]:w-[260px] min-[750px]:max-[1000px]:h-[400px] max-[750px]:w-0 object-contain`} 
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            />
            <button 
                onClick={e=>handlerWishMovie(e)}
                className={`absolute top-[70px] right-[20px] min-[750px]:max-[1000px]:!right-[20px] z-10 h-[30px] w-[30px] bg-black rounded-[50%] text-center`}   
            >
                <span className={`${(show_haert)?`hidden`:`inline`}`}>♡</span>
                <img src={heart_image} className={`w-[20px] h-[20px] object-contain ${(show_haert)?`inline`:`hidden`}`}/>
            </button>
            <div
                className={`absolute top-[110px] !right-[40px] min-[750px]:max-[1000px]:!right-[20px] max-[750px]:!right-[42px] w-[520px] h-[390px] min-[750px]:max-[1000px]:w-[383px] max-[750px]:w-[326px] max-[1000px]:h-[205px] ${bg} [&_*]:!bg-transparent`}
            > 
                <span 
                    className={`!text-[20px] min-[750px]:max-[1000px]:!text-[18px] max-[750px]:!text-[16px]`}
                >{movie?.genres?.map(e=>e.name).join(', ')}</span>
                <img src={star_image} className={`inline-block h-[20px] w-[20px] !ml-[10px] translate-y-[3px]`}/>
                <span 
                    className={`!text-[20px] min-[750px]:max-[1000px]:!text-[18px] max-[750px]:!text-[16px]`}
                > {movie?.vote_average.toFixed(1)}</span>
                <p 
                    className={`!mt-[10px] !text-[20px] min-[750px]:max-[1000px]:!text-[14px] max-[750px]:!text-[12px] !leading-[1.5em]`}
                >{movie?.overview}</p>
            </div>
            <div
                className={`absolute bottom-[50px] right-[40px] min[750px]:max-[1000px]:!right-[20px] max-[750px]:right-[32px] w-[520px] h-[80px] min-[750px]:max-[1000px]:w-[373px] max-[750px]:w-[326px] max-[1000px]:h-[64px] !p-[10px] text-center rounded-[20px] ${bg_btn} [&_*]:bg-transparent flex items-center justify-start max-[750px]:justify-center`}
            >
                <span
                    className={`inline-block !mr-[10px] !text-[20px] min-[750px]:max-[1000px]:!text-[18px] max-[750px]:!text-[16px]`}
                >내 별점 </span>
                {Array(my_vote).fill(true).map((_, index) => (
                    <button
                    key={index}
                    className={`inline-block !w-[24px] !h-[48px] max-[1000px]:!w-[16px] max-[1000px]:!h-[32px] border-none p-0 m-0 ${((index)%2===0)?`scale-x-[-1] !ml-[2px]`:`scale-x-[1] !mr-[2px]`}`}
                    onClick={() => setMyVote(index + 1)}
                    >
                    <img
                        src={yellow_half_star_image}
                        className={`w-full h-full object-contain`}
                    />
                    </button>
                ))} 
                {Array(10-my_vote).fill(true).map((_, index) => (
                    <button
                        key={my_vote+index}
                        className={`inline-block !w-[24px] !h-[48px] max-[1000px]:!w-[16px] max-[1000px]:!h-[32px] border-none p-0 m-0 ${((my_vote+index)%2===0)?`scale-x-[-1] !ml-[2px]`:`scale-x-[1] !mr-[2px]`}`}
                        onClick={() => setMyVote(my_vote + index + 1)}
                    >
                    <img
                        src={gray_half_star_image}
                        className={`w-full h-full object-contain`}
                    />
                    </button>
                ))}
                <span
                    className={`inline-block !ml-[10px] !text-[20px] min-[750px]:max-[1000px]:!text-[18px] max-[750px]:!text-[16px]`}
                > {my_vote}</span>
                <span className={`inline-block !ml-[10px] !text-[18px] min-[750px]:max-[1000px]:!text-[14px] max-[750px]:!hidden`}>
                    {vote_result[my_vote]}
                </span>
            </div>
        </div>
    </div>
    );
}
