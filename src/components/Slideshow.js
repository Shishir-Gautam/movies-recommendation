import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css'; // Ensure you have CSS for the slideshow
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons

const Slideshow = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [movies.length]);

    if (!movies.length) return null; // Return null if no movies

    return (
        <div className="slideshow">
            <div className="slideshow-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {movies.map(movie => (
                    <div className="slide" key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                        <div className="slide-info">
                            <div className="slide-title">{movie.title}</div>
                            <div className="slide-rating">
                                <FaStar className="star" />
                                {movie.vote_average}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="navigation">
                <button className="prev" onClick={() => setCurrentIndex((currentIndex - 1 + movies.length) % movies.length)}>
                    &#10094; {/* Left arrow */}
                </button>
                <button className="next" onClick={() => setCurrentIndex((currentIndex + 1) % movies.length)}>
                    &#10095; {/* Right arrow */}
                </button>
            </div>
        </div>
    );
};

export default Slideshow;
