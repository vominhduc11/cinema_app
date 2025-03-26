import React, { useState } from 'react';

// Giả lập FaStar từ react-icons/fa
const FaStar = ({ className, size, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            width={size || 16}
            height={size || 16}
            fill={color || 'currentColor'}
            className={className}
        >
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
        </svg>
    );
};

function ReviewSection() {
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [showMoreReviewsModal, setShowMoreReviewsModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // Mock data for additional reviews
    const additionalReviews = [
        {
            id: 5,
            user: 'Người dùng 5',
            avatar: 'E',
            rating: 5,
            comment:
                'Phim rất xuất sắc, diễn biến hấp dẫn từ đầu đến cuối. Khuyên mọi người nên xem!'
        },
        {
            id: 6,
            user: 'Người dùng 6',
            avatar: 'F',
            rating: 3,
            comment:
                'Phim có cốt truyện khá thú vị nhưng diễn xuất của một số diễn viên phụ còn hạn chế.'
        },
        {
            id: 7,
            user: 'Người dùng 7',
            avatar: 'G',
            rating: 4,
            comment:
                'Âm nhạc và hình ảnh tuyệt vời. Cốt truyện hơi khó hiểu ở một số đoạn nhưng nhìn chung vẫn là một bộ phim đáng xem.'
        },
        {
            id: 8,
            user: 'Người dùng 8',
            avatar: 'H',
            rating: 5,
            comment:
                'Một kiệt tác! Từ kịch bản, diễn xuất đến hiệu ứng hình ảnh đều hoàn hảo. Đây là một trong những bộ phim hay nhất mà tôi từng xem.'
        }
    ];

    // Existing reviews
    const existingReviews = [1, 2, 3, 4].map((id) => ({
        id,
        user: `Người dùng ${id}`,
        avatar: String.fromCharCode(64 + id),
        rating: 4,
        comment:
            'Một bộ phim hay, diễn xuất tốt và cốt truyện hấp dẫn. Tôi đặc biệt thích những cảnh hành động và hiệu ứng hình ảnh. Khuyên mọi người nên xem.'
    }));

    const handleSubmitReview = (e) => {
        e.preventDefault();
        // Xử lý logic gửi đánh giá
        alert(`Đã gửi đánh giá: ${rating} sao - "${reviewText}"`);
        setShowWriteReviewModal(false);
        setRating(0);
        setReviewText('');
    };

    // Component Modal viết đánh giá
    const WriteReviewModal = () => (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                        Viết đánh giá
                    </h3>
                    <button
                        onClick={() => setShowWriteReviewModal(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">
                            Đánh giá của bạn
                        </label>
                        <div className="flex mb-2">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label
                                        key={index}
                                        className="cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="rating"
                                            className="hidden"
                                            value={ratingValue}
                                            onClick={() =>
                                                setRating(ratingValue)
                                            }
                                        />
                                        <FaStar
                                            className="w-8 h-8 mr-1"
                                            color={
                                                ratingValue <= (hover || rating)
                                                    ? '#FBBF24'
                                                    : '#4B5563'
                                            }
                                            onMouseEnter={() =>
                                                setHover(ratingValue)
                                            }
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="review"
                            className="block text-gray-300 mb-2"
                        >
                            Nội dung đánh giá
                        </label>
                        <textarea
                            id="review"
                            rows="4"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Chia sẻ suy nghĩ của bạn về bộ phim..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-300 hover:text-white mr-2"
                            onClick={() => setShowWriteReviewModal(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Gửi đánh giá
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // Component Modal xem thêm đánh giá
    const MoreReviewsModal = () => (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center overflow-hidden">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 my-4 h-auto max-h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-800 z-10">
                    <h3 className="text-xl font-bold text-white">
                        Tất cả đánh giá
                    </h3>
                    <button
                        onClick={() => setShowMoreReviewsModal(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div
                    className="overflow-y-auto pr-1 flex-grow"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#4a5568 #2d3748'
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            ...existingReviews,
                            ...additionalReviews,
                            // Thêm nhiều đánh giá hơn để kiểm tra thanh cuộn
                            ...Array(10)
                                .fill(0)
                                .map((_, i) => ({
                                    id: i + 9,
                                    user: `Người dùng ${i + 9}`,
                                    avatar: String.fromCharCode(73 + i),
                                    rating: Math.floor(Math.random() * 5) + 1,
                                    comment:
                                        'Bộ phim có nhiều điểm đáng chú ý, tôi đặc biệt ấn tượng với kỹ xảo và diễn xuất. Âm nhạc cũng rất phù hợp với không khí của phim.'
                                }))
                        ].map((review) => (
                            <div
                                key={review.id}
                                className="bg-gray-700 rounded-lg p-4"
                            >
                                <div className="flex items-start mb-3">
                                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">
                                            {review.user}
                                        </h4>
                                        <div className="flex items-center text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={
                                                        i < review.rating
                                                            ? 'text-yellow-500'
                                                            : 'text-gray-600'
                                                    }
                                                    size={14}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-12 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Đánh giá từ khán giả
                    </h2>
                    <button
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => setShowWriteReviewModal(true)}
                    >
                        Viết đánh giá
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {existingReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-gray-800 rounded-lg p-4"
                        >
                            <div className="flex items-start mb-3">
                                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    {review.avatar}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">
                                        {review.user}
                                    </h4>
                                    <div className="flex items-center text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={
                                                    i < review.rating
                                                        ? 'text-yellow-500'
                                                        : 'text-gray-600'
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-300">{review.comment}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                        onClick={() => setShowMoreReviewsModal(true)}
                    >
                        Xem thêm đánh giá
                    </button>
                </div>
            </div>

            {/* Render modals */}
            {showWriteReviewModal && <WriteReviewModal />}
            {showMoreReviewsModal && <MoreReviewsModal />}
        </section>
    );
}

export default ReviewSection;
