import React, { useEffect, useState } from 'react';
import {
    fetchPopularMovies,
    fetchGenres,
    fetchMoviesByGenre,
    fetchMoviesBySearch,
    fetchTopRatedMovies,
    fetchUpcomingMovies
} from './services/apiService';
import MovieList from './components/MovieList';
import GenreFilter from './components/GenreFilter';
import Slideshow from './components/Slideshow';
import Spin from './components/Spin'; // Import the Spin component
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router components
import './styles/App.css';

const App = () => {
    const [movies, setMovies] = useState([]); // For slideshow
    const [genres, setGenres] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); // Movies for list filtered by genre
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [recommendedMovie, setRecommendedMovie] = useState(null); // State for the recommended movie

    // Fetch all movies and genres
    const fetchMoviesAndGenres = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const [popularMoviesRes, genresRes, topRatedMoviesRes, upcomingMoviesRes] = await Promise.all([
                fetchPopularMovies(),
                fetchGenres(),
                fetchTopRatedMovies(),
                fetchUpcomingMovies(),
            ]);

            setMovies(popularMoviesRes.data.results); // Slideshow
            setPopularMovies(popularMoviesRes.data.results); // Popular movies
            setTopRatedMovies(topRatedMoviesRes.data.results); // Top-rated movies
            setUpcomingMovies(upcomingMoviesRes.data.results); // Upcoming movies
            setGenres(genresRes.data.genres); // Genres
            setFilteredMovies(popularMoviesRes.data.results); // Initialize filtered movies
        } catch (err) {
            console.error("Error fetching data:", err);
            setError('Failed to fetch movies and genres.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoviesAndGenres();
    }, []);

    const handleGenreChange = async (genreId) => {
        setSelectedGenre(genres.find(genre => genre.id === genreId)?.name || "");
        setLoading(true);
        setError(null); // Reset error state
        try {
            let response;
            if (genreId) {
                response = await fetchMoviesByGenre(genreId);
                setFilteredMovies(response.data.results); // Update filtered movies based on genre
            } else {
                response = await fetchPopularMovies();
                setFilteredMovies(response.data.results); // Reset to all popular movies if "All Genres" is selected
            }
            setMovies(response.data.results); // Update movies for slideshow
        } catch (error) {
            console.error('Error fetching movies:', error);
            setError('Failed to fetch movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === "") return;
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetchMoviesBySearch(searchTerm);
            setFilteredMovies(response.data.results); // Update filtered movies based on search
            setMovies(response.data.results); // Update movies for slideshow as well
            setSelectedGenre("");
        } catch (error) {
            console.error('Error searching movies:', error);
            setError('Failed to search movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleSpin = (movie) => {
        setRecommendedMovie(movie); // Update the recommended movie state
    };

    if (loading) {
        return <div className="loading-indicator">Loading movies...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <Router>
            <div className="app">
                <header className="header">
                    <h1>
                        <a href="/" style={{ textDecoration: 'none', color: '#333' }}>Movie Recommendations</a>
                    </h1>
                    <div className="genre-filter">
                        <GenreFilter genres={genres} onGenreChange={handleGenreChange} />
                        {selectedGenre && <h2>Showing movies for genre: {selectedGenre}</h2>}
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </header>
                <main className="main-content">
                    <div className="movie-recommendations">
                        <Slideshow movies={movies} />
                        <Spin movies={filteredMovies} onSpin={handleSpin} /> {/* Pass filteredMovies to Spin */}
                        {recommendedMovie && (
                            <div className="recommended-movie">
                                <h2>Recommended Movie: {recommendedMovie.title}</h2>
                                <img src={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`} alt={recommendedMovie.title} />
                                <p>Rating: {recommendedMovie.vote_average}</p>
                                <p>{recommendedMovie.overview}</p>
                            </div>
                        )}
                        <section className="section popular-section">
                            <h2>Popular Movies</h2>
                            <MovieList movies={filteredMovies} /> {/* Updated to use filtered movies */}
                        </section>
                        <section className="section top-rated-section">
                            <h2>Top Rated Movies</h2>
                            <MovieList movies={topRatedMovies} />
                        </section>
                        <section className="section upcoming-section">
                            <h2>New Release Movies</h2>
                            <MovieList movies={upcomingMovies} />
                        </section>
                    </div>
                </main>
            </div>
        </Router>
    );
};

export default App;
