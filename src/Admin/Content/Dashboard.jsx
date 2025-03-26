import React, { useState, useEffect } from 'react';
import {
    FaUsers,
    FaTicketAlt,
    FaMoneyBillWave,
    FaFilm,
    FaCalendarAlt,
    FaChartBar,
    FaEye,
    FaArrowUp,
    FaArrowDown,
    FaExclamationTriangle,
    FaSync,
    FaUserCheck,
    FaEnvelope,
    FaClock,
    FaEllipsisH
} from 'react-icons/fa';

// Dữ liệu mẫu cho biểu đồ
const revenueData = [
    { month: 'T1', revenue: 150000000 },
    { month: 'T2', revenue: 180000000 },
    { month: 'T3', revenue: 210000000 },
    { month: 'T4', revenue: 240000000 },
    { month: 'T5', revenue: 200000000 },
    { month: 'T6', revenue: 220000000 },
    { month: 'T7', revenue: 250000000 },
    { month: 'T8', revenue: 275000000 },
    { month: 'T9', revenue: 260000000 },
    { month: 'T10', revenue: 290000000 },
    { month: 'T11', revenue: 320000000 },
    { month: 'T12', revenue: 380000000 }
];

// Dữ liệu mẫu cho danh sách phim phổ biến
const topMovies = [
    {
        id: 1,
        title: 'Biệt Đội Siêu Anh Hùng',
        tickets: 1245,
        revenue: 248000000,
        change: 5
    },
    {
        id: 2,
        title: 'Sát Thủ Vô Cùng Cực Hại',
        tickets: 1120,
        revenue: 224000000,
        change: 8
    },
    {
        id: 3,
        title: 'Nhà Giả Tiền',
        tickets: 980,
        revenue: 196000000,
        change: -2
    },
    {
        id: 4,
        title: 'Quỷ Nhập Tràng',
        tickets: 870,
        revenue: 174000000,
        change: -5
    },
    {
        id: 5,
        title: 'Tiếng Vọng Kinh Hoàng',
        tickets: 750,
        revenue: 150000000,
        change: 3
    }
];

// Dữ liệu mẫu cho danh sách rạp hàng đầu
const topTheaters = [
    { id: 1, name: 'CineStar Quận 1', tickets: 3560, revenue: 712000000 },
    { id: 2, name: 'CineStar Quận 7', tickets: 3120, revenue: 624000000 },
    { id: 3, name: 'CineStar Gò Vấp', tickets: 2870, revenue: 574000000 },
    { id: 4, name: 'CineStar Thủ Đức', tickets: 2350, revenue: 470000000 }
];

// Dữ liệu mẫu cho hoạt động gần đây
const recentActivities = [
    {
        id: 1,
        type: 'user',
        content: 'Nguyễn Văn A đã đăng ký tài khoản mới',
        time: '5 phút trước'
    },
    {
        id: 2,
        type: 'ticket',
        content: 'Đã bán 50 vé cho phim "Biệt Đội Siêu Anh Hùng"',
        time: '15 phút trước'
    },
    {
        id: 3,
        type: 'system',
        content: 'Cập nhật giá vé cho suất chiếu sớm',
        time: '1 giờ trước'
    },
    {
        id: 4,
        type: 'movie',
        content: 'Phim mới "Hành Trình Kỳ Diệu" đã được thêm vào hệ thống',
        time: '2 giờ trước'
    },
    {
        id: 5,
        type: 'payment',
        content: 'Hoàn tiền cho khách hàng Trần Văn B',
        time: '3 giờ trước'
    },
    {
        id: 6,
        type: 'user',
        content: 'Lê Thị C đã nâng cấp lên thành viên VIP',
        time: '4 giờ trước'
    }
];

// Component Dashboard chính
const Dashboard = () => {
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    // Giả lập việc tải dữ liệu
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDataLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Hàm tạo biểu diễn tiền tệ Việt Nam
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Hàm lấy biểu tượng cho hoạt động gần đây
    const getActivityIcon = (type) => {
        switch (type) {
            case 'user':
                return <FaUserCheck className="text-blue-400" />;
            case 'ticket':
                return <FaTicketAlt className="text-green-400" />;
            case 'system':
                return <FaSync className="text-yellow-400" />;
            case 'movie':
                return <FaFilm className="text-purple-400" />;
            case 'payment':
                return <FaMoneyBillWave className="text-red-400" />;
            default:
                return <FaClock className="text-gray-400" />;
        }
    };

    // Xử lý thay đổi thời kỳ báo cáo
    const handlePeriodChange = (period) => {
        setIsDataLoading(true);
        setSelectedPeriod(period);

        // Giả lập việc tải dữ liệu mới
        setTimeout(() => {
            setIsDataLoading(false);
        }, 800);
    };

    return (
        <div className="p-6">
            {/* Tiêu đề trang và bộ lọc */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard
                    </h1>
                    <p className="text-gray-500">
                        Xem tổng quan về hoạt động hệ thống CineStar
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center">
                    <span className="text-gray-600 mr-2">Thời gian:</span>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 inline-flex">
                        <button
                            onClick={() => handlePeriodChange('today')}
                            className={`px-3 py-1.5 text-sm font-medium ${selectedPeriod === 'today' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'} rounded-l-lg transition-colors`}
                        >
                            Hôm nay
                        </button>
                        <button
                            onClick={() => handlePeriodChange('week')}
                            className={`px-3 py-1.5 text-sm font-medium ${selectedPeriod === 'week' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'} border-l border-r border-gray-200 transition-colors`}
                        >
                            Tuần này
                        </button>
                        <button
                            onClick={() => handlePeriodChange('month')}
                            className={`px-3 py-1.5 text-sm font-medium ${selectedPeriod === 'month' ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'} rounded-r-lg transition-colors`}
                        >
                            Tháng này
                        </button>
                    </div>

                    <button className="ml-2 p-2 bg-white text-gray-600 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
                        <FaSync
                            className={`${isDataLoading ? 'animate-spin' : ''}`}
                        />
                    </button>
                </div>
            </div>

            {/* Thẻ thống kê tổng quan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Thẻ Doanh thu */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Tổng doanh thu
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                2.57 Tỷ
                            </h3>
                            <div className="flex items-center mt-2">
                                <span className="text-green-500 text-sm font-medium flex items-center">
                                    <FaArrowUp className="mr-1" /> 12.5%
                                </span>
                                <span className="text-gray-400 text-xs ml-2">
                                    so với kỳ trước
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-indigo-100 rounded-lg">
                            <FaMoneyBillWave className="text-indigo-600 text-xl" />
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full mt-4">
                        <div
                            className="h-1 bg-indigo-600 rounded-full"
                            style={{ width: '75%' }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        75% mục tiêu tháng
                    </div>
                </div>

                {/* Thẻ Vé đã bán */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">Vé đã bán</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                12,845
                            </h3>
                            <div className="flex items-center mt-2">
                                <span className="text-green-500 text-sm font-medium flex items-center">
                                    <FaArrowUp className="mr-1" /> 8.3%
                                </span>
                                <span className="text-gray-400 text-xs ml-2">
                                    so với kỳ trước
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <FaTicketAlt className="text-blue-600 text-xl" />
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full mt-4">
                        <div
                            className="h-1 bg-blue-600 rounded-full"
                            style={{ width: '68%' }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        68% mục tiêu tháng
                    </div>
                </div>

                {/* Thẻ Người dùng mới */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Người dùng mới
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                1,254
                            </h3>
                            <div className="flex items-center mt-2">
                                <span className="text-red-500 text-sm font-medium flex items-center">
                                    <FaArrowDown className="mr-1" /> 4.2%
                                </span>
                                <span className="text-gray-400 text-xs ml-2">
                                    so với kỳ trước
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-green-100 rounded-lg">
                            <FaUsers className="text-green-600 text-xl" />
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full mt-4">
                        <div
                            className="h-1 bg-green-600 rounded-full"
                            style={{ width: '45%' }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        45% mục tiêu tháng
                    </div>
                </div>

                {/* Thẻ Suất chiếu */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Số suất chiếu
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">
                                325
                            </h3>
                            <div className="flex items-center mt-2">
                                <span className="text-green-500 text-sm font-medium flex items-center">
                                    <FaArrowUp className="mr-1" /> 10.8%
                                </span>
                                <span className="text-gray-400 text-xs ml-2">
                                    so với kỳ trước
                                </span>
                            </div>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <FaCalendarAlt className="text-purple-600 text-xl" />
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full mt-4">
                        <div
                            className="h-1 bg-purple-600 rounded-full"
                            style={{ width: '82%' }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        82% mục tiêu tháng
                    </div>
                </div>
            </div>

            {/* Biểu đồ Doanh thu */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">
                                Doanh thu theo tháng
                            </h3>
                            <select className="bg-gray-100 text-gray-800 text-sm rounded-lg p-2 border-none">
                                <option>2025</option>
                                <option>2024</option>
                                <option>2023</option>
                            </select>
                        </div>

                        {/* Biểu đồ doanh thu */}
                        <div className="h-72 w-full">
                            <div className="flex h-full items-end">
                                {revenueData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 flex flex-col items-center"
                                    >
                                        <div
                                            className="w-full mx-1 bg-indigo-500 hover:bg-indigo-600 rounded-t"
                                            style={{
                                                height: `${Math.round((item.revenue / 380000000) * 100)}%`,
                                                maxWidth: '30px',
                                                margin: '0 auto'
                                            }}
                                        ></div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            {item.month}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thống kê nhanh */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Thống kê nhanh
                        </h3>

                        <div className="space-y-6">
                            {/* Thống kê chi tiết - Tổng lượt xem */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-600 text-sm">
                                        Tổng lượt xem
                                    </p>
                                    <span className="text-sm font-medium text-gray-800">
                                        86.2K
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-blue-500 rounded-full"
                                        style={{ width: '78%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">
                                        Mục tiêu: 110K
                                    </span>
                                    <span className="text-xs text-blue-500">
                                        78%
                                    </span>
                                </div>
                            </div>

                            {/* Thống kê chi tiết - Tỷ lệ đặt vé */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-600 text-sm">
                                        Tỷ lệ đặt vé
                                    </p>
                                    <span className="text-sm font-medium text-gray-800">
                                        24.5%
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-green-500 rounded-full"
                                        style={{ width: '65%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">
                                        Mục tiêu: 38%
                                    </span>
                                    <span className="text-xs text-green-500">
                                        65%
                                    </span>
                                </div>
                            </div>

                            {/* Thống kê chi tiết - Tỷ lệ ghế trống */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-600 text-sm">
                                        Tỷ lệ ghế trống
                                    </p>
                                    <span className="text-sm font-medium text-gray-800">
                                        18.7%
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-yellow-500 rounded-full"
                                        style={{ width: '85%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">
                                        Mục tiêu dưới: 22%
                                    </span>
                                    <span className="text-xs text-yellow-500">
                                        85%
                                    </span>
                                </div>
                            </div>

                            {/* Thống kê chi tiết - Hủy vé */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-600 text-sm">
                                        Tỷ lệ hủy vé
                                    </p>
                                    <span className="text-sm font-medium text-gray-800">
                                        2.4%
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-red-500 rounded-full"
                                        style={{ width: '40%' }}
                                    ></div>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">
                                        Mục tiêu dưới: 6%
                                    </span>
                                    <span className="text-xs text-green-500">
                                        Tốt
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bảng phim phổ biến và hoạt động gần đây */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Bảng phim phổ biến */}
                <div className="lg:col-span-7 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">
                                Phim phổ biến
                            </h3>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Xem tất cả
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phim
                                        </th>
                                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vé bán
                                        </th>
                                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Doanh thu
                                        </th>
                                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thay đổi
                                        </th>
                                        <th className="py-3 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topMovies.map((movie, index) => (
                                        <tr
                                            key={movie.id}
                                            className={
                                                index !== topMovies.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : ''
                                            }
                                        >
                                            <td className="py-4 px-3 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {movie.title}
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {movie.tickets.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatCurrency(
                                                        movie.revenue
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 whitespace-nowrap">
                                                <div
                                                    className={`text-sm flex items-center ${movie.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                                                >
                                                    {movie.change >= 0 ? (
                                                        <FaArrowUp className="mr-1" />
                                                    ) : (
                                                        <FaArrowDown className="mr-1" />
                                                    )}
                                                    {Math.abs(movie.change)}%
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 whitespace-nowrap text-right">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <FaEllipsisH />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Hoạt động gần đây */}
                <div className="lg:col-span-5 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">
                                Hoạt động gần đây
                            </h3>
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                                Xem tất cả
                            </button>
                        </div>

                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex">
                                    <div className="mr-4 mt-1">
                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-800">
                                            {activity.content}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Rạp hàng đầu và thông báo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bảng rạp hàng đầu */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">
                                Rạp hàng đầu
                            </h3>
                            <select className="bg-gray-100 text-gray-800 text-sm rounded-lg p-2 border-none">
                                <option>Theo doanh thu</option>
                                <option>Theo lượng vé</option>
                                <option>Theo đánh giá</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rạp
                                        </th>
                                        <th className="py-3 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vé bán
                                        </th>
                                        <th className="py-3 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Doanh thu
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topTheaters.map((theater, index) => (
                                        <tr
                                            key={theater.id}
                                            className={
                                                index !== topTheaters.length - 1
                                                    ? 'border-b border-gray-200'
                                                    : ''
                                            }
                                        >
                                            <td className="py-4 px-3 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {theater.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 whitespace-nowrap text-right">
                                                <div className="text-sm text-gray-900">
                                                    {theater.tickets.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 whitespace-nowrap text-right">
                                                <div className="text-sm text-gray-900">
                                                    {formatCurrency(
                                                        theater.revenue
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Thông báo hệ thống */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Thông báo hệ thống
                        </h3>

                        <div className="space-y-4">
                            {/* Thông báo bảo trì */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Bảo trì hệ thống đặt vé dự kiến vào
                                            ngày 28/03/2025 từ 02:00 - 04:00.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Thông báo khác */}
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaEye className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            Có 5 phim mới đang chờ được phê
                                            duyệt. Vui lòng kiểm tra mục Quản lý
                                            phim.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Thông báo khác */}
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaEnvelope className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">
                                            Chiến dịch email marketing "Khuyến
                                            mãi tháng 3" đã được gửi thành công
                                            đến 15,687 khách hàng.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
