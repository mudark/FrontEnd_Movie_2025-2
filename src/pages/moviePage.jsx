import React,{useState,useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import fetchMovies from '../apis/fetchMovies.jsx';
import MovieTable from '../components/movieTable.jsx';
import MovieDetail from '../components/movieDetail.jsx';
import MovieHeader from '../components/movieHeader.jsx';

export default function MoviePage() {
    const [query,setQuery]=useState("");
    const [page,setPage]=useState(1);
    const [movies,setMovies]=useState([]);
    const [show_more,setShowMore]=useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
        setQuery(searchParams.get("query") || "");
    },[searchParams]);
    useEffect(()=> {
        const fetchMovies2 = async () => {
            const fetched_movies = await fetchMovies(query||"", page);
            console.log("fetched_movies:", fetched_movies);
            setShowMore(fetched_movies.length === 20);
            let combined_movies = (page === 1)
                ? fetched_movies:[...movies, ...fetched_movies];
            setMovies(combined_movies);
        }
        fetchMovies2();
    },[query, page]);
    return (
    <>
        <MovieHeader/>
        <p className={`!text-[36px] !font-[600] !text-left w-[1000px] max-[1000px]:!w-full !p-[30px]`}>
            {(query==="")?`지금 인기있는 영화`:`"${query}" 검색 결과`}
        </p>
        <MovieTable
            movies={movies}
            page={page}
            setPage={setPage}
            show_more={show_more}
        />
    </>
    );
}
