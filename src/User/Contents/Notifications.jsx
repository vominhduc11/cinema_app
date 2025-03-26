import React, { useState, useEffect } from 'react';
import {
    FaArrowLeft,
    FaBell,
    FaCheck,
    FaCheckDouble,
    FaFilter,
    FaSearch,
    FaTrash,
    FaStar,
    FaClock
} from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Sample notification data (in a real app, this would come from an API)
const sampleNotifications = [
    {
        id: 1,
        type: 'new_movie',
        title: 'Phim mới: Biệt Đội Siêu Anh Hùng',
        content:
            'Phim mới "Biệt Đội Siêu Anh Hùng" đã được thêm vào danh sách phim đang chiếu. Xem ngay!',
        time: '2 giờ trước',
        date: '25/03/2025',
        read: false,
        image: '/path-to-image-1.jpg'
    },
    {
        id: 2,
        type: 'promotion',
        title: 'Ưu đãi: Mua 1 tặng 1 vào thứ 4',
        content:
            'Chương trình ưu đãi "Happy Wednesday" mua 1 tặng 1 vé xem phim vào mỗi thứ 4 hàng tuần đã trở lại. Đặt vé ngay hôm nay!',
        time: '1 ngày trước',
        date: '24/03/2025',
        read: false,
        image: '/path-to-image-2.jpg'
    },
    {
        id: 3,
        type: 'system',
        title: 'Bảo trì hệ thống hoàn tất',
        content:
            'Hệ thống đã được bảo trì và nâng cấp thành công. Cảm ơn bạn đã kiên nhẫn chờ đợi.',
        time: '3 ngày trước',
        date: '22/03/2025',
        read: true,
        image: null
    },
    {
        id: 4,
        type: 'new_movie',
        title: 'Phim mới: Hành Trình Kỳ Diệu',
        content:
            'Phim mới "Hành Trình Kỳ Diệu" sẽ được công chiếu vào ngày 30/03/2025. Đặt vé trước để nhận ưu đãi đặc biệt!',
        time: '4 ngày trước',
        date: '21/03/2025',
        read: true,
        image: '/path-to-image-4.jpg'
    },
    {
        id: 5,
        type: 'promotion',
        title: 'Ưu đãi thành viên: Tích điểm x2',
        content:
            'Từ ngày 20/03 đến 31/03, tất cả các giao dịch đều được tích điểm x2. Cơ hội nâng hạng thành viên và nhận nhiều đặc quyền hơn!',
        time: '5 ngày trước',
        date: '20/03/2025',
        read: true,
        image: '/path-to-image-5.jpg'
    },
    {
        id: 6,
        type: 'system',
        title: 'Cập nhật ứng dụng mới',
        content:
            'Phiên bản mới của ứng dụng CineStar đã được phát hành với nhiều tính năng hấp dẫn. Cập nhật ngay!',
        time: '1 tuần trước',
        date: '18/03/2025',
        read: true,
        image: null
    },
    {
        id: 7,
        type: 'new_movie',
        title: 'Phim mới: Đảo Hoang Kỳ Bí',
        content:
            'Phim mới "Đảo Hoang Kỳ Bí" đã được thêm vào danh sách phim sắp chiếu. Xem trailer ngay!',
        time: '1 tuần trước',
        date: '18/03/2025',
        read: true,
        image: '/path-to-image-7.jpg'
    },
    {
        id: 8,
        type: 'system',
        title: 'Thay đổi chính sách thành viên',
        content:
            'Chính sách thành viên CineStar đã được cập nhật từ ngày 15/03/2025. Xem chi tiết tại đây.',
        time: '10 ngày trước',
        date: '15/03/2025',
        read: true,
        image: null
    },
    {
        id: 9,
        type: 'promotion',
        title: 'Ưu đãi sinh nhật đặc biệt',
        content:
            'Nhân dịp sinh nhật 5 năm thành lập, CineStar tặng bạn mã giảm giá 50% cho lần mua vé tiếp theo. Mã: CINE5YEAR',
        time: '2 tuần trước',
        date: '11/03/2025',
        read: true,
        image: '/path-to-image-9.jpg'
    },
    {
        id: 10,
        type: 'new_movie',
        title: 'Phim mới: Vùng Đất Quỷ Dữ',
        content:
            'Phim kinh dị "Vùng Đất Quỷ Dữ" sẽ được công chiếu vào ngày 15/03/2025. Bạn đã sẵn sàng?',
        time: '2 tuần trước',
        date: '11/03/2025',
        read: true,
        image: '/path-to-image-10.jpg'
    }
];

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        // In a real application, fetch notifications from API
        setNotifications(sampleNotifications);
    }, []);

    // Filter notifications based on type and search query
    const filteredNotifications = notifications.filter((notification) => {
        const matchesFilter =
            activeFilter === 'all' || notification.type === activeFilter;
        const matchesSearch =
            notification.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            notification.content
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleMarkAllAsRead = () => {
        const updatedNotifications = notifications.map((notification) => ({
            ...notification,
            read: true
        }));
        setNotifications(updatedNotifications);
    };

    const handleMarkAsRead = (id) => {
        const updatedNotifications = notifications.map((notification) =>
            notification.id === id
                ? { ...notification, read: true }
                : notification
        );
        setNotifications(updatedNotifications);
    };

    const handleDeleteNotification = (id) => {
        const updatedNotifications = notifications.filter(
            (notification) => notification.id !== id
        );
        setNotifications(updatedNotifications);
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    // Get notification icon based on type
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'new_movie':
                return <BiCameraMovie className="text-blue-400 text-xl" />;
            case 'promotion':
                return <FaStar className="text-yellow-400 text-xl" />;
            case 'system':
                return <FaClock className="text-gray-400 text-xl" />;
            default:
                return <FaBell className="text-purple-400 text-xl" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Content */}
            <div className="container mx-auto px-4 py-6">
                {/* Controls */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm thông báo..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-700 bg-opacity-50 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 w-full md:w-64 placeholder-gray-300"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center space-x-2">
                            <span className="text-gray-300 flex items-center">
                                <FaFilter className="mr-2" /> Lọc:
                            </span>
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-yellow-500 text-gray-900 font-semibold' : 'bg-gray-700 text-gray-300'}`}
                            >
                                Tất cả
                            </button>
                            <button
                                onClick={() => setActiveFilter('new_movie')}
                                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'new_movie' ? 'bg-blue-500 text-white font-semibold' : 'bg-gray-700 text-gray-300'}`}
                            >
                                Phim mới
                            </button>
                            <button
                                onClick={() => setActiveFilter('promotion')}
                                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'promotion' ? 'bg-yellow-500 text-gray-900 font-semibold' : 'bg-gray-700 text-gray-300'}`}
                            >
                                Ưu đãi
                            </button>
                            <button
                                onClick={() => setActiveFilter('system')}
                                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'system' ? 'bg-gray-500 text-white font-semibold' : 'bg-gray-700 text-gray-300'}`}
                            >
                                Hệ thống
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                            <button
                                onClick={handleMarkAllAsRead}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm flex items-center transition-colors"
                                disabled={notifications.every((n) => n.read)}
                            >
                                <FaCheckDouble className="mr-1" /> Đánh dấu đã
                                đọc
                            </button>
                            <button
                                onClick={handleClearAll}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm flex items-center transition-colors"
                                disabled={notifications.length === 0}
                            >
                                <FaTrash className="mr-1" /> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                {paginatedNotifications.length > 0 ? (
                    <div className="space-y-4">
                        {paginatedNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${!notification.read ? 'border-l-4 border-yellow-500' : ''}`}
                            >
                                <div className="p-4 md:p-5">
                                    <div className="flex">
                                        {/* Left - Icon or Image */}
                                        <div className="mr-4 flex-shrink-0">
                                            {notification.image ? (
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700">
                                                    <img
                                                        src={notification.image}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center">
                                                    {getNotificationIcon(
                                                        notification.type
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Middle - Content */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3
                                                    className={`font-bold ${!notification.read ? 'text-white' : 'text-gray-300'}`}
                                                >
                                                    {notification.title}
                                                </h3>
                                                <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                    {notification.date}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-2">
                                                {notification.content}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-gray-500">
                                                    {notification.time}
                                                </span>
                                                <div className="flex space-x-2">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() =>
                                                                handleMarkAsRead(
                                                                    notification.id
                                                                )
                                                            }
                                                            className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded flex items-center transition-colors"
                                                        >
                                                            <FaCheck className="mr-1" />{' '}
                                                            Đánh dấu đã đọc
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteNotification(
                                                                notification.id
                                                            )
                                                        }
                                                        className="text-xs bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white px-2 py-1 rounded flex items-center transition-colors"
                                                    >
                                                        <FaTrash className="mr-1" />{' '}
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg p-10 text-center">
                        <FaBell className="text-gray-600 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-300 mb-2">
                            Không có thông báo
                        </h3>
                        <p className="text-gray-400">
                            {searchQuery
                                ? 'Không tìm thấy thông báo phù hợp với tìm kiếm của bạn.'
                                : 'Bạn hiện không có thông báo nào.'}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex space-x-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                            >
                                Trước
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === page ? 'bg-yellow-500 text-gray-900 font-bold' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                            >
                                Tiếp
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
