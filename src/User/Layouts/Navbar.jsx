import React, { useState, useEffect } from 'react';
import {
    FaCalendarAlt,
    FaBuilding,
    FaFilm,
    FaTicketAlt,
    FaChevronDown,
    FaMapMarkerAlt
} from 'react-icons/fa';

// Custom scrollbar and dropdown styles
const customStyles = `
  /* Custom scrollbar styles */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1F2937;
    border-radius: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #4B5563;
    border-radius: 8px;
    border: 2px solid #1F2937;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #6B7280;
  }
  
  /* Dropdown hover bridge styles */
  .dropdown-container {
    position: relative;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    transform: translateY(-10px);
  }
  
  .dropdown-container:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  /* Create an invisible bridge to prevent dropdown from closing */
  .dropdown-container::after {
    content: '';
    position: absolute;
    height: 8px;
    width: 100%;
    bottom: -8px;
    left: 0;
    z-index: 49;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease forwards;
  }
`;

const Navbar = () => {
    // State to track if navbar is sticky
    const [isSticky, setIsSticky] = useState(false);

    // Array of theaters for the dropdown
    const theaters = [
        { id: 1, name: 'CineStar Quốc Thanh', location: 'Quận 1, TP.HCM' },
        { id: 2, name: 'CineStar Hai Bà Trưng', location: 'Quận 1, TP.HCM' },
        { id: 3, name: 'CineStar Nguyễn Huệ', location: 'Quận 1, TP.HCM' },
        { id: 4, name: 'CineStar Tân Bình', location: 'Quận Tân Bình, TP.HCM' },
        { id: 5, name: 'CineStar Gò Vấp', location: 'Quận Gò Vấp, TP.HCM' },
        { id: 6, name: 'CineStar Đà Nẵng', location: 'Quận Hải Châu, Đà Nẵng' },
        { id: 7, name: 'CineStar Huế', location: 'TP. Huế' },
        { id: 8, name: 'CineStar Hà Nội', location: 'Quận Hoàn Kiếm, Hà Nội' }
    ];

    // Handle scroll event to make navbar sticky
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to ticket section with 20px offset
    const scrollToTickets = () => {
        const ticketSection = document.getElementById('ticket-section');
        console.log(ticketSection);
        if (ticketSection) {
            const yOffset = -90; // 20px offset upward
            const y =
                ticketSection.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`bg-gray-800 z-40 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 shadow-lg' : ''}`}
        >
            {/* Add style element for scrollbar and dropdown styles */}
            <style>{customStyles}</style>

            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <ul className="flex flex-wrap justify-center">
                        {/* Lịch chiếu */}
                        <li className="relative dropdown-container group">
                            <a
                                href="#"
                                className="flex items-center text-white px-6 py-4 font-medium hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                <FaCalendarAlt className="mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                                Lịch chiếu
                                <FaChevronDown className="ml-1 text-xs text-gray-400 group-hover:text-yellow-300 transition-colors duration-300" />
                            </a>

                            {/* Showtimes Dropdown */}
                            <div className="dropdown-menu p-3 bg-gray-900 rounded-lg shadow-xl border border-gray-700 w-56 z-50 animate-fadeIn">
                                <div className="mb-2 pb-2 border-b border-gray-700">
                                    <a
                                        href="#"
                                        className="flex items-center px-3 py-2 text-yellow-400 hover:bg-gray-800 rounded transition-colors duration-200"
                                    >
                                        <FaCalendarAlt className="mr-2" />
                                        Lịch chiếu hôm nay
                                    </a>
                                </div>
                                <div className="mb-2 pb-2 border-b border-gray-700">
                                    <a
                                        href="#"
                                        className="flex items-center px-3 py-2 text-white hover:bg-gray-800 rounded transition-colors duration-200"
                                    >
                                        <FaFilm className="mr-2" />
                                        Phim đang chiếu
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="flex items-center px-3 py-2 text-white hover:bg-gray-800 rounded transition-colors duration-200"
                                    >
                                        <FaFilm className="mr-2" />
                                        Phim sắp chiếu
                                    </a>
                                </div>
                            </div>
                        </li>

                        {/* Rạp chiếu */}
                        <li className="relative dropdown-container group">
                            <a
                                href="#"
                                className="flex items-center text-white px-6 py-4 font-medium hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                <FaBuilding className="mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                                Rạp chiếu
                                <FaChevronDown className="ml-1 text-xs text-gray-400 group-hover:text-yellow-300 transition-colors duration-300" />
                            </a>

                            {/* Theaters Dropdown */}
                            <div className="dropdown-menu p-3 bg-gray-900 rounded-lg shadow-xl border border-gray-700 w-64 z-50 animate-fadeIn">
                                <h4 className="text-yellow-400 font-bold mb-2 px-3">
                                    Danh sách rạp chiếu phim
                                </h4>
                                <div
                                    className="max-h-72 overflow-y-auto custom-scrollbar"
                                    style={{
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#4B5563 #1F2937'
                                    }}
                                >
                                    {theaters.map((theater) => (
                                        <a
                                            key={theater.id}
                                            href="#"
                                            className="flex items-center px-3 py-2 text-white hover:bg-gray-800 rounded transition-colors duration-200"
                                        >
                                            <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                                            <div>
                                                <div className="font-medium">
                                                    {theater.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {theater.location}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </li>

                        {/* Phim chiếu */}
                        <li className="relative group">
                            <a
                                href="#"
                                className="flex items-center text-white px-6 py-4 font-medium hover:text-yellow-300 transition-colors duration-300 group"
                            >
                                <FaFilm className="mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                                Phim chiếu
                            </a>
                        </li>

                        {/* Mua vé */}
                        <li className="relative group">
                            <button
                                onClick={scrollToTickets}
                                className="flex items-center text-white px-6 py-4 font-medium hover:text-yellow-300 transition-colors duration-300 group cursor-pointer"
                            >
                                <FaTicketAlt className="mr-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                                Mua vé
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
