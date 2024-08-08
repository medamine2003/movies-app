import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchMovies} from '../redux/moviesSlice';
import MovieCard from "./MovieCard";
import Pagination from './Pagination'
import CategoryFilter from './CategoryFilter'
const MovieList = () => {
    const dispatch = useDispatch();
    const { filteredMovies, currentPage, itemsPerPage } = useSelector(state => state.movies);
    
    useEffect(() => {
      dispatch(fetchMovies());
    }, [dispatch]);
  
    const indexOfLastMovie = currentPage * itemsPerPage;
    const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie); 
    return (
        <div className="movie-list-container">
          <CategoryFilter />
          <div className="movie-list">
            {currentMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination />
        </div>
      );
    };
    
    export default MovieList;