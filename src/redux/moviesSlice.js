import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movies$ } from '../movies';  

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await movies$;
  return response;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
      items: [],
      filteredMovies: [],
      currentPage: 1,
      itemsPerPage: 4,
      categories: [],
      selectedCategory: '',  
      loading: false,
    },
    reducers: {
      setMovies: (state, action) => {
        const movies = action.payload;
        state.items = movies;
        state.filteredMovies = movies;
  
        const uniqueCategories = [...new Set(movies.map(movie => movie.category))];
        state.categories = uniqueCategories;
      },
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload;
      },
      setItemsPerPage: (state, action) => {
        state.itemsPerPage = action.payload;
      },
      filterByCategory: (state, action) => {
        const category = action.payload;
        state.selectedCategory = category;
        state.filteredMovies = category ? state.items.filter(movie => movie.category === category) : state.items;
      },
      toggleLike: (state, action) => {
        const movieId = action.payload;
        const movie = state.items.find(movie => movie.id === movieId);
        if (movie) {
          if (movie.liked) {
            movie.likes -= 1;
          } else {
            movie.likes += 1;
          }
          movie.liked = !movie.liked;
          state.filteredMovies = [...state.items];
        }
      },
      toggleDislike: (state, action) => {
        const movieId = action.payload;
        const movie = state.items.find(movie => movie.id === movieId);
        if (movie) {
          if (movie.disliked) {
            movie.dislikes -= 1;
          } else {
            movie.dislikes += 1;
          }
          movie.disliked = !movie.disliked;
          state.filteredMovies = [...state.items];
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
          const movies = action.payload.map(movie => ({
            ...movie,
            liked: false,
            disliked: false,
          }));
          state.items = movies;
          state.filteredMovies = movies;
          const uniqueCategories = [...new Set(movies.map(movie => movie.category))];
          state.categories = uniqueCategories;
          state.loading = false;
        })
        .addCase(fetchMovies.rejected, (state) => {
          state.loading = false;
        });
    },
  });
  

export const { setMovies, setCurrentPage, setItemsPerPage, filterByCategory, toggleLike, toggleDislike } = moviesSlice.actions;
export default moviesSlice.reducer;
