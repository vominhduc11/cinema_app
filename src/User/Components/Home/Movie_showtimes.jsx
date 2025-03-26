import React from 'react';
import Slider from 'react-slick';
import comingSoonMovies from '../../Data/comingSoonMovies';
import { comingSoonSettings } from '../../Settings/comingSoonSettings';
import { FaPlay } from 'react-icons/fa';

function Movie_showtimes({ openTrailerModal }) {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                    Phim sắp chiếu
                </h2>
                <div className="relative">
                    <Slider {...comingSoonSettings}>
                        {comingSoonMovies.map((movie) => (
                            <div key={movie.id} className="px-2">
                                <div className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="aspect-[2/3] relative">
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/70 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <button
                                                onClick={() =>
                                                    openTrailerModal(movie)
                                                }
                                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full transition-colors duration-300 flex items-center"
                                            >
                                                <FaPlay className="mr-2" />{' '}
                                                Trailer
                                            </button>
                                        </div>
                                        <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                                            {movie.rating}
                                        </div>
                                    </div>
                                    <div className="py-3 px-4 bg-white text-center">
                                        <h3 className="font-bold text-gray-800 line-clamp-1">
                                            {movie.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="text-center mt-8">
                    <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-6 py-2 rounded-full transition-colors duration-300">
                        Xem phim sắp chiếu
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Movie_showtimes;
