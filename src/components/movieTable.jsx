import MoiveCard from './movieCard.jsx';

export default function MovieTable(props) {
    console.log("MovieTable movies:", props.movies);
    return (<div className='w-[1000px] max-[1000px]:!w-full mx-auto max-[1000px]:mx-0 flex flex-wrap justify-between items-center'> 
            {props.movies.map((movie) => (
                <MoiveCard 
                    movie={movie} 
                    key={movie.id}
                />
            ))}
            <button
                onClick={e=>props.setPage(props.page+1)}
                className={`${props.show_more ? 'block' : 'hidden'} w-full h-[60px] bg-red-500 rounded-[8px] m-[30px]`}
            >
                더보기
            </button>
        </div>
    );
}
