import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import {
    FaQrcode,
    FaTicketAlt,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaClock,
    FaChair,
    FaUtensils,
    FaCheck,
    FaDownload,
    FaPrint,
    FaHome,
    FaShareAlt
} from 'react-icons/fa';
import { MdConfirmationNumber } from 'react-icons/md';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);

    // In a real app, these would come from the payment process
    // Using dummy data based on the Detail component structure
    const ticketData = location.state?.ticketData || {
        ticketId:
            'TIX' +
            Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, '0'),
        movie: {
            title: 'Sát Thủ Vô Cùng Cực Hại',
            posterUrl:
                'https://placehold.co/600x900/orange/white?text=Movie+Poster',
            rating: 'C16',
            duration: '118 phút'
        },
        cinema: {
            name: 'CineStar Quốc Thanh',
            address: '271 Nguyễn Trãi, Q.1, TP.HCM'
        },
        showtime: {
            date: '28/03/2025',
            time: '19:30',
            hall: 'Phòng chiếu 05'
        },
        seats: [
            { id: 'G10', row: 'G', number: 10, price: 90000 },
            { id: 'G11', row: 'G', number: 11, price: 90000 }
        ],
        combos: [
            {
                id: 1,
                name: 'Combo Đôi',
                description: '1 bắp lớn + 2 nước lớn',
                price: 115000,
                quantity: 1
            }
        ],
        totalAmount: 295000,
        paymentMethod: 'Thẻ tín dụng/ghi nợ',
        transactionTime: new Date().toLocaleString('vi-VN')
    };

    // Check if user is navigating directly to this page
    useEffect(() => {
        // Nếu người dùng truy cập trực tiếp mà không có state, chuyển hướng về trang chủ
        if (!location.state && window.location.hostname !== 'localhost') {
            navigate('/');
        }
    }, [location, navigate]);

    // Launch confetti effect on page load
    useEffect(() => {
        if (showConfetti) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = {
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 0
            };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    setShowConfetti(false);
                    return;
                }

                const particleCount = 50 * (timeLeft / duration);

                // Launch confetti from random positions
                confetti({
                    ...defaults,
                    particleCount,
                    origin: {
                        x: randomInRange(0.1, 0.3),
                        y: Math.random() - 0.2
                    }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: {
                        x: randomInRange(0.7, 0.9),
                        y: Math.random() - 0.2
                    }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [showConfetti]);

    // Calculate ticket totals
    const getSeatsTotal = () => {
        return ticketData.seats.reduce((total, seat) => total + seat.price, 0);
    };

    const getCombosTotal = () => {
        return ticketData.combos.reduce(
            (total, combo) => total + combo.price * combo.quantity,
            0
        );
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Fake download ticket function
    const downloadTicket = () => {
        alert('Tính năng tải vé sẽ được cập nhật trong phiên bản tới!');
    };

    // Fake print ticket function
    const printTicket = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="flex items-center transition-transform duration-300 hover:scale-105">
                                <BiCameraMovie className="text-yellow-300 text-4xl" />
                                <span className="ml-2 text-white font-bold text-xl">
                                    CineStar
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Success Banner */}
            <div className="bg-gradient-to-r from-green-900 to-emerald-800 py-8 px-4">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-white bg-opacity-20 rounded-full p-3">
                            <FaCheck className="text-3xl text-green-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Thanh toán thành công!
                    </h1>
                    <p className="text-lg text-gray-200">
                        Cảm ơn bạn đã đặt vé xem phim tại CineStar
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Ticket Information Card */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8 animate-fadeInUp">
                        {/* Ticket Header */}
                        <div className="bg-gradient-to-r from-purple-800 to-indigo-700 px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <MdConfirmationNumber className="text-yellow-300 text-2xl mr-2" />
                                <h2 className="text-xl font-bold">
                                    Thông tin vé
                                </h2>
                            </div>
                            <div className="text-right">
                                <div className="text-yellow-300 font-bold">
                                    {ticketData.ticketId}
                                </div>
                                <div className="text-xs text-gray-300">
                                    {ticketData.transactionTime}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex">
                            {/* Left Column - Movie Info */}
                            <div className="md:w-1/3 p-6 bg-gray-900">
                                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                                    <img
                                        src={ticketData.movie.posterUrl}
                                        alt={ticketData.movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-lg text-yellow-300 mb-1">
                                    {ticketData.movie.title}
                                </h3>
                                <p className="text-sm text-gray-400 mb-2">
                                    {ticketData.movie.duration} •{' '}
                                    {ticketData.movie.rating}
                                </p>

                                {/* QR Code */}
                                <div className="mt-4 bg-white p-2 rounded-lg flex flex-col items-center">
                                    <FaQrcode className="text-gray-900 text-8xl mb-2" />
                                    <p className="text-xs text-gray-900 font-medium">
                                        Quét mã QR để xác thực vé
                                    </p>
                                </div>
                            </div>

                            {/* Right Column - Ticket Details */}
                            <div className="md:w-2/3 p-6">
                                <div className="mb-6">
                                    <div className="flex items-start mb-1">
                                        <FaMapMarkerAlt className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold">
                                                {ticketData.cinema.name}
                                            </h4>
                                            <p className="text-sm text-gray-400">
                                                {ticketData.cinema.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-2 mb-6">
                                    <div className="w-1/2 px-2 mb-4">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="text-yellow-400 mr-2" />
                                            <div>
                                                <div className="text-sm text-gray-400">
                                                    Ngày
                                                </div>
                                                <div>
                                                    {ticketData.showtime.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-2 mb-4">
                                        <div className="flex items-center">
                                            <FaClock className="text-yellow-400 mr-2" />
                                            <div>
                                                <div className="text-sm text-gray-400">
                                                    Giờ
                                                </div>
                                                <div>
                                                    {ticketData.showtime.time} •{' '}
                                                    {ticketData.showtime.hall}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <div className="flex items-center">
                                            <FaChair className="text-yellow-400 mr-2" />
                                            <div>
                                                <div className="text-sm text-gray-400">
                                                    Ghế
                                                </div>
                                                <div>
                                                    {ticketData.seats
                                                        .map(
                                                            (seat) =>
                                                                `${seat.row}${seat.number}`
                                                        )
                                                        .join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-2">
                                        <div className="flex items-center">
                                            <FaTicketAlt className="text-yellow-400 mr-2" />
                                            <div>
                                                <div className="text-sm text-gray-400">
                                                    Loại vé
                                                </div>
                                                <div>
                                                    {ticketData.seats.length} Vé
                                                    2D
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Combo Information */}
                                {ticketData.combos.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex items-center mb-2">
                                            <FaUtensils className="text-yellow-400 mr-2" />
                                            <h4 className="font-bold">
                                                Combo đã chọn
                                            </h4>
                                        </div>
                                        <ul className="text-sm">
                                            {ticketData.combos.map((combo) => (
                                                <li
                                                    key={combo.id}
                                                    className="flex justify-between items-center py-1 border-b border-gray-700"
                                                >
                                                    <span>
                                                        {combo.name} x
                                                        {combo.quantity}
                                                    </span>
                                                    <span className="text-yellow-300">
                                                        {formatCurrency(
                                                            combo.price *
                                                                combo.quantity
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Payment Summary */}
                                <div className="border-t border-gray-700 pt-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-gray-400">
                                            Vé:
                                        </span>
                                        <span>
                                            {formatCurrency(getSeatsTotal())}
                                        </span>
                                    </div>
                                    {getCombosTotal() > 0 && (
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-400">
                                                Combo:
                                            </span>
                                            <span>
                                                {formatCurrency(
                                                    getCombosTotal()
                                                )}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between pt-2 border-t border-gray-700 mt-2">
                                        <span className="font-bold">
                                            Tổng cộng:
                                        </span>
                                        <span className="font-bold text-yellow-300">
                                            {formatCurrency(
                                                ticketData.totalAmount
                                            )}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs text-right text-gray-400">
                                        Thanh toán qua{' '}
                                        {ticketData.paymentMethod}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Actions */}
                        <div className="bg-gray-900 p-4 flex flex-wrap gap-2">
                            <button
                                onClick={downloadTicket}
                                className="flex-1 flex items-center justify-center bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded transition-colors"
                            >
                                <FaDownload className="mr-2" />
                                Tải vé
                            </button>
                            <button
                                onClick={printTicket}
                                className="flex-1 flex items-center justify-center bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                            >
                                <FaPrint className="mr-2" />
                                In vé
                            </button>
                            <button className="flex-1 flex items-center justify-center bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors">
                                <FaShareAlt className="mr-2" />
                                Chia sẻ
                            </button>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div
                        className="bg-yellow-900 bg-opacity-30 rounded-lg p-5 mb-8 border-l-4 border-yellow-500 animate-fadeInUp"
                        style={{ animationDelay: '0.2s' }}
                    >
                        <h3 className="font-bold text-yellow-400 mb-2">
                            Lưu ý quan trọng:
                        </h3>
                        <ul className="text-sm text-gray-200 space-y-2">
                            <li>
                                • Vui lòng đến rạp trước giờ chiếu ít nhất 15-30
                                phút.
                            </li>
                            <li>
                                • Xuất trình mã QR hoặc mã vé điện tử khi vào
                                rạp.
                            </li>
                            <li>
                                • Bạn có thể nhận combo đã đặt tại quầy bắp nước
                                của rạp.
                            </li>
                            <li>
                                • Mỗi vé chỉ có giá trị sử dụng một lần cho đúng
                                suất chiếu đã chọn.
                            </li>
                            <li>
                                • Không hoàn/đổi vé sau khi thanh toán thành
                                công.
                            </li>
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div
                        className="flex flex-wrap justify-center gap-4 animate-fadeInUp"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <Link
                            to="/"
                            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors min-w-[200px]"
                        >
                            <FaHome className="mr-2" />
                            Trang chủ
                        </Link>
                        <Link
                            to="/movies"
                            className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-lg transition-colors min-w-[200px]"
                        >
                            <BiCameraMovie className="mr-2" />
                            Xem phim khác
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 mt-12 py-6 px-4 text-center text-gray-400 text-sm">
                <p>© 2025 CineStar. Tất cả quyền được bảo lưu.</p>
                <p className="mt-1">
                    Nếu bạn cần hỗ trợ, vui lòng gọi hotline:{' '}
                    <span className="text-yellow-400">1900 0000</span>
                </p>
            </div>

            {/* Add custom styles for printing */}
            <style type="text/css" media="print">{`
                @page { size: portrait; }
                body { background-color: white !important; color: black !important; }
                .bg-gradient-to-r, .bg-gray-800, .bg-gray-900 { background: white !important; }
                .text-white, .text-gray-200, .text-gray-300, .text-gray-400 { color: black !important; }
                .text-yellow-300, .text-yellow-400 { color: #b45309 !important; }
                .container { max-width: 100% !important; }
                button, .animate-fadeInUp[style], footer, header { display: none !important; }
            `}</style>
        </div>
    );
};

export default PaymentSuccess;
