import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaTh,
    FaFilm,
    FaUsers,
    FaTicketAlt,
    FaChartBar,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaCog,
    FaComments,
    FaImage,
    FaTheaterMasks,
    FaStar,
    FaTags
} from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';

const Sidebar = ({ isOpen }) => {
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <FaTh />,
            path: '/admin',
            exact: true
        },
        {
            title: 'Quản lý Phim',
            icon: <FaFilm />,
            path: '/admin/movies',
            submenu: [
                { title: 'Danh sách phim', path: '/admin/movies' },
                { title: 'Thêm phim mới', path: '/admin/movies/add' },
                { title: 'Loại phim', path: '/admin/movies/categories' }
            ]
        },
        {
            title: 'Quản lý Rạp',
            icon: <FaTheaterMasks />,
            path: '/admin/theaters',
            submenu: [
                { title: 'Danh sách rạp', path: '/admin/theaters' },
                { title: 'Quản lý phòng chiếu', path: '/admin/theaters/rooms' }
            ]
        },
        {
            title: 'Lịch Chiếu',
            icon: <FaCalendarAlt />,
            path: '/admin/showtimes'
        },
        {
            title: 'Quản lý Vé',
            icon: <FaTicketAlt />,
            path: '/admin/tickets',
            submenu: [
                { title: 'Danh sách vé', path: '/admin/tickets' },
                { title: 'Vé đã bán', path: '/admin/tickets/sold' },
                { title: 'Vé đã hủy', path: '/admin/tickets/canceled' }
            ]
        },
        {
            title: 'Quản lý Người Dùng',
            icon: <FaUsers />,
            path: '/admin/users',
            submenu: [
                { title: 'Danh sách người dùng', path: '/admin/users' },
                { title: 'Thêm người dùng', path: '/admin/users/add' },
                { title: 'Phân quyền', path: '/admin/users/roles' }
            ]
        },
        {
            title: 'Khuyến Mãi',
            icon: <FaTags />,
            path: '/admin/promotions'
        },
        {
            title: 'Thanh Toán',
            icon: <FaMoneyBillWave />,
            path: '/admin/payments',
            submenu: [
                { title: 'Lịch sử thanh toán', path: '/admin/payments' },
                { title: 'Cấu hình thanh toán', path: '/admin/payments/config' }
            ]
        },
        {
            title: 'Báo Cáo & Thống Kê',
            icon: <FaChartBar />,
            path: '/admin/reports',
            submenu: [
                { title: 'Doanh thu', path: '/admin/reports/revenue' },
                { title: 'Người dùng', path: '/admin/reports/users' },
                { title: 'Vé bán', path: '/admin/reports/tickets' },
                { title: 'Phim phổ biến', path: '/admin/reports/popular' }
            ]
        },
        {
            title: 'Media & Files',
            icon: <FaImage />,
            path: '/admin/media'
        },
        {
            title: 'Đánh Giá & Bình Luận',
            icon: <FaStar />,
            path: '/admin/reviews'
        },
        {
            title: 'Tin Nhắn',
            icon: <FaComments />,
            path: '/admin/messages'
        },
        {
            title: 'Cài Đặt Hệ Thống',
            icon: <FaCog />,
            path: '/admin/settings'
        }
    ];

    // Check if a menu item should be considered active
    const isActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    // State for expanded submenu items
    const [expandedItems, setExpandedItems] = React.useState([]);

    // Toggle submenu expansion
    const toggleSubmenu = (index) => {
        if (expandedItems.includes(index)) {
            setExpandedItems(expandedItems.filter((item) => item !== index));
        } else {
            setExpandedItems([...expandedItems, index]);
        }
    };

    return (
        <div
            className={`bg-gray-900 text-white fixed h-full z-20 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} shadow-lg`}
        >
            {/* Sidebar logo - shown only when sidebar is collapsed */}
            {!isOpen && (
                <div className="h-16 flex items-center justify-center border-b border-gray-800">
                    <BiCameraMovie className="text-yellow-300 text-3xl" />
                </div>
            )}

            {/* Scrollable menu */}
            <div className="overflow-y-auto h-full pb-20">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        {/* Main menu item */}
                        {item.submenu ? (
                            // Item with submenu
                            <div className="relative">
                                <button
                                    onClick={() => toggleSubmenu(index)}
                                    className={`w-full flex items-center px-4 py-3 transition-colors ${
                                        isActive(item.path)
                                            ? 'bg-gray-800 text-yellow-300 border-l-4 border-yellow-300'
                                            : 'hover:bg-gray-800 hover:text-yellow-300'
                                    }`}
                                >
                                    <span
                                        className={`text-lg ${isOpen ? 'mr-3' : 'mx-auto'}`}
                                    >
                                        {item.icon}
                                    </span>
                                    {isOpen && (
                                        <>
                                            <span className="text-sm">
                                                {item.title}
                                            </span>
                                            <span className="ml-auto text-xs">
                                                {expandedItems.includes(index)
                                                    ? '▼'
                                                    : '▶'}
                                            </span>
                                        </>
                                    )}
                                </button>

                                {/* Submenu */}
                                {isOpen && expandedItems.includes(index) && (
                                    <div className="bg-gray-800 pl-4">
                                        {item.submenu.map(
                                            (subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.path}
                                                    className={`block px-4 py-2 text-sm ${
                                                        location.pathname ===
                                                        subItem.path
                                                            ? 'text-yellow-300'
                                                            : 'text-gray-400 hover:text-yellow-300'
                                                    }`}
                                                >
                                                    • {subItem.title}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Regular item without submenu
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-3 transition-colors ${
                                    isActive(item.path, item.exact)
                                        ? 'bg-gray-800 text-yellow-300 border-l-4 border-yellow-300'
                                        : 'hover:bg-gray-800 hover:text-yellow-300'
                                }`}
                            >
                                <span
                                    className={`text-lg ${isOpen ? 'mr-3' : 'mx-auto'}`}
                                >
                                    {item.icon}
                                </span>
                                {isOpen && (
                                    <span className="text-sm">
                                        {item.title}
                                    </span>
                                )}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
