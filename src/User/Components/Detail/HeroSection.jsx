import React from 'react';
import {
    FaPlay,
    FaTicketAlt,
    FaRegCalendarAlt,
    FaStar,
    FaRegClock
} from 'react-icons/fa';

import { MdLanguage, MdLocalMovies } from 'react-icons/md';

function HeroSection({ movie, openTrailerModal }) {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
            <div
                className="h-[70vh] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-end py-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
                        {/* Movie poster */}
                        <div className="w-64 min-w-64 rounded-lg overflow-hidden shadow-2xl transform -translate-y-16">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Movie info */}
                        <div className="text-white flex-1 pb-4">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-yellow-500 text-gray-900 font-bold rounded-md px-2 py-1 flex items-center">
                                    <FaStar className="mr-1" /> {movie.rating}
                                </span>
                                <span className="bg-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                                    2D
                                </span>
                                <span className="bg-red-600 px-2 py-1 rounded-md text-sm font-medium">
                                    P
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold mb-2">
                                {movie.title}
                            </h1>
                            <h2 className="text-xl text-gray-300 mb-4">
                                {movie.vietnameseTitle || movie.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center">
                                    <FaRegClock className="text-yellow-500 mr-2" />
                                    <span>{movie.duration || '120 phút'}</span>
                                </div>
                                <div className="flex items-center">
                                    <MdLanguage className="text-yellow-500 mr-2" />
                                    <span>
                                        {movie.language ||
                                            'Tiếng Anh với phụ đề Tiếng Việt'}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <FaRegCalendarAlt className="text-yellow-500 mr-2" />
                                    <span>
                                        {movie.releaseDate || '01/01/2023'}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MdLocalMovies className="text-yellow-500 mr-2" />
                                    <span>
                                        {movie.genre || 'Hành động, Phiêu lưu'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={openTrailerModal}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center"
                                >
                                    <FaPlay className="mr-2" /> Xem Trailer
                                </button>
                                <a
                                    href="#showtimes"
                                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors flex items-center"
                                >
                                    <FaTicketAlt className="mr-2" /> Mua Vé Ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
