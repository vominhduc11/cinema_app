import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaArrowLeft,
    FaSave,
    FaTimes,
    FaUpload,
    FaYoutube,
    FaGlobe,
    FaCalendarAlt,
    FaClock,
    FaUsers,
    FaStar,
    FaFilm,
    FaMoneyBillWave,
    FaLanguage,
    FaCheck,
    FaPlus,
    FaMinus,
    FaImage,
    FaInfoCircle,
    FaExclamationTriangle
} from 'react-icons/fa';

// Component chính để thêm phim mới
const MoviesAdd = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('basic');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // State chứa dữ liệu form
    const [movieData, setMovieData] = useState({
        title: '',
        original_title: '',
        director: '',
        actors: '',
        genre: [],
        duration: '',
        release_date: '',
        country: '',
        language: '',
        age_rating: '',
        status: 'Sắp chiếu',

        short_description: '',
        description: '',
        trailer_url: '',

        poster: null,
        poster_preview: '',
        gallery: [],
        gallery_previews: [],

        featured: false,
        awards: '',
        rating: '',
        studio: '',

        base_price: '',
        start_date: '',
        end_date: ''
    });

    // State chứa lỗi validation
    const [errors, setErrors] = useState({});

    // Danh sách các thể loại phim
    const genreOptions = [
        'Hành động',
        'Phiêu lưu',
        'Hoạt hình',
        'Hài',
        'Tội phạm',
        'Tài liệu',
        'Chính kịch',
        'Gia đình',
        'Giả tưởng',
        'Lịch sử',
        'Kinh dị',
        'Nhạc',
        'Bí ẩn',
        'Lãng mạn',
        'Khoa học viễn tưởng',
        'Giật gân',
        'Chiến tranh',
        'Cao bồi'
    ];

    // Danh sách trạng thái phim
    const statusOptions = ['Sắp chiếu', 'Đang chiếu', 'Ngừng chiếu'];

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setMovieData({
                ...movieData,
                [name]: checked
            });
        } else {
            setMovieData({
                ...movieData,
                [name]: value
            });
        }

        // Xóa lỗi khi người dùng bắt đầu chỉnh sửa trường đó
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Xử lý thay đổi thể loại phim
    const handleGenreChange = (genre) => {
        if (movieData.genre.includes(genre)) {
            setMovieData({
                ...movieData,
                genre: movieData.genre.filter((g) => g !== genre)
            });
        } else {
            setMovieData({
                ...movieData,
                genre: [...movieData.genre, genre]
            });
        }

        // Xóa lỗi nếu đã chọn ít nhất một thể loại
        if (errors.genre && movieData.genre.length > 0) {
            setErrors({
                ...errors,
                genre: null
            });
        }
    };

    // Xử lý tải lên poster
    const handlePosterUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Trong ứng dụng thực tế, bạn sẽ gửi file lên server
            // Ở đây chúng ta chỉ tạo một URL tạm thời để xem trước
            const previewUrl = URL.createObjectURL(file);

            setMovieData({
                ...movieData,
                poster: file,
                poster_preview: previewUrl
            });

            if (errors.poster) {
                setErrors({
                    ...errors,
                    poster: null
                });
            }
        }
    };

    // Xử lý tải lên gallery
    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Tạo preview URLs cho gallery
            const newPreviews = files.map((file) => URL.createObjectURL(file));

            setMovieData({
                ...movieData,
                gallery: [...movieData.gallery, ...files],
                gallery_previews: [
                    ...movieData.gallery_previews,
                    ...newPreviews
                ]
            });
        }
    };

    // Xóa một ảnh khỏi gallery
    const handleRemoveGalleryImage = (index) => {
        const newGallery = [...movieData.gallery];
        const newPreviews = [...movieData.gallery_previews];

        newGallery.splice(index, 1);
        newPreviews.splice(index, 1);

        setMovieData({
            ...movieData,
            gallery: newGallery,
            gallery_previews: newPreviews
        });
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Validate các trường bắt buộc
        if (!movieData.title.trim()) newErrors.title = 'Vui lòng nhập tên phim';
        if (!movieData.original_title.trim())
            newErrors.original_title = 'Vui lòng nhập tên phim gốc';
        if (!movieData.director.trim())
            newErrors.director = 'Vui lòng nhập tên đạo diễn';
        if (!movieData.actors.trim())
            newErrors.actors = 'Vui lòng nhập tên diễn viên';
        if (movieData.genre.length === 0)
            newErrors.genre = 'Vui lòng chọn ít nhất một thể loại';
        if (!movieData.duration)
            newErrors.duration = 'Vui lòng nhập thời lượng phim';
        if (!movieData.release_date)
            newErrors.release_date = 'Vui lòng chọn ngày phát hành';
        if (!movieData.country.trim())
            newErrors.country = 'Vui lòng nhập quốc gia sản xuất';
        if (!movieData.language.trim())
            newErrors.language = 'Vui lòng nhập ngôn ngữ';
        if (!movieData.short_description.trim())
            newErrors.short_description = 'Vui lòng nhập mô tả ngắn';
        if (!movieData.description.trim())
            newErrors.description = 'Vui lòng nhập nội dung chi tiết';
        if (!movieData.poster && !movieData.poster_preview)
            newErrors.poster = 'Vui lòng tải lên poster phim';

        // Validate format (có thể thêm các validation phức tạp hơn nếu cần)
        if (movieData.duration && isNaN(movieData.duration)) {
            newErrors.duration = 'Thời lượng phải là số';
        }

        if (
            movieData.trailer_url &&
            !isValidYoutubeUrl(movieData.trailer_url)
        ) {
            newErrors.trailer_url =
                'URL trailer không hợp lệ (phải là YouTube URL)';
        }

        if (
            movieData.rating &&
            (isNaN(movieData.rating) ||
                movieData.rating < 0 ||
                movieData.rating > 10)
        ) {
            newErrors.rating = 'Đánh giá phải là số từ 0 đến 10';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Kiểm tra URL YouTube hợp lệ (đơn giản)
    const isValidYoutubeUrl = (url) => {
        if (!url) return true; // Cho phép trống
        const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
        return pattern.test(url);
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            // Chuyển đến tab có lỗi đầu tiên
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                if (
                    [
                        'title',
                        'original_title',
                        'director',
                        'actors',
                        'genre',
                        'duration',
                        'release_date',
                        'country',
                        'language',
                        'age_rating',
                        'status'
                    ].includes(firstError)
                ) {
                    setActiveTab('basic');
                } else if (
                    [
                        'short_description',
                        'description',
                        'trailer_url'
                    ].includes(firstError)
                ) {
                    setActiveTab('content');
                } else if (['poster', 'gallery'].includes(firstError)) {
                    setActiveTab('media');
                } else if (
                    ['featured', 'awards', 'rating', 'studio'].includes(
                        firstError
                    )
                ) {
                    setActiveTab('additional');
                } else if (
                    ['base_price', 'start_date', 'end_date'].includes(
                        firstError
                    )
                ) {
                    setActiveTab('pricing');
                }
            }
            return;
        }

        // Giả lập quá trình gửi dữ liệu
        setIsSubmitting(true);

        try {
            // Mô phỏng việc gọi API
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mô phỏng thành công
            setShowSuccess(true);

            // Tự động chuyển hướng sau khi thành công
            setTimeout(() => {
                navigate('/admin/movies');
            }, 2000);
        } catch (error) {
            console.error('Error adding movie:', error);
            // Xử lý lỗi ở đây
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Link
                        to="/admin/movies"
                        className="text-gray-600 hover:text-indigo-600 mr-4"
                    >
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Thêm Phim Mới
                    </h1>
                </div>

                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/movies')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 flex items-center"
                        disabled={isSubmitting}
                    >
                        <FaTimes className="mr-2" />
                        Hủy
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <FaSave className="mr-2" />
                                Lưu phim
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Success message */}
            {showSuccess && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex">
                        <FaCheck className="text-green-500 mt-0.5 mr-3" />
                        <div>
                            <p className="text-green-700 font-medium">
                                Thêm phim thành công!
                            </p>
                            <p className="text-green-600 text-sm">
                                Đang chuyển hướng về trang danh sách phim...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`py-4 px-1 ${
                            activeTab === 'basic'
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } font-medium text-sm focus:outline-none`}
                    >
                        Thông tin cơ bản
                    </button>

                    <button
                        onClick={() => setActiveTab('content')}
                        className={`py-4 px-1 ${
                            activeTab === 'content'
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } font-medium text-sm focus:outline-none`}
                    >
                        Nội dung & Mô tả
                    </button>

                    <button
                        onClick={() => setActiveTab('media')}
                        className={`py-4 px-1 ${
                            activeTab === 'media'
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } font-medium text-sm focus:outline-none`}
                    >
                        Hình ảnh & Media
                    </button>

                    <button
                        onClick={() => setActiveTab('additional')}
                        className={`py-4 px-1 ${
                            activeTab === 'additional'
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } font-medium text-sm focus:outline-none`}
                    >
                        Thông tin thêm
                    </button>

                    <button
                        onClick={() => setActiveTab('pricing')}
                        className={`py-4 px-1 ${
                            activeTab === 'pricing'
                                ? 'border-b-2 border-indigo-500 text-indigo-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } font-medium text-sm focus:outline-none`}
                    >
                        Giá vé & Lịch chiếu
                    </button>
                </nav>
            </div>

            {/* Form content */}
            <form>
                {/* Tab: Thông tin cơ bản */}
                {activeTab === 'basic' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tên phim */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên phim (Tiếng Việt){' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={movieData.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.title
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên phim bằng tiếng Việt"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Tên phim gốc */}
                            <div>
                                <label
                                    htmlFor="original_title"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tên phim gốc{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="original_title"
                                    name="original_title"
                                    value={movieData.original_title}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.original_title
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên phim gốc (tiếng Anh hoặc ngôn ngữ gốc)"
                                />
                                {errors.original_title && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.original_title}
                                    </p>
                                )}
                            </div>

                            {/* Đạo diễn */}
                            <div>
                                <label
                                    htmlFor="director"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Đạo diễn{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="director"
                                    name="director"
                                    value={movieData.director}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.director
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên đạo diễn"
                                />
                                {errors.director && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.director}
                                    </p>
                                )}
                            </div>

                            {/* Diễn viên */}
                            <div>
                                <label
                                    htmlFor="actors"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Diễn viên{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="actors"
                                    name="actors"
                                    value={movieData.actors}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.actors
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập tên các diễn viên chính, cách nhau bằng dấu phẩy"
                                />
                                {errors.actors && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.actors}
                                    </p>
                                )}
                            </div>

                            {/* Thể loại */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thể loại{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div
                                    className={`p-3 border ${
                                        errors.genre
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm bg-white`}
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {genreOptions.map((genre) => (
                                            <div
                                                key={genre}
                                                onClick={() =>
                                                    handleGenreChange(genre)
                                                }
                                                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                                                    movieData.genre.includes(
                                                        genre
                                                    )
                                                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                                        : 'bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200'
                                                }`}
                                            >
                                                {genre}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {movieData.genre.length > 0 && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        Đã chọn: {movieData.genre.join(', ')}
                                    </p>
                                )}
                                {errors.genre && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.genre}
                                    </p>
                                )}
                            </div>

                            {/* Thời lượng */}
                            <div>
                                <label
                                    htmlFor="duration"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Thời lượng (phút){' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaClock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={movieData.duration}
                                        onChange={handleInputChange}
                                        min="1"
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.duration
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Nhập thời lượng phim (phút)"
                                    />
                                </div>
                                {errors.duration && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.duration}
                                    </p>
                                )}
                            </div>

                            {/* Ngày phát hành */}
                            <div>
                                <label
                                    htmlFor="release_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày phát hành{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        id="release_date"
                                        name="release_date"
                                        value={movieData.release_date}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.release_date
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                </div>
                                {errors.release_date && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.release_date}
                                    </p>
                                )}
                            </div>

                            {/* Quốc gia */}
                            <div>
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Quốc gia sản xuất{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaGlobe className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        value={movieData.country}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.country
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Ví dụ: Mỹ, Hàn Quốc, Việt Nam..."
                                    />
                                </div>
                                {errors.country && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.country}
                                    </p>
                                )}
                            </div>

                            {/* Ngôn ngữ */}
                            <div>
                                <label
                                    htmlFor="language"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngôn ngữ{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLanguage className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="language"
                                        name="language"
                                        value={movieData.language}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.language
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Ví dụ: Tiếng Anh, Tiếng Hàn, Tiếng Việt..."
                                    />
                                </div>
                                {errors.language && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.language}
                                    </p>
                                )}
                            </div>

                            {/* Giới hạn độ tuổi */}
                            <div>
                                <label
                                    htmlFor="age_rating"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Giới hạn độ tuổi
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUsers className="text-gray-400" />
                                    </div>
                                    <select
                                        id="age_rating"
                                        name="age_rating"
                                        value={movieData.age_rating}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.age_rating
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                        <option value="">
                                            Chọn giới hạn độ tuổi
                                        </option>
                                        <option value="P">
                                            P - Phim dành cho mọi đối tượng
                                        </option>
                                        <option value="C13">
                                            C13 - Phim cấm khán giả dưới 13 tuổi
                                        </option>
                                        <option value="C16">
                                            C16 - Phim cấm khán giả dưới 16 tuổi
                                        </option>
                                        <option value="C18">
                                            C18 - Phim cấm khán giả dưới 18 tuổi
                                        </option>
                                    </select>
                                </div>
                                {errors.age_rating && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.age_rating}
                                    </p>
                                )}
                            </div>

                            {/* Trạng thái */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Trạng thái{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaFilm className="text-gray-400" />
                                    </div>
                                    <select
                                        id="status"
                                        name="status"
                                        value={movieData.status}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.status
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Nội dung & Mô tả */}
                {activeTab === 'content' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                            {/* Mô tả ngắn */}
                            <div>
                                <label
                                    htmlFor="short_description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Mô tả ngắn{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="short_description"
                                    name="short_description"
                                    value={movieData.short_description}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.short_description
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập mô tả ngắn gọn về phim (hiển thị ở danh sách phim)"
                                />
                                {errors.short_description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.short_description}
                                    </p>
                                )}
                            </div>

                            {/* Nội dung chi tiết */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nội dung chi tiết{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={movieData.description}
                                    onChange={handleInputChange}
                                    rows="6"
                                    className={`w-full px-3 py-2 border ${
                                        errors.description
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Nhập nội dung chi tiết về phim"
                                ></textarea>
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Trailer URL */}
                            <div>
                                <label
                                    htmlFor="trailer_url"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    URL Trailer (YouTube)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaYoutube className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="trailer_url"
                                        name="trailer_url"
                                        value={movieData.trailer_url}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.trailer_url
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Ví dụ: https://www.youtube.com/watch?v=abcdefg"
                                    />
                                </div>
                                {errors.trailer_url && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.trailer_url}
                                    </p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    Nhập liên kết YouTube đến trailer của phim
                                    (nếu có)
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Hình ảnh & Media */}
                {activeTab === 'media' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                            {/* Poster */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Poster phim{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2 flex flex-col md:flex-row items-start md:items-center gap-4">
                                    {/* Poster preview */}
                                    {movieData.poster_preview ? (
                                        <div className="relative">
                                            <img
                                                src={movieData.poster_preview}
                                                alt="Poster preview"
                                                className="w-40 h-60 object-cover rounded-lg border border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMovieData({
                                                        ...movieData,
                                                        poster: null,
                                                        poster_preview: ''
                                                    })
                                                }
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-40 h-60 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                                            <FaImage className="text-gray-400 text-4xl mb-2" />
                                            <span className="text-gray-500 text-sm text-center px-2">
                                                Chưa có poster
                                            </span>
                                        </div>
                                    )}

                                    {/* Upload button */}
                                    <div>
                                        <div>
                                            <label
                                                htmlFor="poster-upload"
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer flex items-center"
                                            >
                                                <FaUpload className="mr-2" />
                                                {movieData.poster_preview
                                                    ? 'Thay đổi poster'
                                                    : 'Tải lên poster'}
                                                <input
                                                    id="poster-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={
                                                        handlePosterUpload
                                                    }
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Định dạng PNG, JPG. Kích thước tối
                                            đa 5MB.
                                            <br />
                                            Kích thước khuyến nghị: 500x750
                                            pixels.
                                        </p>
                                    </div>
                                </div>
                                {errors.poster && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.poster}
                                    </p>
                                )}
                            </div>

                            {/* Gallery */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thư viện ảnh
                                </label>

                                {/* Gallery preview */}
                                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {/* Upload button */}
                                    <div>
                                        <label
                                            htmlFor="gallery-upload"
                                            className="w-full h-32 flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                                        >
                                            <FaPlus className="text-gray-400 text-xl mb-1" />
                                            <span className="text-gray-500 text-sm text-center px-2">
                                                Thêm ảnh
                                            </span>
                                            <input
                                                id="gallery-upload"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleGalleryUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    {/* Gallery images */}
                                    {movieData.gallery_previews.map(
                                        (preview, index) => (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                <img
                                                    src={preview}
                                                    alt={`Gallery image ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveGalleryImage(
                                                            index
                                                        )
                                                    }
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>

                                <p className="mt-2 text-sm text-gray-500">
                                    Tải lên các hình ảnh bổ sung về phim. Định
                                    dạng PNG, JPG. Tối đa 10 ảnh.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Thông tin thêm */}
                {activeTab === 'additional' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                            {/* Featured */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="featured"
                                        name="featured"
                                        type="checkbox"
                                        checked={movieData.featured}
                                        onChange={handleInputChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="featured"
                                        className="font-medium text-gray-700"
                                    >
                                        Đặt làm phim nổi bật
                                    </label>
                                    <p className="text-gray-500">
                                        Phim sẽ được hiển thị trên banner trang
                                        chủ và trong danh sách phim nổi bật
                                    </p>
                                </div>
                            </div>

                            {/* Giải thưởng */}
                            <div>
                                <label
                                    htmlFor="awards"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Giải thưởng
                                </label>
                                <input
                                    type="text"
                                    id="awards"
                                    name="awards"
                                    value={movieData.awards}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Nhập các giải thưởng của phim (nếu có)"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Ví dụ: Oscar, Cannes, Golden Globe...
                                </p>
                            </div>

                            {/* Đánh giá */}
                            <div>
                                <label
                                    htmlFor="rating"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Đánh giá IMDb
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaStar className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        value={movieData.rating}
                                        onChange={handleInputChange}
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        className={`w-full pl-10 px-3 py-2 border ${
                                            errors.rating
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Nhập điểm đánh giá từ IMDb (0-10)"
                                    />
                                </div>
                                {errors.rating && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.rating}
                                    </p>
                                )}
                            </div>

                            {/* Studio */}
                            <div>
                                <label
                                    htmlFor="studio"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Hãng sản xuất
                                </label>
                                <input
                                    type="text"
                                    id="studio"
                                    name="studio"
                                    value={movieData.studio}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Nhập tên hãng sản xuất phim"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Ví dụ: Warner Bros, Marvel Studios,
                                    Disney...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Giá vé & Lịch chiếu */}
                {activeTab === 'pricing' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                            {/* Thông báo */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                <div className="flex">
                                    <FaInfoCircle className="text-yellow-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-yellow-700">
                                            Thông tin về giá vé và lịch chiếu có
                                            thể được điều chỉnh sau. Bạn có thể
                                            quản lý chi tiết lịch chiếu trong
                                            mục "Lịch chiếu" sau khi thêm phim.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Giá vé cơ bản */}
                            <div>
                                <label
                                    htmlFor="base_price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Giá vé cơ bản (VNĐ)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaMoneyBillWave className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        id="base_price"
                                        name="base_price"
                                        value={movieData.base_price}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Nhập giá vé cơ bản"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Giá vé cơ bản cho phim này. Giá có thể thay
                                    đổi theo rạp, suất chiếu, loại ghế...
                                </p>
                            </div>

                            {/* Ngày bắt đầu chiếu */}
                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày bắt đầu chiếu
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        value={movieData.start_date}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* Ngày kết thúc chiếu */}
                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ngày kết thúc chiếu
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        id="end_date"
                                        name="end_date"
                                        value={movieData.end_date}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Actions (bottom) */}
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/movies')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 flex items-center"
                        disabled={isSubmitting}
                    >
                        <FaTimes className="mr-2" />
                        Hủy
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Đang lưu...
                            </>
                        ) : (
                            <>
                                <FaSave className="mr-2" />
                                Lưu phim
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MoviesAdd;
