import React from 'react';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaRegCopyright
} from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { SiZalo } from 'react-icons/si';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <BiCameraMovie className="text-yellow-300 text-4xl" />
                            <span className="ml-2 text-white font-bold text-xl">
                                CineStar
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            CineStar là hệ thống rạp chiếu phim hàng đầu Việt
                            Nam với công nghệ hiện đại, âm thanh sống động và
                            dịch vụ chất lượng, mang đến trải nghiệm điện ảnh
                            tuyệt vời.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            <a
                                href="#"
                                className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
                            >
                                <FaFacebookF className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                            >
                                <FaTwitter className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 transition-colors duration-300"
                            >
                                <FaInstagram className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300"
                            >
                                <FaYoutube className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                            >
                                <SiZalo className="text-white" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300"
                            >
                                <FaTiktok className="text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4 pb-2 border-b border-gray-700">
                            Liên kết nhanh
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Phim đang
                                    chiếu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Phim sắp
                                    chiếu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Lịch chiếu
                                    phim
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Khuyến mãi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Tin tức điện
                                    ảnh
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Hỏi đáp
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 flex items-center"
                                >
                                    <span className="mr-2">›</span> Quy định &
                                    Điều khoản
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4 pb-2 border-b border-gray-700">
                            Thông tin liên hệ
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-yellow-300 mt-1 mr-3 flex-shrink-0" />
                                <span>
                                    Tầng 5, TTTM Platinum Plaza, 68 Nguyễn Huệ,
                                    Q1, TP.HCM
                                </span>
                            </li>
                            <li className="flex items-center">
                                <FaPhoneAlt className="text-yellow-300 mr-3 flex-shrink-0" />
                                <span>Hotline: 1900 2929</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="text-yellow-300 mr-3 flex-shrink-0" />
                                <span>support@cinestar.vn</span>
                            </li>
                        </ul>
                        <div className="mt-4">
                            <h4 className="text-white text-base font-semibold mb-2">
                                Phương thức thanh toán
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                    <img
                                        src="/api/placeholder/48/32"
                                        alt="Visa"
                                        className="max-h-6"
                                    />
                                </div>
                                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                    <img
                                        src="/api/placeholder/48/32"
                                        alt="Mastercard"
                                        className="max-h-6"
                                    />
                                </div>
                                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                    <img
                                        src="/api/placeholder/48/32"
                                        alt="JCB"
                                        className="max-h-6"
                                    />
                                </div>
                                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                    <img
                                        src="/api/placeholder/48/32"
                                        alt="ATM"
                                        className="max-h-6"
                                    />
                                </div>
                                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                    <img
                                        src="/api/placeholder/48/32"
                                        alt="Momo"
                                        className="max-h-6"
                                    />
                                </div>
                                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                                    <img
                                        src="/api/placeholder/48/32"
                                        alt="ZaloPay"
                                        className="max-h-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4 pb-2 border-b border-gray-700">
                            Đăng ký nhận tin
                        </h3>
                        <p className="text-sm mb-4">
                            Nhận thông tin mới nhất về phim hay và khuyến mãi
                            đặc biệt.
                        </p>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                                />
                            </div>
                            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                                Đăng ký
                            </button>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-white text-base font-semibold mb-2">
                                Tải ứng dụng
                            </h4>
                            <div className="flex space-x-2">
                                <a href="#" className="flex-1">
                                    <img
                                        src="/api/placeholder/120/40"
                                        alt="App Store"
                                        className="w-full h-auto rounded"
                                    />
                                </a>
                                <a href="#" className="flex-1">
                                    <img
                                        src="/api/placeholder/120/40"
                                        alt="Google Play"
                                        className="w-full h-auto rounded"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-950 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                            <FaRegCopyright className="mr-2 text-sm" />
                            <p className="text-sm">
                                {currentYear} CineStar. Tất cả các quyền được
                                bảo lưu.
                            </p>
                        </div>
                        <div>
                            <ul className="flex space-x-4 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-yellow-300 transition-colors duration-300"
                                    >
                                        Chính sách bảo mật
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-yellow-300 transition-colors duration-300"
                                    >
                                        Điều khoản sử dụng
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-yellow-300 transition-colors duration-300"
                                    >
                                        Quy định
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
