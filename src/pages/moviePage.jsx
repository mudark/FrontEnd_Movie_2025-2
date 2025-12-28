import React,{useState,useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useMyMoviesContext} from '../hooks/useMyMoviesContext.jsx';
import fetchMovies from '../apis/fetchMovies.jsx';
import MovieTable from '../components/movieTable.jsx';
import MovieDetail from '../components/movieDetail.jsx';
import MovieHeader from '../components/movieHeader.jsx';

export default function MoviePage() {
    const my_movies=useMyMoviesContext();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
        my_movies.setQuery(searchParams.get("query") || "");
    },[searchParams]);
    useEffect(()=> {
        const fetchMovies2 = async () => {
            const fetched_movies = await fetchMovies(
                my_movies.query||"", 
                my_movies.page||1,
            );
            console.log("fetched_movies:", fetched_movies);
            if (fetched_movies.length === 20) {
                my_movies.setShowMore(true);
            } else {
                my_movies.setShowMore(false);
            }
            let combined_movies = (my_movies.page === 1)
                ? fetched_movies
                : [...my_movies.movies, ...fetched_movies];
            my_movies.setMovies(combined_movies);
        }
        fetchMovies2();
    },[my_movies.query,my_movies.page]);
    return (
    <>
        <MovieHeader/>
        <MovieTable/>
        <MovieDetail/>
    </>
    );
}
