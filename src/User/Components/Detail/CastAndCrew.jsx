import React from 'react';

function CastAndCrew() {
    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    Diễn viên & Đoàn làm phim
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg overflow-hidden"
                        >
                            <div className="aspect-[3/4] bg-gray-700">
                                <img
                                    src={`https://placehold.co/300x400/gray/white?text=Actor+${index + 1}`}
                                    alt={`Actor ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-medium text-white">
                                    Diễn viên {index + 1}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Vai: Nhân vật {index + 1}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CastAndCrew;
