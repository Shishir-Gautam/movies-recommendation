import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'https://server-fda8.onrender.com/api/movies';

// Fetch popular movies
export const fetchPopularMovies = () => axios.get(`${API_BASE_URL}/popular`);

// Fetch top-rated movies
export const fetchTopRatedMovies = () => axios.get(`${API_BASE_URL}/top-rated`);

// Fetch upcoming movies
export const fetchUpcomingMovies = () => axios.get(`${API_BASE_URL}/upcoming`);

// Fetch movie genres
export const fetchGenres = () => axios.get(`${API_BASE_URL}/genres`);

// Fetch movies by genre
export const fetchMoviesByGenre = (genreId) => axios.get(`${API_BASE_URL}/genre/${genreId}`);

// Search for movies
export const fetchMoviesBySearch = (query) => {
    return axios.get(`${API_BASE_URL}/search/${encodeURIComponent(query)}`);
};

// Fetch movie details by ID
export const fetchMovieById = (id) => axios.get(`${API_BASE_URL}/movie/${id}`);

// Fetch movie details for detailed view
export const fetchMovieDetails = (movieId) => axios.get(`${API_BASE_URL}/movie/${movieId}`);
