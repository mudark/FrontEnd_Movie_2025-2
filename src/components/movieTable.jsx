import MoiveCard from './movieCard.jsx';
import {useMyMoviesContext} from '../hooks/useMyMoviesContext.jsx'

export default function MovieTable() {
    const my_movies=useMyMoviesContext();
    console.log("MovieTable movies:", my_movies.movies);
    return (
    <div className='w-[920px] max-[1000px]:!w-[90%] mx-auto max-[1000px]:mx-[5%] flex flex-wrap gap-[64px] max-[1000px]:gap-[36px] justify-center items-center'> 
        {my_movies.movies.map((movie) => (
            <MoiveCard 
                movie={movie} 
                key={movie.id} 
                setMovieId={my_movies.setMovieId}
            />
        ))}
        <button
            onClick={e=>my_movies.setPage(my_movies.page+1)}
            className={`${my_movies.show_more ? 'block' : 'hidden'} w-full h-[60px] bg-red-500 rounded-[8px]`}
        >
            더보기
        </button>
    </div>
    );
}
