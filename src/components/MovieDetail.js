import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/apiService'; // Ensure this function is imported

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchMovieDetails(id);
                setMovie(response.data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError('Failed to fetch movie details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return <div className="loading-indicator">Loading movie details...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="movie-detail">
            {movie && (
                <>
                    <h2>{movie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <p>{movie.overview}</p>
                    <p><strong>Rating:</strong> {movie.vote_average}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                </>
            )}
        </div>
    );
};

export default MovieDetail;
