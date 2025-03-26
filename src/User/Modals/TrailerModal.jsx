import React, { useEffect } from 'react';
import Modal from 'react-modal';

function TrailerModal({
    trailerModalOpen,
    setTrailerModalOpen,
    selectedMovie
}) {
    // Set app element for accessibility
    useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    const customStyles = {
        content: {
            transform: trailerModalOpen
                ? 'translateY(0) scale(1)'
                : 'translateY(-50px) scale(0.9)',
            opacity: trailerModalOpen ? 1 : 0,
            transition: 'all 300ms ease-in-out'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            transition: 'all 300ms ease-in-out',
            opacity: trailerModalOpen ? 1 : 0
        }
    };

    return (
        <Modal
            isOpen={trailerModalOpen}
            onRequestClose={() => setTrailerModalOpen(false)}
            contentLabel="Movie Trailer"
            className="max-w-4xl w-full mx-auto mt-20 bg-black rounded-lg overflow-hidden outline-none shadow-2xl"
            overlayClassName="fixed inset-0 z-50 flex justify-center items-start backdrop-blur-sm"
            closeTimeoutMS={300}
            style={customStyles}
        >
            <div className="relative">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black to-transparent h-16 z-10 px-4 py-3 flex justify-between items-center">
                    <div className="text-white font-bold truncate pr-8">
                        {selectedMovie && (
                            <>
                                <span className="text-red-500">▶</span>{' '}
                                {selectedMovie.title} - Official Trailer
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => setTrailerModalOpen(false)}
                        className="absolute top-3 right-3 z-10 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                        aria-label="Close trailer"
                    >
                        ✕
                    </button>
                </div>

                {selectedMovie ? (
                    <>
                        <div className="aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={selectedMovie.trailer}
                                title={`${selectedMovie.title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="bg-black bg-opacity-90 text-white p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xl font-bold">
                                    {selectedMovie.title}
                                </h3>
                                <div className="flex space-x-2">
                                    <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded transition-colors duration-300 flex items-center">
                                        <span className="mr-1">♥</span> Add to
                                        favorites
                                    </button>
                                </div>
                            </div>
                            {selectedMovie.description && (
                                <p className="text-gray-300 text-sm">
                                    {selectedMovie.description}
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                        <div className="animate-spin h-10 w-10 border-4 border-red-600 rounded-full border-t-transparent"></div>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default TrailerModal;
