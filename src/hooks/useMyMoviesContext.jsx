import React,{createContext,useContext,useState} from 'react';

export function getMoviesInStorage(key) {
    const json=sessionStorage.getItem(key);
    return JSON.parse(json);
}
export function saveMoviesInStorage(key,data) {
    const json=JSON.stringify(data);
    sessionStorage.setItem(key,json);
}
export const MyMoviesContext = createContext(null);
export const MyMoviesProvider = ({children})=>{
    const stored_voted_movies=getMoviesInStorage('voted_movies');
    const stored_wished_movies=getMoviesInStorage('wished_movies');
    const [voted_movies, setVotedMovies]=useState(stored_voted_movies||[]);
    const [wished_movies, setWishedMovies]=useState(stored_wished_movies||[]);
    const [query,setQuery]=useState("");
    const [page,setPage]=useState(1);
    const [movies,setMovies]=useState([]);
    const [show_more,setShowMore]=useState(false);
    const [movie_id,setMovieId]=useState(null);
    const [name,setName]=useState("");
    const [id,setId]=useState("");
    const [genres,setGenres]=useState("");
    const myMovies={
        voted_movies: voted_movies,
        setVotedMovies: setVotedMovies,
        wished_movies: wished_movies,
        setWishedMovies: setWishedMovies,
        query: query,
        setQuery: setQuery,
        page: page,
        setPage: setPage,
        movies: movies,
        setMovies: setMovies,
        show_more: show_more,
        setShowMore: setShowMore,
        movie_id: movie_id,
        setMovieId: setMovieId,
        name: name,
        setName: setName,
        id: id,
        setId: setId,
        genres: genres,
        setGenres: setGenres,
    };
    return (
        <MyMoviesContext.Provider value={myMovies}>
            {children}
        </MyMoviesContext.Provider>
    )
}
export function useMyMoviesContext() {
    return useContext(MyMoviesContext);
}
