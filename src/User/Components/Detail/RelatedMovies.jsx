import React from 'react';
import nowShowingMovies from '../../Data/nowShowingMovies';
import { Link } from 'react-router-dom';

function RelatedMovies() {
    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    Phim tương tự
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {nowShowingMovies.slice(0, 6).map((relatedMovie, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg overflow-hidden"
                        >
                            <Link
                                to={`/detail/${relatedMovie.id}`}
                                className="block"
                            >
                                <div className="aspect-[2/3] relative">
                                    <img
                                        src={relatedMovie.posterUrl}
                                        alt={relatedMovie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                                        {relatedMovie.rating}
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-white line-clamp-1">
                                        {relatedMovie.title}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RelatedMovies;
