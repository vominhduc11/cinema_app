import React, { useState, useEffect } from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaStar,
    FaFilter,
    FaSort,
    FaChevronDown,
    FaChevronUp,
    FaSync,
    FaClock,
    FaCalendarAlt,
    FaCheck,
    FaTimes,
    FaPlay,
    FaFileExport,
    FaFileImport,
    FaEllipsisV
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Dữ liệu mẫu về danh sách phim
const sampleMoviesData = [
    {
        id: 1,
        title: 'Biệt Đội Siêu Anh Hùng',
        original_title: 'The Avengers',
        poster: '/path-to-poster-1.jpg',
        genre: 'Hành động, Viễn tưởng',
        duration: 143,
        release_date: '15/04/2025',
        director: 'Joss Whedon',
        rating: 8.5,
        status: 'Đang chiếu',
        featured: true,
        views: 24680,
        tickets_sold: 1245
    },
    {
        id: 2,
        title: 'Sát Thủ Vô Cùng Cực Hại',
        original_title: 'The Extremely Wicked Assassin',
        poster: '/path-to-poster-2.jpg',
        genre: 'Hài, Hành động',
        duration: 118,
        release_date: '20/03/2025',
        director: 'David Leitch',
        rating: 7.8,
        status: 'Đang chiếu',
        featured: true,
        views: 19870,
        tickets_sold: 1120
    },
    {
        id: 3,
        title: 'Nhà Giả Tiền',
        original_title: 'Money Maker',
        poster: '/path-to-poster-3.jpg',
        genre: 'Hài, Gia đình',
        duration: 125,
        release_date: '05/03/2025',
        director: 'Adam McKay',
        rating: 7.2,
        status: 'Đang chiếu',
        featured: false,
        views: 15640,
        tickets_sold: 980
    },
    {
        id: 4,
        title: 'Quỷ Nhập Tràng',
        original_title: 'Demon Inside',
        poster: '/path-to-poster-4.jpg',
        genre: 'Kinh dị',
        duration: 110,
        release_date: '10/02/2025',
        director: 'James Wan',
        rating: 6.9,
        status: 'Đang chiếu',
        featured: false,
        views: 14520,
        tickets_sold: 870
    },
    {
        id: 5,
        title: 'Tiếng Vọng Kinh Hoàng',
        original_title: 'Echo of Fear',
        poster: '/path-to-poster-5.jpg',
        genre: 'Kinh dị, Giật gân',
        duration: 105,
        release_date: '25/01/2025',
        director: 'Mike Flanagan',
        rating: 6.7,
        status: 'Đang chiếu',
        featured: false,
        views: 12350,
        tickets_sold: 750
    },
    {
        id: 6,
        title: 'Hành Trình Kỳ Diệu',
        original_title: 'Wonderful Journey',
        poster: '/path-to-poster-6.jpg',
        genre: 'Phiêu lưu, Gia đình',
        duration: 135,
        release_date: '30/03/2025',
        director: 'Steven Spielberg',
        rating: 8.2,
        status: 'Sắp chiếu',
        featured: true,
        views: 9870,
        tickets_sold: 0
    },
    {
        id: 7,
        title: 'Đảo Hoang Kỳ Bí',
        original_title: 'Mysterious Island',
        poster: '/path-to-poster-7.jpg',
        genre: 'Phiêu lưu, Giật gân',
        duration: 122,
        release_date: '08/05/2025',
        director: 'Colin Trevorrow',
        rating: 7.5,
        status: 'Sắp chiếu',
        featured: false,
        views: 7650,
        tickets_sold: 0
    },
    {
        id: 8,
        title: 'Vùng Đất Quỷ Dữ',
        original_title: 'Land of Evil',
        poster: '/path-to-poster-8.jpg',
        genre: 'Kinh dị, Giật gân',
        duration: 115,
        release_date: '15/05/2025',
        director: 'Ari Aster',
        rating: 7.8,
        status: 'Sắp chiếu',
        featured: false,
        views: 6240,
        tickets_sold: 0
    },
    {
        id: 9,
        title: 'Kẻ Ẩn Danh',
        original_title: 'The Anonymous',
        poster: '/path-to-poster-9.jpg',
        genre: 'Tâm lý, Bí ẩn',
        duration: 128,
        release_date: '12/12/2024',
        director: 'Denis Villeneuve',
        rating: 8.0,
        status: 'Ngừng chiếu',
        featured: false,
        views: 18760,
        tickets_sold: 1050
    },
    {
        id: 10,
        title: 'Biệt Đội Đánh Thuê',
        original_title: 'The Mercenaries',
        poster: '/path-to-poster-10.jpg',
        genre: 'Hành động',
        duration: 130,
        release_date: '30/11/2024',
        director: 'Michael Bay',
        rating: 7.4,
        status: 'Ngừng chiếu',
        featured: false,
        views: 16840,
        tickets_sold: 980
    }
];

// Component chính cho trang danh sách phim
const MoviesList = () => {
    const [movies, setMovies] = useState(sampleMoviesData);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [sortField, setSortField] = useState('release_date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState([]);

    const moviesPerPage = 8;

    // Trích xuất tất cả các thể loại từ danh sách phim
    const allGenres = () => {
        // Tạo một Set để lưu trữ các thể loại duy nhất
        const genresSet = new Set();

        // Duyệt qua từng phim và thêm các thể loại vào Set
        movies.forEach((movie) => {
            const genres = movie.genre.split(', ');
            genres.forEach((genre) => genresSet.add(genre));
        });

        // Chuyển đổi Set thành mảng và sắp xếp theo thứ tự bảng chữ cái
        return Array.from(genresSet).sort();
    };

    // Giả lập việc tải dữ liệu từ server
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // Giả lập việc gọi API
            await new Promise((resolve) => setTimeout(resolve, 800));
            setIsLoading(false);
        };

        loadData();
    }, []);

    // Xử lý thay đổi trường sắp xếp
    const handleSortChange = (field) => {
        if (sortField === field) {
            // Nếu đã sắp xếp theo trường này, thay đổi hướng sắp xếp
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Nếu sắp xếp theo trường mới, mặc định theo thứ tự giảm dần
            setSortField(field);
            setSortDirection('desc');
        }
    };

    // Xử lý tìm kiếm
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset trang khi tìm kiếm
    };

    // Xử lý lọc theo trạng thái
    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
        setCurrentPage(1); // Reset trang khi lọc
    };

    // Xử lý lọc theo thể loại
    const handleGenreFilter = (genre) => {
        setSelectedGenre(genre);
        setCurrentPage(1); // Reset trang khi lọc
    };

    // Xử lý checkbox
    const handleMovieSelection = (movieId) => {
        if (selectedMovies.includes(movieId)) {
            setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
        } else {
            setSelectedMovies([...selectedMovies, movieId]);
        }
    };

    // Xử lý chọn tất cả
    const handleSelectAllMovies = () => {
        if (selectedMovies.length === filteredMovies.length) {
            setSelectedMovies([]);
        } else {
            setSelectedMovies(filteredMovies.map((movie) => movie.id));
        }
    };

    // Tính toán danh sách phim đã lọc và sắp xếp
    const filteredMovies = movies
        .filter((movie) => {
            // Lọc theo tìm kiếm
            const matchesSearch =
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.original_title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            // Lọc theo trạng thái
            const matchesStatus =
                selectedStatus === 'all' || movie.status === selectedStatus;

            // Lọc theo thể loại
            const matchesGenre =
                selectedGenre === 'all' || movie.genre.includes(selectedGenre);

            return matchesSearch && matchesStatus && matchesGenre;
        })
        .sort((a, b) => {
            // Sắp xếp theo trường đã chọn
            if (a[sortField] < b[sortField])
                return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField])
                return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    // Tính toán các phim cho trang hiện tại
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(
        indexOfFirstMovie,
        indexOfLastMovie
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    // Xử lý xóa phim (giả lập)
    const handleDeleteMovie = (movieId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phim này không?')) {
            setMovies(movies.filter((movie) => movie.id !== movieId));
            setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
        }
    };

    // Xử lý xóa nhiều phim (giả lập)
    const handleBulkDelete = () => {
        if (selectedMovies.length === 0) return;

        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa ${selectedMovies.length} phim đã chọn không?`
            )
        ) {
            setMovies(
                movies.filter((movie) => !selectedMovies.includes(movie.id))
            );
            setSelectedMovies([]);
        }
    };

    // Hàm lấy màu sắc dựa trên trạng thái phim
    const getStatusColor = (status) => {
        switch (status) {
            case 'Đang chiếu':
                return 'bg-green-100 text-green-800';
            case 'Sắp chiếu':
                return 'bg-blue-100 text-blue-800';
            case 'Ngừng chiếu':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-purple-100 text-purple-800';
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Quản lý Phim
                    </h1>
                    <p className="text-gray-500">
                        Quản lý danh sách phim trong hệ thống
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                    <Link
                        to="/admin/movies/add"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Thêm phim mới
                    </Link>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <FaFilter className="mr-2" />
                        Bộ lọc
                        {isFilterOpen ? (
                            <FaChevronUp className="ml-2" />
                        ) : (
                            <FaChevronDown className="ml-2" />
                        )}
                    </button>

                    <div className="dropdown relative">
                        <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center">
                            <FaEllipsisV />
                        </button>
                        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden">
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <FaFileExport className="mr-2" />
                                Xuất danh sách
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                <FaFileImport className="mr-2" />
                                Nhập danh sách
                            </button>
                            <button
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                onClick={handleBulkDelete}
                                disabled={selectedMovies.length === 0}
                            >
                                <FaTrash className="mr-2" />
                                Xóa đã chọn ({selectedMovies.length})
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
                <div className="p-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim theo tên..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {isFilterOpen && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={(e) =>
                                        handleStatusFilter(e.target.value)
                                    }
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="all">
                                        Tất cả trạng thái
                                    </option>
                                    <option value="Đang chiếu">
                                        Đang chiếu
                                    </option>
                                    <option value="Sắp chiếu">Sắp chiếu</option>
                                    <option value="Ngừng chiếu">
                                        Ngừng chiếu
                                    </option>
                                </select>
                            </div>

                            {/* Genre Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thể loại
                                </label>
                                <select
                                    value={selectedGenre}
                                    onChange={(e) =>
                                        handleGenreFilter(e.target.value)
                                    }
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="all">Tất cả thể loại</option>
                                    {allGenres().map((genre, index) => (
                                        <option key={index} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select
                                    value={`${sortField}-${sortDirection}`}
                                    onChange={(e) => {
                                        const [field, direction] =
                                            e.target.value.split('-');
                                        setSortField(field);
                                        setSortDirection(direction);
                                    }}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="title-asc">
                                        Tên phim (A-Z)
                                    </option>
                                    <option value="title-desc">
                                        Tên phim (Z-A)
                                    </option>
                                    <option value="release_date-desc">
                                        Ngày phát hành (Mới nhất)
                                    </option>
                                    <option value="release_date-asc">
                                        Ngày phát hành (Cũ nhất)
                                    </option>
                                    <option value="rating-desc">
                                        Đánh giá (Cao đến thấp)
                                    </option>
                                    <option value="rating-asc">
                                        Đánh giá (Thấp đến cao)
                                    </option>
                                    <option value="views-desc">
                                        Lượt xem (Cao đến thấp)
                                    </option>
                                    <option value="tickets_sold-desc">
                                        Vé bán (Cao đến thấp)
                                    </option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filter info */}
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 text-sm flex flex-wrap items-center justify-between rounded-b-lg">
                    <div className="text-gray-500">
                        Hiển thị{' '}
                        <span className="font-medium text-gray-900">
                            {currentMovies.length}
                        </span>{' '}
                        phim trong tổng số{' '}
                        <span className="font-medium text-gray-900">
                            {filteredMovies.length}
                        </span>{' '}
                        phim
                        {selectedStatus !== 'all' && (
                            <span>
                                {' '}
                                • Trạng thái:{' '}
                                <span className="font-medium text-indigo-600">
                                    {selectedStatus}
                                </span>
                            </span>
                        )}
                        {selectedGenre !== 'all' && (
                            <span>
                                {' '}
                                • Thể loại:{' '}
                                <span className="font-medium text-indigo-600">
                                    {selectedGenre}
                                </span>
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedStatus('all');
                            setSelectedGenre('all');
                            setSortField('release_date');
                            setSortDirection('desc');
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                        <FaSync className="mr-1" />
                        Đặt lại bộ lọc
                    </button>
                </div>
            </div>

            {/* Movies Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={
                                                filteredMovies.length > 0 &&
                                                selectedMovies.length ===
                                                    filteredMovies.length
                                            }
                                            onChange={handleSelectAllMovies}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleSortChange('title')
                                        }
                                    >
                                        Phim
                                        {sortField === 'title' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Thể loại
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleSortChange('release_date')
                                        }
                                    >
                                        Ngày phát hành
                                        {sortField === 'release_date' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() =>
                                            handleSortChange('rating')
                                        }
                                    >
                                        Đánh giá
                                        {sortField === 'rating' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Trạng thái
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Nổi bật
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    <div
                                        className="flex items-center justify-end cursor-pointer"
                                        onClick={() =>
                                            handleSortChange('views')
                                        }
                                    >
                                        Lượt xem
                                        {sortField === 'views' && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? (
                                                    <FaChevronUp />
                                                ) : (
                                                    <FaChevronDown />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                // Loading state
                                [...Array(5)].map((_, index) => (
                                    <tr key={index}>
                                        <td colSpan="9" className="px-4 py-4">
                                            <div className="animate-pulse flex items-center space-x-4">
                                                <div className="rounded bg-gray-200 h-10 w-10"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : currentMovies.length === 0 ? (
                                // Empty state
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        <div className="flex flex-col items-center">
                                            <FaSearch className="text-gray-300 text-4xl mb-3" />
                                            <p className="text-lg font-medium">
                                                Không tìm thấy phim nào
                                            </p>
                                            <p className="text-sm">
                                                Thử thay đổi bộ lọc hoặc tìm
                                                kiếm với từ khóa khác
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                // Movie rows
                                currentMovies.map((movie) => (
                                    <tr
                                        key={movie.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedMovies.includes(
                                                    movie.id
                                                )}
                                                onChange={() =>
                                                    handleMovieSelection(
                                                        movie.id
                                                    )
                                                }
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded">
                                                    {movie.poster ? (
                                                        <img
                                                            className="h-10 w-10 rounded object-cover"
                                                            src={movie.poster}
                                                            alt={movie.title}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded bg-gray-300 flex items-center justify-center text-gray-500">
                                                            <FaPlay />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {movie.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {movie.original_title}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {movie.genre}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {movie.duration} phút
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {movie.release_date}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <FaClock className="mr-1" />
                                                <span>{movie.director}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FaStar className="text-yellow-400 mr-1" />
                                                <span className="text-sm text-gray-900">
                                                    {movie.rating}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(movie.status)}`}
                                            >
                                                {movie.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            {movie.featured ? (
                                                <FaCheck className="mx-auto text-green-500" />
                                            ) : (
                                                <FaTimes className="mx-auto text-gray-400" />
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="text-gray-900">
                                                {movie.views.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {movie.tickets_sold.toLocaleString()}{' '}
                                                vé
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link
                                                    to={`/admin/movies/${movie.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    title="Xem chi tiết"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <Link
                                                    to={`/admin/movies/edit/${movie.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Chỉnh sửa"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteMovie(
                                                            movie.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Xóa"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!isLoading && totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Hiển thị{' '}
                                    <span className="font-medium">
                                        {indexOfFirstMovie + 1}
                                    </span>{' '}
                                    đến{' '}
                                    <span className="font-medium">
                                        {Math.min(
                                            indexOfLastMovie,
                                            filteredMovies.length
                                        )}
                                    </span>{' '}
                                    trong tổng số{' '}
                                    <span className="font-medium">
                                        {filteredMovies.length}
                                    </span>{' '}
                                    phim
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.max(1, currentPage - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        &laquo; Trước
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentPage(index + 1)
                                            }
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.min(
                                                    totalPages,
                                                    currentPage + 1
                                                )
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                                    >
                                        <span className="sr-only">Next</span>
                                        Tiếp &raquo;
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesList;
