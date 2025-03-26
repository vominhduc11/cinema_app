import React from 'react';
import { FaClock } from 'react-icons/fa';
import { MdTheaters } from 'react-icons/md';

function Showtime({
    selectedDate,
    setSelectedDate,
    setCurrentCinema,
    setCurrentTime,
    setSeatModalOpen,
    dates
}) {
    // Example cinema locations
    const cinemas = [
        {
            id: 'cgv-vincom',
            name: 'CGV Vincom Center',
            showtimes: ['10:30', '13:15', '16:00', '18:45', '21:30']
        },
        {
            id: 'lotte-nam-sai-gon',
            name: 'Lotte Cinema Nam Sài Gòn',
            showtimes: ['09:45', '12:30', '15:15', '18:00', '20:45']
        },
        {
            id: 'galaxy-nguyen-du',
            name: 'Galaxy Cinema Nguyễn Du',
            showtimes: ['11:00', '14:00', '17:00', '19:30', '22:00']
        },
        {
            id: 'bhd-pham-hung',
            name: 'BHD Star Phạm Hùng',
            showtimes: ['10:00', '12:45', '15:30', '18:15', '21:00']
        }
    ];

    const formatDate = (date) => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return {
            day: date.getDate(),
            weekday: days[date.getDay()],
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    };

    // Handle buy ticket
    const handleBuyTicket = (cinema, time) => {
        setCurrentCinema(cinema);
        setCurrentTime(time);
        setSeatModalOpen(true);
    };

    return (
        <section id="showtimes" className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    Lịch chiếu & Đặt vé
                </h2>

                {/* Date selection */}
                <div className="mb-8">
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {dates.map((date, index) => {
                            const formattedDate = formatDate(date);
                            return (
                                <button
                                    key={index}
                                    className={`flex flex-col items-center p-4 min-w-24 rounded-lg transition-colors 
              ${
                  selectedDate === index
                      ? 'bg-yellow-500 text-gray-900'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
                                    onClick={() => setSelectedDate(index)}
                                >
                                    <span className="text-sm font-medium">
                                        {formattedDate.weekday}
                                    </span>
                                    <span className="text-xl font-bold">
                                        {formattedDate.day}
                                    </span>
                                    <span className="text-sm">
                                        {formattedDate.month}/
                                        {formattedDate.year}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cinema and showtimes */}
                <div className="space-y-6">
                    {cinemas.map((cinema) => (
                        <div
                            key={cinema.id}
                            className="bg-gray-800 rounded-lg overflow-hidden"
                        >
                            <div className="p-4 bg-gray-700 flex items-center">
                                <MdTheaters className="text-2xl text-yellow-500 mr-3" />
                                <h3 className="text-lg font-medium text-white">
                                    {cinema.name}
                                </h3>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-wrap gap-3">
                                    {cinema.showtimes.map((time, index) => (
                                        <button
                                            key={index}
                                            className="bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center"
                                            onClick={() =>
                                                handleBuyTicket(cinema, time)
                                            }
                                        >
                                            <FaClock className="mr-2" /> {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Showtime;
