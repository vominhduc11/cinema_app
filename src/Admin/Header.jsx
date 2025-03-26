import React, { useState, useRef, useEffect } from 'react';
import {
    FaBars,
    FaSearch,
    FaBell,
    FaEnvelope,
    FaCog,
    FaSignOutAlt,
    FaUser,
    FaTh,
    FaFilm,
    FaUsers,
    FaTicketAlt,
    FaChartBar,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaTimes
} from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
const Header = ({ toggleSidebar, sidebarOpen }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
        useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const notificationDropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);

    // Sample admin notifications
    const notifications = [
        {
            id: 1,
            title: 'Người dùng mới đăng ký',
            description: '10 người dùng mới đã đăng ký trong 24 giờ qua',
            time: '30 phút trước',
            read: false,
            type: 'user'
        },
        {
            id: 2,
            title: 'Báo cáo doanh thu mới',
            description:
                'Báo cáo doanh thu tháng 3/2025 đã sẵn sàng để xem xét',
            time: '2 giờ trước',
            read: false,
            type: 'report'
        },
        {
            id: 3,
            title: 'Cập nhật hệ thống',
            description: 'Bảo trì hệ thống đã hoàn tất, có 3 tính năng mới',
            time: '1 ngày trước',
            read: true,
            type: 'system'
        },
        {
            id: 4,
            title: 'Phim mới cần duyệt',
            description: '5 phim mới đang chờ được phê duyệt để hiển thị',
            time: '2 ngày trước',
            read: true,
            type: 'movie'
        }
    ];

    // Count unread notifications
    const unreadCount = notifications.filter((n) => !n.read).length;

    // Admin menu items
    const menuItems = [
        { icon: <FaTh />, label: 'Dashboard', path: '/admin' },
        { icon: <FaFilm />, label: 'Quản lý phim', path: '/admin/movies' },
        {
            icon: <FaUsers />,
            label: 'Quản lý người dùng',
            path: '/admin/users'
        },
        { icon: <FaTicketAlt />, label: 'Quản lý vé', path: '/admin/tickets' },
        { icon: <FaChartBar />, label: 'Báo cáo', path: '/admin/reports' },
        {
            icon: <FaCalendarAlt />,
            label: 'Lịch chiếu',
            path: '/admin/showtimes'
        },
        {
            icon: <FaMoneyBillWave />,
            label: 'Thanh toán',
            path: '/admin/payments'
        }
    ];

    // Handle click outside to close dropdowns
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationDropdownRef.current &&
                !notificationDropdownRef.current.contains(event.target)
            ) {
                setIsNotificationDropdownOpen(false);
            }

            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target)
            ) {
                setIsProfileDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle notification dropdown
    const toggleNotificationDropdown = () => {
        setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
        setIsProfileDropdownOpen(false);
    };

    // Toggle profile dropdown
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
        setIsNotificationDropdownOpen(false);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        // In a real app, this would call an API
        console.log('Mark all notifications as read');
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'user':
                return <FaUsers className="text-blue-400" />;
            case 'report':
                return <FaChartBar className="text-green-400" />;
            case 'system':
                return <FaCog className="text-yellow-400" />;
            case 'movie':
                return <FaFilm className="text-purple-400" />;
            default:
                return <FaBell className="text-gray-400" />;
        }
    };

    return (
        <>
            {/* Main Header */}
            <header className="bg-gray-800 text-white shadow-md w-full z-30">
                <div className="flex justify-between items-center px-4 py-3">
                    {/* Left: Logo and Toggle Button */}
                    <div className="flex items-center">
                        {/* Sidebar Toggle Button */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-2"
                        >
                            <FaBars className="h-5 w-5" />
                        </button>

                        {/* Logo */}
                        <Link to="/admin" className="flex items-center">
                            <div className="flex items-center transition-transform duration-300 hover:scale-105">
                                <BiCameraMovie className="text-yellow-300 text-3xl" />
                                <div className="ml-2">
                                    <span className="font-bold text-xl text-white">
                                        CineStar
                                    </span>
                                    <span className="text-xs text-gray-400 ml-1">
                                        Admin
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Mobile Menu Toggle (visible on mobile only) */}
                        <div className="md:hidden ml-auto">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                            >
                                {isMobileMenuOpen ? (
                                    <FaTimes className="h-5 w-5" />
                                ) : (
                                    <FaBars className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Center: Search (hidden on mobile) */}
                    <div className="hidden md:block flex-1 max-w-lg mx-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim, người dùng, vé..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="bg-gray-700 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FaSearch className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Icons and Profile (hidden on mobile) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative" ref={notificationDropdownRef}>
                            <button
                                onClick={toggleNotificationDropdown}
                                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none relative"
                            >
                                <FaBell className="h-5 w-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {isNotificationDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700">
                                    <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                                        <h3 className="font-medium text-white">
                                            Thông báo
                                        </h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-blue-400 hover:text-blue-300"
                                            >
                                                Đánh dấu tất cả đã đọc
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            <>
                                                {notifications.map(
                                                    (notification) => (
                                                        <div
                                                            key={
                                                                notification.id
                                                            }
                                                            className={`px-4 py-3 hover:bg-gray-700 border-b border-gray-700 ${!notification.read ? 'bg-gray-700 bg-opacity-50' : ''}`}
                                                        >
                                                            <div className="flex">
                                                                <div className="mr-3 mt-1">
                                                                    {getNotificationIcon(
                                                                        notification.type
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-medium text-white">
                                                                        {
                                                                            notification.title
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-400 mt-1">
                                                                        {
                                                                            notification.description
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                        {
                                                                            notification.time
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="ml-auto">
                                                                    {!notification.read && (
                                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <div className="px-4 py-3 text-center text-gray-400">
                                                Không có thông báo mới
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-t border-gray-700 px-4 py-2 text-center">
                                        <Link
                                            to="/admin/notifications"
                                            className="text-sm text-blue-400 hover:text-blue-300"
                                        >
                                            Xem tất cả thông báo
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Messages */}
                        <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none relative">
                            <FaEnvelope className="h-5 w-5" />
                            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                2
                            </span>
                        </button>

                        {/* Settings */}
                        <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                            <FaCog className="h-5 w-5" />
                        </button>

                        {/* Profile */}
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={toggleProfileDropdown}
                                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            >
                                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                                    <FaUser className="text-gray-300" />
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700">
                                    <div className="px-4 py-3 border-b border-gray-700">
                                        <p className="text-sm font-medium text-white">
                                            Admin Quản Trị
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            admin@cinestar.vn
                                        </p>
                                    </div>
                                    <Link
                                        to="/admin/profile"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                    >
                                        Thông tin cá nhân
                                    </Link>
                                    <Link
                                        to="/admin/settings"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                    >
                                        Cài đặt
                                    </Link>
                                    <div className="border-t border-gray-700 mt-1">
                                        <Link
                                            to="/admin/logout"
                                            className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                                        >
                                            <div className="flex items-center">
                                                <FaSignOutAlt className="mr-2" />
                                                Đăng xuất
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile menu (visible when toggled) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-800 border-t border-gray-700 py-2">
                        {/* Mobile Search */}
                        <div className="px-4 pb-3 pt-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                    className="bg-gray-700 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <FaSearch className="text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="px-2 space-y-1">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    <div className="flex items-center">
                                        <span className="mr-3">
                                            {item.icon}
                                        </span>
                                        {item.label}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Profile Links */}
                        <div className="border-t border-gray-700 pt-4 pb-3">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                                        <FaUser className="text-gray-300" />
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        Admin Quản Trị
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        admin@cinestar.vn
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <Link
                                    to="/admin/profile"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Thông tin cá nhân
                                </Link>
                                <Link
                                    to="/admin/settings"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Cài đặt
                                </Link>
                                <Link
                                    to="/admin/logout"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700"
                                >
                                    <div className="flex items-center">
                                        <FaSignOutAlt className="mr-2" />
                                        Đăng xuất
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
