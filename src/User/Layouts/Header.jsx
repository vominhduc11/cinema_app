import React, { useState, useEffect, useRef } from 'react';
import {
    FaSearch,
    FaUser,
    FaTimes,
    FaClock,
    FaStar,
    FaArrowLeft,
    FaEnvelope
} from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { IoMdMenu } from 'react-icons/io';
import Modal from 'react-modal';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

// Custom CSS for scrollbars (in JSX)
const scrollbarStyles = `
  /* WebKit browsers (Chrome, Safari, newer versions of Opera, Edge) */
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
`;

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
        useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [isResetEmailSent, setIsResetEmailSent] = useState(false);
    const searchInputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Sample movie data for the search dropdown
    const movies = [
        {
            id: 1,
            title: 'Nhà Giả Tiền',
            genre: 'Hài, Gia Đình',
            rating: 8.2,
            poster: '/path-to-poster-1.jpg'
        },
        {
            id: 2,
            title: 'Quỷ Nhập Tràng',
            genre: 'Kinh Dị',
            rating: 7.5,
            poster: '/path-to-poster-2.jpg'
        },
        {
            id: 3,
            title: 'Tiếng Vọng Kinh Hoàng',
            genre: 'Kinh Dị, Giật Gân',
            rating: 6.9,
            poster: '/path-to-poster-3.jpg'
        },
        {
            id: 4,
            title: 'Sát Thủ Vô Cùng Cực Hại',
            genre: 'Hài, Hành Động',
            rating: 7.8,
            poster: '/path-to-poster-4.jpg'
        },
        {
            id: 5,
            title: 'Biệt Đội Đánh Thuê',
            genre: 'Hành Động',
            rating: 8.0,
            poster: '/path-to-poster-5.jpg'
        },
        {
            id: 6,
            title: 'Venom: Đối Mặt Tử Thù',
            genre: 'Siêu Anh Hùng',
            rating: 7.3,
            poster: '/path-to-poster-6.jpg'
        },
        {
            id: 7,
            title: 'Thợ Săn Quái Vật',
            genre: 'Phiêu Lưu, Hành Động',
            rating: 6.5,
            poster: '/path-to-poster-7.jpg'
        },
        {
            id: 8,
            title: 'Kẻ Ẩn Danh',
            genre: 'Tâm Lý, Bí Ẩn',
            rating: 7.9,
            poster: '/path-to-poster-8.jpg'
        }
    ];

    // Filter movies based on search input
    const filteredMovies =
        searchValue.trim() === ''
            ? movies
            : movies.filter(
                  (movie) =>
                      movie.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      movie.genre
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
              );

    // Initialize tooltips
    useEffect(() => {
        tippy('#loginButton', {
            content: 'Đăng nhập / Đăng ký',
            placement: 'bottom',
            arrow: true,
            animation: 'scale'
        });

        tippy('#searchButton', {
            content: 'Tìm kiếm phim',
            placement: 'bottom',
            arrow: true,
            animation: 'scale'
        });
    }, []);

    // Add click outside listener to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target)
            ) {
                setIsSearchDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle login/register view
    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    // Handle search input focus
    const handleSearchFocus = () => {
        setIsSearchDropdownOpen(true);
    };

    // Handle movie selection from dropdown
    const handleSelectMovie = (movie) => {
        setSearchValue(movie.title);
        setIsSearchDropdownOpen(false);
        // You could add additional functionality here, like redirecting to the movie page
    };

    // Handle forgot password click
    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
        setIsForgotPasswordModalOpen(true);
        setIsResetEmailSent(false);
        setResetEmail('');
    };

    // Handle back to login
    const handleBackToLogin = () => {
        setIsForgotPasswordModalOpen(false);
        setIsModalOpen(true);
    };

    // Handle reset password submit
    const handleResetPasswordSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to send a reset email
        // For now, we'll just simulate it with a state change
        setIsResetEmailSent(true);
    };

    // Modal styles
    const customModalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            borderRadius: '8px',
            maxWidth: '400px',
            width: '90%'
        }
    };

    return (
        <header className="bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg">
            {/* Add scrollbar styles */}
            <style>{scrollbarStyles}</style>

            {/* Main Header Container */}
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/">
                        <div className="flex items-center">
                            <div className="flex items-center transition-transform duration-300 hover:scale-105">
                                <BiCameraMovie className="text-yellow-300 text-4xl" />
                                <span className="ml-2 text-white font-bold text-xl">
                                    CineStar
                                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Search & Login */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Search Bar with Dropdown */}
                        <div className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={handleSearchFocus}
                                className="bg-gray-700 bg-opacity-50 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 w-64 placeholder-gray-300"
                            />
                            <button
                                id="searchButton"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-yellow-300 transition-colors duration-300"
                            >
                                <FaSearch />
                            </button>

                            {/* Search Dropdown */}
                            {isSearchDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute mt-2 w-full bg-gray-800 shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto custom-scrollbar"
                                    style={{
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: '#4B5563 #1F2937'
                                    }}
                                >
                                    {filteredMovies.length > 0 ? (
                                        <ul className="py-2">
                                            {filteredMovies.map((movie) => (
                                                <li
                                                    key={movie.id}
                                                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleSelectMovie(movie)
                                                    }
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center">
                                                            {/* Movie Poster/Avatar */}
                                                            <div className="w-10 h-14 mr-3 rounded overflow-hidden bg-gray-700 flex-shrink-0">
                                                                {/* If we have a poster path, show it; otherwise, show placeholder */}
                                                                {movie.poster ? (
                                                                    <img
                                                                        src={
                                                                            movie.poster
                                                                        }
                                                                        alt={
                                                                            movie.title
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-gray-600">
                                                                        <BiCameraMovie className="text-gray-400 text-2xl" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="text-white font-medium">
                                                                    {
                                                                        movie.title
                                                                    }
                                                                </div>
                                                                <div className="text-gray-400 text-sm">
                                                                    {
                                                                        movie.genre
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center text-yellow-400 text-sm ml-2">
                                                            <FaStar className="mr-1" />
                                                            <span>
                                                                {movie.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="px-4 py-3 text-center text-gray-400">
                                            Không tìm thấy phim
                                        </div>
                                    )}
                                    <div className="px-4 py-2 bg-gray-900 border-t border-gray-700 text-center">
                                        <a
                                            href="#"
                                            className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                                        >
                                            Xem tất cả kết quả
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            id="loginButton"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 flex items-center"
                        >
                            <FaUser className="mr-2" />
                            Đăng nhập
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white p-2 focus:outline-none"
                        >
                            <IoMdMenu className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 py-4' : 'max-h-0'}`}
            >
                <div className="px-4 space-y-4">
                    {/* Mobile Search with Dropdown */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={handleSearchFocus}
                            className="bg-gray-700 bg-opacity-50 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full placeholder-gray-300"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />

                        {/* Mobile Search Dropdown */}
                        {isSearchDropdownOpen && (
                            <div
                                className="absolute mt-2 w-full bg-gray-800 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto custom-scrollbar"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#4B5563 #1F2937'
                                }}
                            >
                                {filteredMovies.length > 0 ? (
                                    <ul className="py-2">
                                        {filteredMovies.map((movie) => (
                                            <li
                                                key={movie.id}
                                                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                                onClick={() =>
                                                    handleSelectMovie(movie)
                                                }
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        {/* Movie Poster/Avatar */}
                                                        <div className="w-10 h-14 mr-3 rounded overflow-hidden bg-gray-700 flex-shrink-0">
                                                            {/* If we have a poster path, show it; otherwise, show placeholder */}
                                                            {movie.poster ? (
                                                                <img
                                                                    src={
                                                                        movie.poster
                                                                    }
                                                                    alt={
                                                                        movie.title
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-600">
                                                                    <BiCameraMovie className="text-gray-400 text-2xl" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-white font-medium">
                                                                {movie.title}
                                                            </div>
                                                            <div className="text-gray-400 text-sm">
                                                                {movie.genre}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-yellow-400 text-sm ml-2">
                                                        <FaStar className="mr-1" />
                                                        <span>
                                                            {movie.rating}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="px-4 py-3 text-center text-gray-400">
                                        Không tìm thấy phim
                                    </div>
                                )}
                                <div className="px-4 py-2 bg-gray-900 border-t border-gray-700 text-center">
                                    <a
                                        href="#"
                                        className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                                    >
                                        Xem tất cả kết quả
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsMenuOpen(false);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full w-full flex items-center justify-center"
                    >
                        <FaUser className="mr-2" />
                        Đăng nhập
                    </button>
                </div>
            </div>

            {/* Login/Register Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customModalStyles}
                contentLabel="Login Modal"
            >
                <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-purple-800 to-indigo-700 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">
                            {isLoginView ? 'Đăng nhập' : 'Đăng ký'}
                        </h2>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-white hover:text-yellow-300 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        {isLoginView ? (
                            // Login Form
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                        />
                                        <span className="text-gray-300">
                                            Nhớ mật khẩu
                                        </span>
                                    </label>
                                    <a
                                        href="#"
                                        onClick={handleForgotPasswordClick}
                                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                                    >
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                                >
                                    Đăng nhập
                                </button>
                            </form>
                        ) : (
                            // Register Form
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Họ tên
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="Nguyen Van A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Xác nhận mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                                >
                                    Đăng ký
                                </button>
                            </form>
                        )}

                        {/* Toggle Login/Register */}
                        <div className="mt-4 text-center text-sm text-gray-400">
                            {isLoginView
                                ? 'Chưa có tài khoản?'
                                : 'Đã có tài khoản?'}
                            <button
                                onClick={toggleView}
                                className="ml-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                                {isLoginView ? 'Đăng ký ngay' : 'Đăng nhập'}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Forgot Password Modal */}
            <Modal
                isOpen={isForgotPasswordModalOpen}
                onRequestClose={() => setIsForgotPasswordModalOpen(false)}
                style={customModalStyles}
                contentLabel="Forgot Password Modal"
            >
                <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-gradient-to-r from-purple-800 to-indigo-700 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center">
                            <button
                                onClick={handleBackToLogin}
                                className="mr-3 text-white hover:text-yellow-300 transition-colors"
                            >
                                <FaArrowLeft />
                            </button>
                            Quên mật khẩu
                        </h2>
                        <button
                            onClick={() => setIsForgotPasswordModalOpen(false)}
                            className="text-white hover:text-yellow-300 transition-colors"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        {!isResetEmailSent ? (
                            // Forgot Password Form
                            <>
                                <p className="text-gray-300 mb-4">
                                    Vui lòng nhập địa chỉ email bạn đã đăng ký.
                                    Chúng tôi sẽ gửi một liên kết để đặt lại mật
                                    khẩu của bạn.
                                </p>
                                <form
                                    className="space-y-4"
                                    onSubmit={handleResetPasswordSubmit}
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="text-gray-500" />
                                            </div>
                                            <input
                                                type="email"
                                                value={resetEmail}
                                                onChange={(e) =>
                                                    setResetEmail(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                                    >
                                        Gửi liên kết đặt lại
                                    </button>
                                </form>
                            </>
                        ) : (
                            // Success message
                            <div className="text-center py-6">
                                <div className="bg-green-900 bg-opacity-30 p-4 rounded-lg mb-6">
                                    <div className="text-green-400 text-4xl mb-3">
                                        ✓
                                    </div>
                                    <h3 className="text-xl font-semibold text-green-300 mb-2">
                                        Đã gửi email!
                                    </h3>
                                    <p className="text-gray-300">
                                        Kiểm tra hộp thư của bạn và làm theo
                                        hướng dẫn để đặt lại mật khẩu.
                                    </p>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">
                                    Không nhận được email? Kiểm tra thư rác hoặc
                                    thử lại sau vài phút.
                                </p>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() =>
                                            setIsResetEmailSent(false)
                                        }
                                        className="flex-1 border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                                    >
                                        Thử lại
                                    </button>
                                    <button
                                        onClick={handleBackToLogin}
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </header>
    );
};

export default Header;
