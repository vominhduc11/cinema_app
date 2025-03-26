import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
            <div className="text-center">
                {/* Logo & Icon */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <div className="text-gray-800 opacity-10 text-9xl font-bold">
                            404
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FaExclamationTriangle className="text-yellow-500 text-6xl" />
                        </div>
                    </div>

                    <BiCameraMovie className="text-yellow-500 text-5xl mb-3" />
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Trang không tồn tại
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-md">
                        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã
                        bị di chuyển.
                    </p>
                </div>

                {/* Các trang gợi ý */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg mx-auto">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Bạn có thể thử truy cập:
                    </h2>
                    <ul className="space-y-3 text-left">
                        <li>
                            <Link
                                to="/admin"
                                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                <FaHome className="mr-2" />
                                Dashboard quản trị
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/movies"
                                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                <BiCameraMovie className="mr-2" />
                                Quản lý phim
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/users"
                                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                <FaHome className="mr-2" />
                                Quản lý người dùng
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/tickets"
                                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                <FaHome className="mr-2" />
                                Quản lý vé
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Nút quay lại */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/admin"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    >
                        <FaHome className="mr-2" />
                        Quay lại Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                        <FaArrowLeft className="mr-2" />
                        Quay lại trang trước
                    </button>
                </div>
            </div>

            {/* Film reel decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-800 flex overflow-hidden">
                {[...Array(30)].map((_, index) => (
                    <div
                        key={index}
                        className="h-6 w-6 bg-yellow-500 mx-2 rounded-full opacity-30"
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default NotFound;
