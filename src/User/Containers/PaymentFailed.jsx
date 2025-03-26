import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import {
    FaTimes,
    FaExclamationTriangle,
    FaArrowLeft,
    FaPhoneAlt,
    FaRedo,
    FaCreditCard,
    FaInfoCircle,
    FaHeadset,
    FaTicketAlt,
    FaRegQuestionCircle
} from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';

const PaymentFailed = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // In a real app, these would come from the payment process
    const errorData = location.state?.errorData || {
        errorCode: 'ERR_PAYMENT_05',
        errorMessage: 'Giao dịch thất bại',
        transactionId:
            'TX' +
            Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, '0'),
        paymentMethod: 'Thẻ tín dụng/ghi nợ',
        timestamp: new Date().toLocaleString('vi-VN'),
        movie: {
            title: 'Sát Thủ Vô Cùng Cực Hại',
            time: '19:30',
            date: '28/03/2025'
        },
        possibleReasons: [
            'Thẻ không đủ số dư',
            'Thông tin thẻ không chính xác',
            'Ngân hàng từ chối giao dịch',
            'Quá thời gian xử lý giao dịch',
            'Lỗi kết nối mạng'
        ]
    };

    // Check if user is navigating directly to this page
    useEffect(() => {
        if (!location.state && import.meta.env.MODE !== 'development') {
            navigate('/');
        }
    }, [location, navigate]);

    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

    // Countdown timer to indicate session expiry
    useEffect(() => {
        if (timeRemaining <= 0) return;

        const timer = setTimeout(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRemaining]);

    // Format time remaining as MM:SS
    const formatTimeRemaining = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle retry payment button
    const handleRetryPayment = () => {
        // In a real app, this would take you back to the payment page
        // For now, let's simulate by going back
        navigate(-1);
    };

    // Common payment issues and their solutions
    const troubleshootingTips = [
        {
            issue: 'Thẻ bị từ chối',
            solution:
                'Kiểm tra số dư và hạn mức thẻ. Liên hệ ngân hàng nếu thẻ đang bị khóa.'
        },
        {
            issue: 'Lỗi nhập thông tin',
            solution:
                'Đảm bảo nhập đúng số thẻ, tên chủ thẻ, ngày hết hạn và mã CVV.'
        },
        {
            issue: 'Lỗi kết nối',
            solution:
                'Kiểm tra kết nối internet và thử lại. Có thể chuyển sang mạng khác.'
        },
        {
            issue: 'Hệ thống thanh toán bảo trì',
            solution:
                'Vui lòng đợi vài phút và thử lại hoặc chọn phương thức thanh toán khác.'
        }
    ];

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

            {/* Error Banner */}
            <div className="bg-gradient-to-r from-red-900 to-red-700 py-8 px-4">
                <div className="container mx-auto text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-white bg-opacity-20 rounded-full p-3">
                            <FaTimes className="text-3xl text-red-300" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        Thanh toán thất bại
                    </h1>
                    <p className="text-lg text-gray-200 mb-2">
                        Rất tiếc, giao dịch của bạn không thể hoàn tất
                    </p>
                    <div className="inline-block bg-red-800 bg-opacity-70 rounded-lg px-4 py-1 text-sm">
                        Mã lỗi: {errorData.errorCode}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Session Expiration Warning */}
                    <div className="bg-yellow-800 bg-opacity-30 rounded-lg p-4 mb-8 border-l-4 border-yellow-500 flex items-center justify-between animate-pulse">
                        <div className="flex items-center">
                            <FaExclamationTriangle className="text-yellow-400 mr-3 text-xl flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-yellow-300">
                                    Phiên đặt vé của bạn sẽ hết hạn sau:
                                </h3>
                                <p className="text-gray-200 text-sm">
                                    Vui lòng thử lại trước khi hết thời gian để
                                    giữ ghế đã chọn
                                </p>
                            </div>
                        </div>
                        <div className="bg-yellow-900 px-3 py-1 rounded text-xl font-mono font-bold text-yellow-300">
                            {formatTimeRemaining()}
                        </div>
                    </div>

                    {/* Error Information Card */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8 animate-fadeInUp">
                        {/* Error Header */}
                        <div className="bg-gradient-to-r from-red-800 to-red-700 px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <FaInfoCircle className="text-white text-xl mr-2" />
                                <h2 className="text-xl font-bold">
                                    Thông tin lỗi
                                </h2>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-sm">
                                    Mã giao dịch: {errorData.transactionId}
                                </div>
                                <div className="text-xs text-gray-300">
                                    {errorData.timestamp}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Transaction Details */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-yellow-400">
                                    Chi tiết giao dịch
                                </h3>
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="flex flex-wrap -mx-2">
                                        <div className="w-full md:w-1/2 px-2 mb-3">
                                            <div className="text-sm text-gray-400">
                                                Phim
                                            </div>
                                            <div className="font-medium">
                                                {errorData.movie.title}
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 px-2 mb-3">
                                            <div className="text-sm text-gray-400">
                                                Suất chiếu
                                            </div>
                                            <div className="font-medium">
                                                {errorData.movie.time} •{' '}
                                                {errorData.movie.date}
                                            </div>
                                        </div>
                                        <div className="w-full px-2">
                                            <div className="text-sm text-gray-400">
                                                Phương thức thanh toán
                                            </div>
                                            <div className="font-medium">
                                                {errorData.paymentMethod}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Possible Reasons */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-yellow-400 flex items-center">
                                    <FaRegQuestionCircle className="mr-2" />
                                    Nguyên nhân có thể
                                </h3>
                                <ul className="bg-gray-900 rounded-lg p-4 space-y-2">
                                    {errorData.possibleReasons.map(
                                        (reason, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                                                <span>{reason}</span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            {/* Troubleshooting Tips */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-yellow-400 flex items-center">
                                    <FaHeadset className="mr-2" />
                                    Mẹo khắc phục
                                </h3>
                                <div className="bg-gray-900 rounded-lg p-4">
                                    <div className="space-y-3">
                                        {troubleshootingTips.map(
                                            (tip, index) => (
                                                <div
                                                    key={index}
                                                    className="border-b border-gray-700 pb-3 last:border-0 last:pb-0"
                                                >
                                                    <div className="font-medium text-white">
                                                        {tip.issue}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {tip.solution}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={handleRetryPayment}
                                    className="flex-1 flex items-center justify-center bg-yellow-600 hover:bg-yellow-500 text-white py-3 px-4 rounded-lg transition-colors font-bold"
                                >
                                    <IoMdRefresh className="mr-2 text-xl" />
                                    Thử lại thanh toán
                                </button>

                                <button
                                    onClick={() => navigate('/payment-options')}
                                    className="flex-1 flex items-center justify-center bg-purple-700 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition-colors"
                                >
                                    <FaCreditCard className="mr-2" />
                                    Đổi phương thức
                                </button>

                                <Link
                                    to="/"
                                    className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors"
                                >
                                    <FaArrowLeft className="mr-2" />
                                    Quay lại
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Support Options */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div
                            className="bg-gray-800 rounded-lg p-5 animate-fadeInUp"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-900 rounded-full p-3 mr-4">
                                    <FaPhoneAlt className="text-purple-300" />
                                </div>
                                <h3 className="font-bold text-lg">
                                    Hỗ trợ trực tiếp
                                </h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Gặp khó khăn khi thanh toán? Liên hệ với đội ngũ
                                hỗ trợ của chúng tôi.
                            </p>
                            <div className="mb-2">
                                <div className="text-sm text-gray-400">
                                    Hotline:
                                </div>
                                <div className="font-bold text-yellow-400 text-lg">
                                    1900 0000
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">
                                    Email:
                                </div>
                                <div className="text-yellow-400">
                                    support@cinestar.vn
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-gray-800 rounded-lg p-5 animate-fadeInUp"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-indigo-900 rounded-full p-3 mr-4">
                                    <FaTicketAlt className="text-indigo-300" />
                                </div>
                                <h3 className="font-bold text-lg">
                                    Kiểm tra đặt vé
                                </h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Trong một số trường hợp, thanh toán có thể thành
                                công nhưng không nhận được xác nhận.
                            </p>
                            <Link
                                to="/booking-history"
                                className="block w-full bg-indigo-700 hover:bg-indigo-600 text-white py-3 rounded-lg text-center transition-colors"
                            >
                                Kiểm tra lịch sử đặt vé
                            </Link>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div
                        className="bg-gray-800 rounded-lg p-6 mb-8 animate-fadeInUp"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <h3 className="font-bold text-lg mb-4 text-center">
                            Câu hỏi thường gặp
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-yellow-400 mb-1">
                                    Tôi đã bị trừ tiền nhưng không nhận được vé?
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    Trong một số trường hợp, có thể mất tới 24
                                    giờ để khoản tiền được hoàn lại. Vui lòng
                                    kiểm tra email hoặc lịch sử đặt vé của bạn.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-yellow-400 mb-1">
                                    Tôi có bị mất ghế đã chọn không?
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    Ghế sẽ được giữ trong 10 phút. Sau thời gian
                                    này, ghế sẽ được mở lại cho người dùng khác.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-yellow-400 mb-1">
                                    Tôi có thể thanh toán bằng phương thức khác
                                    không?
                                </h4>
                                <p className="text-gray-300 text-sm">
                                    Có, bạn có thể thử lại với các phương thức
                                    thanh toán khác như ví điện tử, chuyển khoản
                                    ngân hàng hoặc thanh toán tại quầy.
                                </p>
                            </div>
                        </div>
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

            {/* Add animations */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default PaymentFailed;
