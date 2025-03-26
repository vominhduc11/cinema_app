import React, { useState } from 'react';

function Film_projection_schedule() {
    // const [selectedCity, setSelectedCity] = useState('Hồ Chí Minh');
    const [selectedCinema, setSelectedCinema] = useState(
        'CGV Liberty Citypoint'
    );
    const [selectedDate, setSelectedDate] = useState('18');

    // Cinema chain data
    const cinemaChains = [
        { id: 'all', name: 'Tất cả', logo: '/path-to-star-logo.png' },
        { id: 'cgv', name: 'CGV', logo: '/path-to-cgv-logo.png' },
        {
            id: 'lotte',
            name: 'Lotte Cinema',
            logo: '/path-to-lotte-logo.png',
            hasPromo: true
        },
        {
            id: 'galaxy',
            name: 'Galaxy Cinema',
            logo: '/path-to-galaxy-logo.png'
        },
        {
            id: 'bhd',
            name: 'BHD Star',
            logo: '/path-to-bhd-logo.png',
            hasPromo: true
        },
        { id: 'beta', name: 'Beta Cineplex', logo: '/path-to-beta-logo.png' },
        {
            id: 'cinestar',
            name: 'Cinestar',
            logo: '/path-to-cinestar-logo.png'
        },
        { id: 'mega', name: 'Mega GS', logo: '/path-to-mega-logo.png' },
        { id: 'cinemax', name: 'Cinemax', logo: '/path-to-cinemax-logo.png' },
        { id: 'dcine', name: 'DCINE', logo: '/path-to-dcine-logo.png' }
    ];

    // Cinema locations data
    const cinemaLocations = [
        { id: 'liberty', name: 'CGV Liberty Citypoint', chain: 'cgv' },
        { id: 'pearl', name: 'CGV Pearl Plaza', chain: 'cgv' },
        {
            id: 'vincom-mega',
            name: 'CGV Vincom Mega Mall Grand Park',
            chain: 'cgv'
        },
        { id: 'giga', name: 'CGV Giga Mall Thủ Đức', chain: 'cgv' },
        { id: 'vincom-thu-duc', name: 'CGV Vincom Thủ Đức', chain: 'cgv' },
        { id: 'aeon', name: 'CGV Aeon Bình Tân', chain: 'cgv' },
        { id: 'su-van', name: 'CGV Sư Vạn Hạnh', chain: 'cgv' }
    ];

    // Date data
    const dates = [
        { day: '18', weekday: 'Hôm nay', fullDate: 'Thứ 4' },
        { day: '19', weekday: 'Thứ 4', fullDate: 'Thứ 5' },
        { day: '20', weekday: 'Thứ 5', fullDate: 'Thứ 5' },
        { day: '21', weekday: 'Thứ 6', fullDate: 'Thứ 6' },
        { day: '22', weekday: 'Thứ 7', fullDate: 'Thứ 7' },
        { day: '23', weekday: 'Chủ nhật', fullDate: 'CN' },
        { day: '24', weekday: 'Thứ 2', fullDate: 'Thứ 2' }
    ];

    // Movies data
    const movies = [
        {
            id: 1,
            title: 'Nhà Giả Tiền',
            subTitle: 'Hài, Gia Đình, Tâm Lính',
            format: '2D Phụ đề',
            posterUrl: '/path-to-nha-gia-tien-poster.jpg',
            showTimes: [
                { time: '13:00 - 14:57', start: '13:00', end: '14:57' },
                { time: '15:20 - 17:17', start: '15:20', end: '17:17' },
                { time: '17:40 - 19:37', start: '17:40', end: '19:37' }
            ],
            ageRating: '18+',
            genre: 'Hài, Gia Đình, Tâm Lính'
        },
        {
            id: 2,
            title: 'Quỷ Nhập Tràng',
            subTitle: 'Kinh Dị',
            format: '2D Phụ đề',
            posterUrl: '/path-to-quy-nhap-trang-poster.jpg',
            showTimes: [
                { time: '10:40 - 12:42', start: '10:40', end: '12:42' },
                { time: '12:15 - 14:17', start: '12:15', end: '14:17' },
                { time: '13:05 - 15:07', start: '13:05', end: '15:07' },
                { time: '14:45 - 16:47', start: '14:45', end: '16:47' },
                { time: '15:30 - 17:32', start: '15:30', end: '17:32' },
                { time: '18:00 - 20:02', start: '18:00', end: '20:02' },
                { time: '20:30 - 22:32', start: '20:30', end: '22:32' },
                { time: '23:00 - 01:02', start: '23:00', end: '01:02' }
            ],
            ageRating: '18+',
            genre: 'Kinh Dị'
        }
    ];

    return (
        <div id="ticket-section" className="bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold text-center text-pink-500 py-6">
                    Lịch chiếu phim
                </h1>

                {/* Main Content Container */}
                <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                    {/* Left Column - Cinema Selection */}
                    <div className="md:w-5/12 p-4">
                        {/* Location Filters */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-600">Vị trí:</span>
                                <div className="relative">
                                    <button className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-1 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            ></path>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            ></path>
                                        </svg>
                                        {/* {selectedCity} */}
                                        Hồ Chí Minh
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <button className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                    Gần bạn
                                </button>
                            </div>

                            {/* Cinema Chains */}
                            <div className="flex flex-wrap gap-2 mt-4 justify-between">
                                {cinemaChains.map((chain) => (
                                    <div
                                        key={chain.id}
                                        className="text-center mb-2 w-16"
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center overflow-hidden border border-gray-200">
                                                {chain.id === 'all' ? (
                                                    <div className="bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-full">
                                                        <span className="text-white text-lg">
                                                            ★
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold">
                                                        {chain.name.substring(
                                                            0,
                                                            3
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            {chain.hasPromo && (
                                                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 transform rotate-12 shadow">
                                                    KM
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xs mt-1 truncate">
                                            {chain.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="relative mt-4">
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên rạp ..."
                                    className="w-full p-2 pl-10 border border-gray-300 rounded"
                                />
                                <span className="absolute left-3 top-2.5 text-gray-400">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                </span>
                            </div>

                            {/* Cinema List */}
                            <div className="mt-2">
                                {cinemaLocations.map((cinema) => (
                                    <div
                                        key={cinema.id}
                                        className={`p-3 border-b border-gray-200 flex justify-between items-center cursor-pointer ${selectedCinema === cinema.name ? 'bg-gray-100' : ''}`}
                                        onClick={() =>
                                            setSelectedCinema(cinema.name)
                                        }
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center mr-2 text-xs">
                                                <span className="text-white font-bold">
                                                    CGV
                                                </span>
                                            </div>
                                            <span>{cinema.name}</span>
                                        </div>
                                        <span className="text-gray-400">❯</span>
                                    </div>
                                ))}

                                <div className="text-center mt-4">
                                    <button className="bg-white text-pink-500 border border-pink-500 rounded-full px-4 py-1 text-sm">
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Movie Showtimes */}
                    <div className="md:w-7/12 p-4">
                        {/* Cinema Info */}
                        <div className="mb-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded mr-2">
                                    <span className="text-white text-xs font-bold">
                                        CGV
                                    </span>
                                </div>
                                <h2 className="text-base font-medium">
                                    Lịch chiếu phim CGV Liberty Citypoint
                                </h2>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                Tầng M, 1 | Khách sạn Liberty Center Saigon
                                Citypoint, 59 - 61 đường Pasteur, quận 1,
                                thành...{' '}
                                <span className="text-blue-500">[Bản đồ]</span>
                            </p>
                        </div>

                        {/* Date Selection */}
                        <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
                            {dates.map((date) => (
                                <div
                                    key={date.day}
                                    className={`flex flex-col items-center min-w-12 cursor-pointer ${selectedDate === date.day ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700'} rounded-md p-2`}
                                    onClick={() => setSelectedDate(date.day)}
                                >
                                    <span className="text-lg font-bold">
                                        {date.day}
                                    </span>
                                    <span className="text-xs">
                                        {date.weekday}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Movies Showtimes */}
                        <div className="space-y-6">
                            {movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="border-t border-gray-200 pt-4"
                                >
                                    <div className="flex">
                                        {/* Movie Poster */}
                                        <div className="w-24 h-36 bg-gray-200 rounded overflow-hidden mr-4 relative">
                                            {/* Placeholder for movie poster */}
                                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5">
                                                {movie.ageRating}
                                            </div>
                                        </div>

                                        {/* Movie Info and Showtimes */}
                                        <div className="flex-1">
                                            <div className="flex items-start mb-1">
                                                <h3 className="font-medium">
                                                    {movie.title}
                                                </h3>
                                            </div>
                                            <p className="text-xs text-gray-600 mb-2">
                                                {movie.genre}
                                            </p>
                                            <p className="text-xs mb-3">
                                                {movie.format}
                                            </p>

                                            {/* Showtimes Buttons */}
                                            <div className="flex flex-wrap gap-2">
                                                {movie.showTimes.map(
                                                    (time, idx) => (
                                                        <button
                                                            key={idx}
                                                            className="border border-blue-500 text-blue-500 rounded px-3 py-1 text-sm hover:bg-blue-50"
                                                        >
                                                            {time.start} ~{' '}
                                                            {time.end}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View All Button */}
                        <div className="text-center mt-6">
                            <button className="bg-pink-500 text-white rounded-full px-6 py-2 font-medium">
                                Xem tất cả
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Film_projection_schedule;
