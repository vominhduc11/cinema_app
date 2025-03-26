import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import Movie_showtimes from '../Components/Home/Movie_showtimes';
import Now_showing_movies from '../Components/Home/Now_showing_movies';
import Film_projection_schedule from '../Components/Home/Film_projection_schedule';
import TrailerModal from '../Modals/TrailerModal';

const Home = () => {
    const [trailerModalOpen, setTrailerModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Open trailer modal
    const openTrailerModal = (movie) => {
        setSelectedMovie(movie);
        setTrailerModalOpen(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Now Showing Movies Section */}
            <Now_showing_movies openTrailerModal={openTrailerModal} />

            {/* Coming Soon Movies Section */}
            <Movie_showtimes openTrailerModal={openTrailerModal} />

            {/* Movie Showtimes Section */}
            <Film_projection_schedule />

            {/* Trailer Modal */}
            <TrailerModal
                trailerModalOpen={trailerModalOpen}
                setTrailerModalOpen={setTrailerModalOpen}
                selectedMovie={selectedMovie}
            />
        </div>
    );
};

export default Home;
