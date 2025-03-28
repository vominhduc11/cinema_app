import React, { useState, useEffect } from 'react';
import {
    FaBell,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaSearch,
    FaCog,
    FaEnvelope,
    FaSun,
    FaMoon,
    FaQuestionCircle
} from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message:
                'New movie "Avengers: Final Chapter" has been added to the system',
            time: '5 min ago',
            read: false,
            type: 'movie'
        },
        {
            id: 2,
            message: 'Sales report for June 2023 is ready to view',
            time: '1 hour ago',
            read: false,
            type: 'report'
        },
        {
            id: 3,
            message: 'System maintenance scheduled for tonight at 2 AM',
            time: '2 hours ago',
            read: true,
            type: 'system'
        },
        {
            id: 4,
            message: '3 new user registrations require approval',
            time: '3 hours ago',
            read: true,
            type: 'user'
        }
    ]);

    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [time, setTime] = useState(new Date());
    const [darkMode, setDarkMode] = useState(false);

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showNotifications || showUserMenu) {
                if (!event.target.closest('.dropdown-container')) {
                    setShowNotifications(false);
                    setShowUserMenu(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications, showUserMenu]);

    const handleReadNotification = (id) => {
        setNotifications(
            notifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true
            }))
        );
    };

    const deleteNotification = (id, e) => {
        e.stopPropagation();
        setNotifications(
            notifications.filter((notification) => notification.id !== id)
        );
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
        console.log('Searching for:', searchTerm);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // In a real app, you would apply dark mode globally here
        // document.documentElement.classList.toggle('dark');
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'movie':
                return (
                    <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                        <FaFilm className="text-sm" />
                    </span>
                );
            case 'report':
                return (
                    <span className="bg-green-100 text-green-600 rounded-full p-2">
                        <FaChartLine className="text-sm" />
                    </span>
                );
            case 'system':
                return (
                    <span className="bg-yellow-100 text-yellow-600 rounded-full p-2">
                        <FaCog className="text-sm" />
                    </span>
                );
            case 'user':
                return (
                    <span className="bg-purple-100 text-purple-600 rounded-full p-2">
                        <FaUser className="text-sm" />
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-100 text-gray-600 rounded-full p-2">
                        <FaBell className="text-sm" />
                    </span>
                );
        }
    };

    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 z-10 relative">
            {/* Left side - Menu toggle and Logo */}
            <div className="flex items-center">
                <button
                    className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 mr-3"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaBars className="text-lg" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">
                    <span className="text-blue-600">Cinema</span> Admin
                </h1>
            </div>

            {/* Middle - Search bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 flex-1 max-w-md mx-6">
                <form onSubmit={handleSearch} className="flex w-full">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search movies, theaters, users..."
                        className="bg-transparent outline-none w-full text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Right side - Notifications, User profile, etc. */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Current time */}
                <div className="text-gray-600 hidden md:block text-sm">
                    {time.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>

                {/* Dark mode toggle */}
                <button
                    className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={toggleDarkMode}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                        <FaSun className="text-lg" />
                    ) : (
                        <FaMoon className="text-lg" />
                    )}
                </button>

                {/* Help button */}
                <button
                    className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200 hidden sm:block"
                    aria-label="Help"
                >
                    <FaQuestionCircle className="text-lg" />
                </button>

                {/* Messages */}
                <button
                    className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200 hidden sm:block"
                    aria-label="Messages"
                >
                    <FaEnvelope className="text-lg" />
                    <span className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                        3
                    </span>
                </button>

                {/* Notifications dropdown */}
                <div className="dropdown-container relative">
                    <button
                        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowUserMenu(false);
                        }}
                        aria-label="Notifications"
                    >
                        <FaBell className="text-lg" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 animate-fadeIn">
                            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-700">
                                    Notifications
                                </h3>
                                {unreadCount > 0 && (
                                    <button
                                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                        onClick={markAllAsRead}
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                            {notifications.length === 0 ? (
                                <div className="px-4 py-3 text-gray-500 text-center">
                                    No notifications
                                </div>
                            ) : (
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`px-4 py-3 hover:bg-gray-100 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''} border-b border-gray-100 flex items-start`}
                                            onClick={() =>
                                                handleReadNotification(
                                                    notification.id
                                                )
                                            }
                                        >
                                            <div className="flex-shrink-0 mr-3">
                                                {getNotificationIcon(
                                                    notification.type
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-gray-800">
                                                    {notification.message}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {notification.time}
                                                </div>
                                            </div>
                                            <button
                                                className="ml-2 text-gray-400 hover:text-red-500"
                                                onClick={(e) =>
                                                    deleteNotification(
                                                        notification.id,
                                                        e
                                                    )
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="px-4 py-2 border-t border-gray-200 text-center">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View all notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* User profile dropdown */}
                <div className="dropdown-container relative">
                    <button
                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                        onClick={() => {
                            setShowUserMenu(!showUserMenu);
                            setShowNotifications(false);
                        }}
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            <FaUser />
                        </div>
                        <span className="font-medium hidden md:block">
                            Admin User
                        </span>
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 animate-fadeIn">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <div className="font-medium text-gray-800">
                                    Admin User
                                </div>
                                <div className="text-xs text-gray-500">
                                    admin@example.com
                                </div>
                            </div>
                            <a
                                href="#profile"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <FaUser className="mr-2 text-gray-500" />{' '}
                                Profile
                            </a>
                            <a
                                href="#settings"
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                <FaCog className="mr-2 text-gray-500" />{' '}
                                Settings
                            </a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <a
                                href="#logout"
                                className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                <FaSignOutAlt className="mr-2" /> Logout
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile search button */}
            <button
                className="md:hidden text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                aria-label="Search"
            >
                <FaSearch className="text-lg" />
            </button>

            {/* CSS animations */}
            <style jsx>{`
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
                    animation: fadeIn 0.2s ease-in-out forwards;
                }
            `}</style>
        </header>
    );
};

// When used in the component, we need to import these icons from react-icons
const FaFilm = ({ className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"></path>
    </svg>
);

const FaChartLine = ({ className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path>
    </svg>
);

export default Header;
