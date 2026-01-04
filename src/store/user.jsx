import {create} from 'zustand';

const useUser = create(set=>({
    id: "",
    setId: (_id)=>set({id:_id}),
    name: "",
    setName: (_name)=>set({name:_name}),
    genres: [],
    setGenres: (_genres_text)=>set({
        genres: _genres_text.split(',')
    }),
    voted_movies: [],
    voteMovie: (_movie)=>{set((state)=>({
        voted_movies: [...state.voted_movies.filter(movie=>movie.id!==_movie.id),_movie]
    }))},
    wished_movies: [],
    wishOrDeleteMovie: (_movie)=>{set((state)=>({
        wished_movies: (state.wished_movies.some(movie=>_movie.id===movie.id))
        ?state.wished_movies.filter(movie=>_movie.id!==movie.id)
        :[...state.wished_movies,_movie]
    }))},
    movie_detail: null,
    setMovieDetail: (_movie_id)=>{set(()=>{
        return null;
    })},
}));
export default useUser;