import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import {
    FaSearch,
    FaTicketAlt,
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaChair,
    FaQrcode,
    FaFilm,
    FaDownload,
    FaPrint,
    FaEye,
    FaStar,
    FaChevronDown,
    FaChevronUp,
    FaTimes,
    FaHistory,
    FaFilter,
    FaUsers,
    FaRegCalendarCheck
} from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';
import { format, addDays } from 'date-fns';
import { vi } from 'date-fns/locale';

const BookingHistory = () => {
    // Sample booking data for demonstration
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [expandedBookingId, setExpandedBookingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [isLoading, setIsLoading] = useState(true);

    // Generate sample bookings for demonstration
    useEffect(() => {
        // Simulating API call delay
        setTimeout(() => {
            const sampleBookings = generateSampleBookings();
            setBookings(sampleBookings);
            setFilteredBookings(sampleBookings);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Generate sample booking data
    const generateSampleBookings = () => {
        const movies = [
            {
                id: 1,
                title: 'Nhà Giả Tiền',
                poster: 'https://placehold.co/120x180/orange/white?text=Nha+Gia+Tien',
                rating: 'C13'
            },
            {
                id: 2,
                title: 'Quỷ Nhập Tràng',
                poster: 'https://placehold.co/120x180/darkred/white?text=Quy+Nhap+Trang',
                rating: 'C18'
            },
            {
                id: 3,
                title: 'Tiếng Vọng Kinh Hoàng',
                poster: 'https://placehold.co/120x180/purple/white?text=Tieng+Vong+Kinh+Hoang',
                rating: 'C16'
            },
            {
                id: 4,
                title: 'Sát Thủ Vô Cùng Cực Hại',
                poster: 'https://placehold.co/120x180/navy/white?text=Sat+Thu+Vo+Cung+Cuc+Hai',
                rating: 'C16'
            },
            {
                id: 5,
                title: 'Biệt Đội Đánh Thuê',
                poster: 'https://placehold.co/120x180/black/white?text=Biet+Doi+Danh+Thue',
                rating: 'C18'
            },
            {
                id: 6,
                title: 'Venom: Đối Mặt Tử Thù',
                poster: 'https://placehold.co/120x180/black/white?text=Venom',
                rating: 'C13'
            }
        ];

        const cinemas = [
            {
                id: 1,
                name: 'CineStar Quốc Thanh',
                address: '271 Nguyễn Trãi, Q.1, TP.HCM'
            },
            {
                id: 2,
                name: 'CineStar Hai Bà Trưng',
                address: '135 Hai Bà Trưng, Q.1, TP.HCM'
            },
            {
                id: 3,
                name: 'CineStar Gò Vấp',
                address: '340 Phan Văn Trị, Q. Gò Vấp, TP.HCM'
            }
        ];

        // Generate dates from past to future
        const dates = [
            {
                showDate: addDays(new Date(), -30),
                bookingDate: addDays(new Date(), -31),
                status: 'completed'
            },
            {
                showDate: addDays(new Date(), -15),
                bookingDate: addDays(new Date(), -18),
                status: 'completed'
            },
            {
                showDate: addDays(new Date(), -5),
                bookingDate: addDays(new Date(), -6),
                status: 'completed'
            },
            {
                showDate: addDays(new Date(), 2),
                bookingDate: addDays(new Date(), -1),
                status: 'upcoming'
            },
            {
                showDate: addDays(new Date(), 7),
                bookingDate: new Date(),
                status: 'upcoming'
            },
            {
                showDate: addDays(new Date(), 14),
                bookingDate: new Date(),
                status: 'upcoming'
            },
            {
                showDate: addDays(new Date(), -10),
                bookingDate: addDays(new Date(), -15),
                status: 'cancelled'
            }
        ];

        return dates.map((date, index) => {
            const movie = movies[Math.floor(Math.random() * movies.length)];
            const cinema = cinemas[Math.floor(Math.random() * cinemas.length)];
            const randomHour = 10 + Math.floor(Math.random() * 10); // 10 AM to 8 PM
            const seats = generateRandomSeats(
                1 + Math.floor(Math.random() * 4)
            ); // 1 to 4 seats
            const paymentMethods = [
                'Thẻ tín dụng/ghi nợ',
                'Ví điện tử',
                'Chuyển khoản ngân hàng',
                'Thanh toán tại quầy'
            ];
            const combos = [
                { id: 1, name: 'Combo Đơn', price: 85000, quantity: 1 },
                { id: 2, name: 'Combo Đôi', price: 115000, quantity: 1 },
                { id: 3, name: 'Combo Gia Đình', price: 195000, quantity: 1 }
            ];

            // Select random combos or no combo
            const hasCombo = Math.random() > 0.3; // 70% chance to have combo
            const selectedCombos = hasCombo
                ? [combos[Math.floor(Math.random() * combos.length)]]
                : [];

            // Calculate totals
            const seatsTotal = seats.reduce(
                (total, seat) => total + seat.price,
                0
            );
            const combosTotal = selectedCombos.reduce(
                (total, combo) => total + combo.price * combo.quantity,
                0
            );

            return {
                id: `BOK${10000 + index}`,
                movie,
                cinema,
                showDate: date.showDate,
                showTime: `${randomHour}:${Math.random() > 0.5 ? '30' : '00'}`,
                bookingDate: date.bookingDate,
                hall: `Phòng chiếu ${Math.floor(Math.random() * 8) + 1}`,
                seats,
                combos: selectedCombos,
                status: date.status,
                totalAmount: seatsTotal + combosTotal,
                paymentMethod:
                    paymentMethods[
                        Math.floor(Math.random() * paymentMethods.length)
                    ],
                reviewScore:
                    date.status === 'completed'
                        ? Math.floor(Math.random() * 5) + 1
                        : null
            };
        });
    };

    // Generate random seats
    const generateRandomSeats = (count) => {
        const rows = 'ABCDEFGHIJ';
        const seats = [];
        const usedPositions = new Set();

        for (let i = 0; i < count; i++) {
            let row, number;
            let position;

            // Ensure no duplicate seats
            do {
                row = rows[Math.floor(Math.random() * rows.length)];
                number = Math.floor(Math.random() * 12) + 1;
                position = `${row}${number}`;
            } while (usedPositions.has(position));

            usedPositions.add(position);

            seats.push({
                id: position,
                row,
                number,
                price: Math.random() > 0.3 ? 90000 : 120000, // Regular or VIP seat
                type: Math.random() > 0.3 ? 'Thường' : 'VIP'
            });
        }

        // Sort seats by row and number for display
        return seats.sort((a, b) => {
            if (a.row !== b.row) return a.row.localeCompare(b.row);
            return a.number - b.number;
        });
    };

    // Format date for display
    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'dd/MM/yyyy', { locale: vi });
    };

    // Format time for display
    const formatTime = (time) => {
        if (!time) return '';
        return time;
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Toggle booking details expansion
    const toggleBookingDetails = (bookingId) => {
        if (expandedBookingId === bookingId) {
            setExpandedBookingId(null);
        } else {
            setExpandedBookingId(bookingId);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Apply filters when any filter changes
    useEffect(() => {
        applyFilters();
    }, [searchTerm, statusFilter, timeFilter, sortOrder, bookings]);

    // Apply all filters and sorting
    const applyFilters = () => {
        let filtered = [...bookings];

        // Apply search filter
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(
                (booking) =>
                    booking.movie.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(
                (booking) => booking.status === statusFilter
            );
        }

        // Apply time filter
        if (timeFilter !== 'all') {
            const today = new Date();
            const weekAgo = addDays(today, -7);
            const monthAgo = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                today.getDate()
            );
            const yearAgo = new Date(
                today.getFullYear() - 1,
                today.getMonth(),
                today.getDate()
            );

            filtered = filtered.filter((booking) => {
                const bookingDate = new Date(booking.bookingDate);
                switch (timeFilter) {
                    case 'week':
                        return bookingDate >= weekAgo;
                    case 'month':
                        return bookingDate >= monthAgo;
                    case 'year':
                        return bookingDate >= yearAgo;
                    default:
                        return true;
                }
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const dateA = new Date(a.bookingDate);
            const dateB = new Date(b.bookingDate);

            if (sortOrder === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        setFilteredBookings(filtered);
    };

    // Get color for booking status
    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming':
                return 'bg-green-600';
            case 'completed':
                return 'bg-blue-600';
            case 'cancelled':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    };

    // Get text for booking status
    const getStatusText = (status) => {
        switch (status) {
            case 'upcoming':
                return 'Sắp chiếu';
            case 'completed':
                return 'Đã chiếu';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    // Get star rating display
    const renderStars = (score) => {
        if (!score) return null;

        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={`inline ${i <= score ? 'text-yellow-400' : 'text-gray-500'}`}
                />
            );
        }
        return <div className="flex items-center space-x-1">{stars}</div>;
    };

    // Handle download ticket action
    const handleDownloadTicket = (e, booking) => {
        e.stopPropagation();
        alert(
            `Chức năng tải vé ${booking.id} sẽ được hỗ trợ trong thời gian tới!`
        );
    };

    // Handle print ticket action
    const handlePrintTicket = (e, booking) => {
        e.stopPropagation();
        alert(
            `Chức năng in vé ${booking.id} sẽ được hỗ trợ trong thời gian tới!`
        );
    };

    // Handle cancel booking action
    const handleCancelBooking = (e, booking) => {
        e.stopPropagation();

        if (
            window.confirm(
                `Bạn có chắc chắn muốn hủy vé ${booking.id} không? Thao tác này không thể hoàn tác.`
            )
        ) {
            // In a real app, you would call an API here
            const updatedBookings = bookings.map((b) => {
                if (b.id === booking.id) {
                    return { ...b, status: 'cancelled' };
                }
                return b;
            });

            setBookings(updatedBookings);
            alert(
                'Đã hủy vé thành công. Tiền hoàn trả sẽ được chuyển về tài khoản của bạn trong 7 ngày làm việc.'
            );
        }
    };

    // Handle view ticket details
    const handleViewTicket = (e, booking) => {
        e.stopPropagation();
        toggleBookingDetails(booking.id);
    };

    // Count bookings by status
    const getBookingCounts = () => {
        return {
            all: bookings.length,
            upcoming: bookings.filter((b) => b.status === 'upcoming').length,
            completed: bookings.filter((b) => b.status === 'completed').length,
            cancelled: bookings.filter((b) => b.status === 'cancelled').length
        };
    };

    const counts = getBookingCounts();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-8 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-3xl font-bold flex items-center">
                                <FaHistory className="mr-3 text-yellow-400" />
                                Lịch sử đặt vé
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Quản lý và theo dõi các vé bạn đã đặt
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center">
                                <span className="text-yellow-400 font-bold text-lg mr-1">
                                    {counts.all}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    vé
                                </span>
                            </div>
                            <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center">
                                <span className="text-green-400 font-bold text-lg mr-1">
                                    {counts.upcoming}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    sắp tới
                                </span>
                            </div>
                            <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center">
                                <span className="text-blue-400 font-bold text-lg mr-1">
                                    {counts.completed}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    đã xem
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Filters and Search */}
                <div className="bg-gray-800 rounded-lg p-4 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Tìm kiếm theo tên phim hoặc mã vé..."
                                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="lg:w-48">
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="w-full appearance-none bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="all">
                                        Tất cả trạng thái
                                    </option>
                                    <option value="upcoming">Sắp chiếu</option>
                                    <option value="completed">Đã chiếu</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>
                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Time Filter */}
                        <div className="lg:w-48">
                            <div className="relative">
                                <select
                                    value={timeFilter}
                                    onChange={(e) =>
                                        setTimeFilter(e.target.value)
                                    }
                                    className="w-full appearance-none bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="all">
                                        Tất cả thời gian
                                    </option>
                                    <option value="week">Tuần này</option>
                                    <option value="month">Tháng này</option>
                                    <option value="year">Năm nay</option>
                                </select>
                                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Sort Order */}
                        <div className="lg:w-48">
                            <div className="relative">
                                <select
                                    value={sortOrder}
                                    onChange={(e) =>
                                        setSortOrder(e.target.value)
                                    }
                                    className="w-full appearance-none bg-gray-700 text-white border border-gray-600 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                                <FaRegCalendarCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filteredBookings.length === 0 ? (
                        <div className="bg-gray-800 rounded-lg py-16 px-4 text-center">
                            <div className="flex justify-center mb-4">
                                <FaTicketAlt className="text-5xl text-gray-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                Không tìm thấy vé
                            </h3>
                            <p className="text-gray-400 mb-6">
                                {searchTerm ||
                                statusFilter !== 'all' ||
                                timeFilter !== 'all'
                                    ? 'Không có vé nào phù hợp với bộ lọc.'
                                    : 'Bạn chưa đặt vé nào. Hãy đặt vé và quay lại sau.'}
                            </p>
                            <Link
                                to="/movies"
                                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
                            >
                                Đặt vé ngay
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300"
                                >
                                    {/* Booking Summary - Always visible */}
                                    <div
                                        className={`p-4 cursor-pointer hover:bg-gray-750 ${expandedBookingId === booking.id ? 'bg-gray-750' : ''}`}
                                        onClick={() =>
                                            toggleBookingDetails(booking.id)
                                        }
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Movie Poster */}
                                            <div className="mb-4 md:mb-0 md:mr-4 flex-shrink-0">
                                                <div className="relative w-24 h-36">
                                                    <img
                                                        src={
                                                            booking.movie.poster
                                                        }
                                                        alt={
                                                            booking.movie.title
                                                        }
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                    <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-80 text-xs font-bold px-1.5 py-0.5 rounded-bl">
                                                        {booking.movie.rating}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Booking Info */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white">
                                                            {
                                                                booking.movie
                                                                    .title
                                                            }
                                                        </h3>
                                                        <div className="mt-1 text-gray-400 text-sm">
                                                            Mã vé:{' '}
                                                            <span className="text-yellow-400 font-medium">
                                                                {booking.id}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`${getStatusColor(booking.status)} text-white text-xs font-bold px-2 py-1 rounded`}
                                                    >
                                                        {getStatusText(
                                                            booking.status
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                                                    <div className="flex items-center text-sm">
                                                        <FaCalendarAlt className="text-yellow-400 mr-2" />
                                                        <span>
                                                            {formatDate(
                                                                booking.showDate
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <FaClock className="text-yellow-400 mr-2" />
                                                        <span>
                                                            {formatTime(
                                                                booking.showTime
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <FaMapMarkerAlt className="text-yellow-400 mr-2" />
                                                        <span>
                                                            {
                                                                booking.cinema
                                                                    .name
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <MdEventSeat className="text-yellow-400 mr-2" />
                                                        <span>
                                                            {
                                                                booking.seats
                                                                    .length
                                                            }{' '}
                                                            ghế (
                                                            {booking.seats
                                                                .map(
                                                                    (seat) =>
                                                                        `${seat.row}${seat.number}`
                                                                )
                                                                .join(', ')}
                                                            )
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Action buttons */}
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    <button
                                                        onClick={(e) =>
                                                            handleViewTicket(
                                                                e,
                                                                booking
                                                            )
                                                        }
                                                        className="bg-purple-700 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded flex items-center transition-colors"
                                                    >
                                                        <FaEye className="mr-1" />
                                                        {expandedBookingId ===
                                                        booking.id
                                                            ? 'Ẩn chi tiết'
                                                            : 'Xem chi tiết'}
                                                    </button>

                                                    {booking.status ===
                                                        'upcoming' && (
                                                        <>
                                                            <button
                                                                onClick={(e) =>
                                                                    handleDownloadTicket(
                                                                        e,
                                                                        booking
                                                                    )
                                                                }
                                                                className="bg-blue-700 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded flex items-center transition-colors"
                                                            >
                                                                <FaDownload className="mr-1" />
                                                                Tải vé
                                                            </button>
                                                            <button
                                                                onClick={(e) =>
                                                                    handlePrintTicket(
                                                                        e,
                                                                        booking
                                                                    )
                                                                }
                                                                className="bg-green-700 hover:bg-green-600 text-white text-xs px-3 py-1 rounded flex items-center transition-colors"
                                                            >
                                                                <FaPrint className="mr-1" />
                                                                In vé
                                                            </button>
                                                            <button
                                                                onClick={(e) =>
                                                                    handleCancelBooking(
                                                                        e,
                                                                        booking
                                                                    )
                                                                }
                                                                className="bg-red-700 hover:bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center transition-colors"
                                                            >
                                                                <FaTimes className="mr-1" />
                                                                Hủy vé
                                                            </button>
                                                        </>
                                                    )}

                                                    {booking.status ===
                                                        'completed' &&
                                                        booking.reviewScore && (
                                                            <div className="flex items-center text-sm text-gray-400">
                                                                <span className="mr-1">
                                                                    Đánh giá:
                                                                </span>
                                                                {renderStars(
                                                                    booking.reviewScore
                                                                )}
                                                            </div>
                                                        )}

                                                    {booking.status ===
                                                        'completed' &&
                                                        !booking.reviewScore && (
                                                            <button className="bg-yellow-700 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded flex items-center transition-colors">
                                                                <FaStar className="mr-1" />
                                                                Đánh giá phim
                                                            </button>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Expand/Collapse icon */}
                                            <div className="hidden md:flex items-center ml-4">
                                                {expandedBookingId ===
                                                booking.id ? (
                                                    <FaChevronUp className="text-gray-400" />
                                                ) : (
                                                    <FaChevronDown className="text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    {expandedBookingId === booking.id && (
                                        <div className="bg-gray-900 border-t border-gray-700 p-4 animate-fadeIn">
                                            <div className="flex flex-col md:flex-row">
                                                {/* QR Code section */}
                                                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6 flex flex-col items-center">
                                                    <div className="bg-white p-3 rounded-lg mb-3">
                                                        <FaQrcode className="text-gray-900 text-8xl" />
                                                    </div>
                                                    <p className="text-xs text-gray-400 text-center">
                                                        Quét mã QR tại rạp để
                                                        xác thực vé
                                                    </p>

                                                    <div className="mt-6 w-full">
                                                        <h4 className="font-semibold text-yellow-400 mb-2">
                                                            Thông tin thanh toán
                                                        </h4>
                                                        <div className="bg-gray-800 rounded p-3">
                                                            <div className="flex justify-between items-center mb-2 text-sm">
                                                                <span className="text-gray-400">
                                                                    Giá vé:
                                                                </span>
                                                                <span>
                                                                    {formatCurrency(
                                                                        booking.seats.reduce(
                                                                            (
                                                                                sum,
                                                                                seat
                                                                            ) =>
                                                                                sum +
                                                                                seat.price,
                                                                            0
                                                                        )
                                                                    )}
                                                                </span>
                                                            </div>

                                                            {booking.combos
                                                                .length > 0 && (
                                                                <div className="flex justify-between items-center mb-2 text-sm">
                                                                    <span className="text-gray-400">
                                                                        Combo:
                                                                    </span>
                                                                    <span>
                                                                        {formatCurrency(
                                                                            booking.combos.reduce(
                                                                                (
                                                                                    sum,
                                                                                    combo
                                                                                ) =>
                                                                                    sum +
                                                                                    combo.price *
                                                                                        combo.quantity,
                                                                                0
                                                                            )
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div className="border-t border-gray-700 my-2"></div>

                                                            <div className="flex justify-between items-center font-semibold">
                                                                <span>
                                                                    Tổng cộng:
                                                                </span>
                                                                <span className="text-yellow-400">
                                                                    {formatCurrency(
                                                                        booking.totalAmount
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div className="mt-2 text-xs text-gray-500">
                                                                {
                                                                    booking.paymentMethod
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Details section */}
                                                <div className="md:w-2/3 md:border-l md:border-gray-700 md:pl-6">
                                                    <h4 className="font-semibold text-yellow-400 mb-3">
                                                        Chi tiết vé
                                                    </h4>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="text-sm text-gray-400">
                                                                Rạp chiếu
                                                            </div>
                                                            <div className="font-medium">
                                                                {
                                                                    booking
                                                                        .cinema
                                                                        .name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    booking
                                                                        .cinema
                                                                        .address
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <div className="text-sm text-gray-400">
                                                                    Phòng chiếu
                                                                </div>
                                                                <div className="font-medium">
                                                                    {
                                                                        booking.hall
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-400">
                                                                    Ngày đặt
                                                                </div>
                                                                <div className="font-medium">
                                                                    {formatDate(
                                                                        booking.bookingDate
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="text-sm text-gray-400">
                                                                Ghế
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mt-1">
                                                                {booking.seats.map(
                                                                    (seat) => (
                                                                        <div
                                                                            key={
                                                                                seat.id
                                                                            }
                                                                            className={`px-2 py-1 rounded text-sm font-medium ${
                                                                                seat.type ===
                                                                                'VIP'
                                                                                    ? 'bg-yellow-900 text-yellow-300'
                                                                                    : 'bg-blue-900 text-blue-300'
                                                                            }`}
                                                                        >
                                                                            {
                                                                                seat.row
                                                                            }
                                                                            {
                                                                                seat.number
                                                                            }{' '}
                                                                            (
                                                                            {
                                                                                seat.type
                                                                            }
                                                                            )
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>

                                                        {booking.combos.length >
                                                            0 && (
                                                            <div>
                                                                <div className="text-sm text-gray-400">
                                                                    Combo
                                                                </div>
                                                                <ul className="mt-1">
                                                                    {booking.combos.map(
                                                                        (
                                                                            combo
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    combo.id
                                                                                }
                                                                                className="flex justify-between text-sm py-1"
                                                                            >
                                                                                <span>
                                                                                    {
                                                                                        combo.name
                                                                                    }{' '}
                                                                                    x
                                                                                    {
                                                                                        combo.quantity
                                                                                    }
                                                                                </span>
                                                                                <span>
                                                                                    {formatCurrency(
                                                                                        combo.price *
                                                                                            combo.quantity
                                                                                    )}
                                                                                </span>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {booking.status ===
                                                            'upcoming' && (
                                                            <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-yellow-500 mt-4">
                                                                <h5 className="font-medium mb-1 text-yellow-400">
                                                                    Lưu ý:
                                                                </h5>
                                                                <ul className="text-sm text-gray-300 space-y-1">
                                                                    <li>
                                                                        • Vui
                                                                        lòng đến
                                                                        trước
                                                                        giờ
                                                                        chiếu
                                                                        15-30
                                                                        phút
                                                                    </li>
                                                                    <li>
                                                                        • Xuất
                                                                        trình mã
                                                                        QR hoặc
                                                                        mã vé
                                                                        khi vào
                                                                        rạp
                                                                    </li>
                                                                    <li>
                                                                        • Vé đã
                                                                        mua
                                                                        không
                                                                        thể hoàn
                                                                        lại tiền
                                                                    </li>
                                                                    {booking.status ===
                                                                        'upcoming' && (
                                                                        <li>
                                                                            • Có
                                                                            thể
                                                                            hủy
                                                                            vé
                                                                            trước
                                                                            giờ
                                                                            chiếu
                                                                            24
                                                                            giờ
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {booking.status ===
                                                            'cancelled' && (
                                                            <div className="bg-red-900 bg-opacity-30 p-3 rounded-lg border-l-4 border-red-500 mt-4">
                                                                <h5 className="font-medium mb-1 text-red-400">
                                                                    Thông tin
                                                                    hủy vé:
                                                                </h5>
                                                                <p className="text-sm text-gray-300">
                                                                    Vé này đã
                                                                    được hủy.
                                                                    Hoàn tiền sẽ
                                                                    được xử lý
                                                                    trong vòng 7
                                                                    ngày làm
                                                                    việc.
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in;
                }
            `}</style>
        </div>
    );
};

export default BookingHistory;
