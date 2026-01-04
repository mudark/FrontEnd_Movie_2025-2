import {create} from 'zustand';

const useModal = create(set=>({
    movie_detail_id: null,
    setMovieDetailId: (movie_id)=>set({movie_detail_id: movie_id}),
}))
export default useModal;