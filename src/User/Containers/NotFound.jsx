import React, { useEffect } from 'react';

const NotFound = () => {
    useEffect(() => {
        document.title = '404 - Không tìm thấy trang';
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-800 p-4">
            <div className="max-w-md text-center">
                <div className="text-8xl animate-bounce mb-6">🧑‍🚀</div>
                <h1 className="text-6xl font-bold text-indigo-600 mb-2">404</h1>
                <h2 className="text-2xl font-semibold mb-4">
                    Ôi không! Trang không tồn tại
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Có vẻ như bạn đã đi lạc vào một không gian không tồn tại.
                    Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc
                    chưa bao giờ tồn tại.
                </p>
                <button
                    onClick={() => (window.location.href = '/')}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 transform transition duration-300 hover:-translate-y-1"
                >
                    Quay về Trang chủ
                </button>

                <div className="mt-6 flex justify-center space-x-6">
                    <a
                        href="/sitemap"
                        className="text-indigo-600 hover:underline"
                    >
                        Bản đồ site
                    </a>
                    <a
                        href="/contact"
                        className="text-indigo-600 hover:underline"
                    >
                        Liên hệ hỗ trợ
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
