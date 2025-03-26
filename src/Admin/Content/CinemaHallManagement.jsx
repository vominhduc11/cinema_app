import React, { useState, useEffect } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaFilter,
    FaSort,
    FaChair,
    FaFilm,
    FaTh,
    FaEye,
    FaListUl,
    FaCheck,
    FaTimes,
    FaExclamationTriangle,
    FaSyncAlt,
    FaToggleOn,
    FaToggleOff,
    FaExclamationCircle,
    FaSave,
    FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';

// Component for the header of the admin page
const AdminHeader = ({ title }) => {
    return (
        <div className="admin-header p-4 bg-white border-b border-gray-300 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaPlus className="mr-2" />
                    Thêm phòng chiếu
                </button>
            </div>
        </div>
    );
};

// Component for filters
const FiltersSection = ({ onFilterChange, filters, cinemaList }) => {
    return (
        <div className="filters-section p-4 bg-white border-b border-gray-300">
            <div className="flex flex-wrap gap-4">
                <div className="search-box flex-grow md:flex-grow-0 md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm phòng chiếu..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            value={filters.search}
                            onChange={(e) =>
                                onFilterChange('search', e.target.value)
                            }
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.cinema}
                        onChange={(e) =>
                            onFilterChange('cinema', e.target.value)
                        }
                    >
                        <option value="">Tất cả rạp</option>
                        {cinemaList.map((cinema) => (
                            <option key={cinema.id} value={cinema.id}>
                                {cinema.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.status}
                        onChange={(e) =>
                            onFilterChange('status', e.target.value)
                        }
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="maintenance">Đang bảo trì</option>
                        <option value="inactive">Ngưng hoạt động</option>
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.technology}
                        onChange={(e) =>
                            onFilterChange('technology', e.target.value)
                        }
                    >
                        <option value="">Tất cả công nghệ</option>
                        <option value="2D">2D</option>
                        <option value="3D">3D</option>
                        <option value="4DX">4DX</option>
                        <option value="IMAX">IMAX</option>
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.sortBy}
                        onChange={(e) =>
                            onFilterChange('sortBy', e.target.value)
                        }
                    >
                        <option value="name">Tên phòng</option>
                        <option value="capacity">Số lượng ghế</option>
                        <option value="lastUpdated">Cập nhật mới nhất</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <button
                        className={`px-3 py-2 rounded-l-md border border-gray-300 ${filters.viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700'}`}
                        onClick={() => onFilterChange('viewMode', 'grid')}
                    >
                        <FaTh />
                    </button>
                    <button
                        className={`px-3 py-2 rounded-r-md border border-gray-300 border-l-0 ${filters.viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700'}`}
                        onClick={() => onFilterChange('viewMode', 'list')}
                    >
                        <FaListUl />
                    </button>
                </div>

                <button
                    className="ml-auto px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
                    onClick={() => onFilterChange('reset')}
                >
                    <FaSyncAlt className="mr-2" />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

// Status badge component
const StatusBadge = ({ status }) => {
    let badgeClass =
        'px-2 py-1 rounded-full text-xs font-medium flex items-center';
    let icon = null;
    let text = '';

    switch (status) {
        case 'active':
            badgeClass += ' bg-green-100 text-green-800';
            icon = <FaCheck className="mr-1" />;
            text = 'Đang hoạt động';
            break;
        case 'maintenance':
            badgeClass += ' bg-yellow-100 text-yellow-800';
            icon = <FaExclamationTriangle className="mr-1" />;
            text = 'Đang bảo trì';
            break;
        case 'inactive':
            badgeClass += ' bg-red-100 text-red-800';
            icon = <FaTimes className="mr-1" />;
            text = 'Ngưng hoạt động';
            break;
        default:
            badgeClass += ' bg-gray-100 text-gray-800';
            text = 'Không xác định';
    }

    return (
        <span className={badgeClass}>
            {icon}
            {text}
        </span>
    );
};

// Technology badge component
const TechnologyBadge = ({ tech }) => {
    let badgeClass = 'px-2 py-1 rounded-md text-xs font-medium';

    switch (tech) {
        case '2D':
            badgeClass += ' bg-blue-100 text-blue-800';
            break;
        case '3D':
            badgeClass += ' bg-purple-100 text-purple-800';
            break;
        case '4DX':
            badgeClass += ' bg-indigo-100 text-indigo-800';
            break;
        case 'IMAX':
            badgeClass += ' bg-teal-100 text-teal-800';
            break;
        default:
            badgeClass += ' bg-gray-100 text-gray-800';
    }

    return <span className={badgeClass}>{tech}</span>;
};

// Grid view for cinema halls
const GridView = ({ halls, onEditHall, onDeleteHall, onViewDetails }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {halls.map((hall) => (
                <div
                    key={hall.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg transform hover:-translate-y-1"
                >
                    <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-800">
                            {hall.name}
                        </h3>
                        <StatusBadge status={hall.status} />
                    </div>

                    <div className="p-4">
                        <div className="flex items-center text-gray-600 mb-2">
                            <MdLocalMovies className="mr-2" />
                            <span>{hall.cinema}</span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-2">
                            <FaChair className="mr-2" />
                            <span>{hall.capacity} ghế</span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-4">
                            <FaFilm className="mr-2" />
                            <div className="flex flex-wrap gap-1">
                                {hall.technologies.map((tech) => (
                                    <TechnologyBadge key={tech} tech={tech} />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center mb-4">
                            <span
                                className={`inline-block w-3 h-3 rounded-full ${hall.isActive ? 'bg-green-500' : 'bg-gray-400'} mr-2`}
                            ></span>
                            <span className="text-sm text-gray-600">
                                {hall.isActive
                                    ? 'Có suất chiếu hôm nay'
                                    : 'Không có suất chiếu hôm nay'}
                            </span>
                        </div>

                        <div className="text-sm text-gray-500 mb-4">
                            Cập nhật: {hall.lastUpdated}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => onViewDetails(hall)}
                                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md flex items-center"
                            >
                                <FaEye className="mr-1" />
                                Chi tiết
                            </button>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onEditHall(hall)}
                                    className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDeleteHall(hall)}
                                    className="text-red-600 hover:bg-red-50 px-2 py-1 rounded-md"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// List view for cinema halls
const ListView = ({ halls, onEditHall, onDeleteHall, onViewDetails }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Tên phòng
                        </th>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Rạp
                        </th>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Số ghế
                        </th>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Công nghệ
                        </th>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Trạng thái
                        </th>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Suất chiếu
                        </th>
                        <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                            Cập nhật
                        </th>
                        <th className="py-3 px-4 text-center font-medium border-b border-gray-200">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {halls.map((hall) => (
                        <tr key={hall.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                                <div className="font-medium text-gray-800">
                                    {hall.name}
                                </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                                {hall.cinema}
                            </td>
                            <td className="py-3 px-4 text-gray-600">
                                {hall.capacity}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                    {hall.technologies.map((tech) => (
                                        <TechnologyBadge
                                            key={tech}
                                            tech={tech}
                                        />
                                    ))}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <StatusBadge status={hall.status} />
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center">
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full ${hall.isActive ? 'bg-green-500' : 'bg-gray-400'} mr-2`}
                                    ></span>
                                    <span className="text-sm text-gray-600">
                                        {hall.isActive ? 'Có' : 'Không'}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-500">
                                {hall.lastUpdated}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => onViewDetails(hall)}
                                        className="text-blue-600 hover:bg-blue-50 p-1 rounded-md"
                                        title="Xem chi tiết"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => onEditHall(hall)}
                                        className="text-blue-600 hover:bg-blue-50 p-1 rounded-md"
                                        title="Chỉnh sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDeleteHall(hall)}
                                        className="text-red-600 hover:bg-red-50 p-1 rounded-md"
                                        title="Xóa"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Pagination component
const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
            <div className="text-sm text-gray-500">
                Hiển thị{' '}
                {Math.min(itemsPerPage * (currentPage - 1) + 1, totalItems)} đến{' '}
                {Math.min(itemsPerPage * currentPage, totalItems)} trong số{' '}
                {totalItems} phòng chiếu
            </div>

            <div className="flex space-x-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                    <FaArrowLeft />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

// Main component
const CinemaHallManagement = () => {
    const [filters, setFilters] = useState({
        search: '',
        cinema: '',
        status: '',
        technology: '',
        sortBy: 'name',
        viewMode: 'list'
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [cinemaList, setCinemaList] = useState([]);
    const [halls, setHalls] = useState([]);
    const [filteredHalls, setFilteredHalls] = useState([]);
    const [selectedHall, setSelectedHall] = useState(null);
    const [showHallDetails, setShowHallDetails] = useState(false);
    const itemsPerPage = 10;

    // Sample data for cinemas
    const sampleCinemas = [
        { id: 'c1', name: 'CineStar Quốc Thanh' },
        { id: 'c2', name: 'CineStar Hai Bà Trưng' },
        { id: 'c3', name: 'CineStar Gò Vấp' },
        { id: 'c4', name: 'CineStar Đà Lạt' }
    ];

    // Sample data for cinema halls
    const sampleHalls = [
        {
            id: 'h1',
            name: 'Phòng 1',
            cinema: 'CineStar Quốc Thanh',
            cinemaId: 'c1',
            capacity: 120,
            technologies: ['2D', '3D'],
            status: 'active',
            isActive: true,
            lastUpdated: '25/03/2025 14:30',
            features: ['Màn hình cong', 'Âm thanh Dolby'],
            maintenance: [],
            layout: {
                rows: 10,
                seatsPerRow: 12,
                vipRows: [6, 7, 8]
            }
        },
        {
            id: 'h2',
            name: 'Phòng 2',
            cinema: 'CineStar Quốc Thanh',
            cinemaId: 'c1',
            capacity: 150,
            technologies: ['2D', '3D', '4DX'],
            status: 'active',
            isActive: true,
            lastUpdated: '24/03/2025 09:15',
            features: ['Màn hình cong', 'Âm thanh Dolby', 'Ghế rung'],
            maintenance: [],
            layout: {
                rows: 12,
                seatsPerRow: 15,
                vipRows: [7, 8, 9]
            }
        },
        {
            id: 'h3',
            name: 'Phòng 3',
            cinema: 'CineStar Quốc Thanh',
            cinemaId: 'c1',
            capacity: 80,
            technologies: ['2D'],
            status: 'maintenance',
            isActive: false,
            lastUpdated: '23/03/2025 16:45',
            features: ['Âm thanh 5.1'],
            maintenance: [
                {
                    id: 'm1',
                    issue: 'Sửa chữa hệ thống điều hòa',
                    startDate: '22/03/2025',
                    endDate: '29/03/2025'
                }
            ],
            layout: {
                rows: 8,
                seatsPerRow: 10,
                vipRows: [5, 6]
            }
        },
        {
            id: 'h4',
            name: 'Phòng IMAX',
            cinema: 'CineStar Hai Bà Trưng',
            cinemaId: 'c2',
            capacity: 200,
            technologies: ['2D', '3D', 'IMAX'],
            status: 'active',
            isActive: true,
            lastUpdated: '24/03/2025 10:30',
            features: ['Màn hình IMAX', 'Âm thanh 360°', 'Ghế rộng'],
            maintenance: [],
            layout: {
                rows: 15,
                seatsPerRow: 16,
                vipRows: [8, 9, 10, 11]
            }
        },
        {
            id: 'h5',
            name: 'Phòng 1',
            cinema: 'CineStar Hai Bà Trưng',
            cinemaId: 'c2',
            capacity: 100,
            technologies: ['2D', '3D'],
            status: 'active',
            isActive: false,
            lastUpdated: '22/03/2025 15:20',
            features: ['Âm thanh Dolby'],
            maintenance: [],
            layout: {
                rows: 10,
                seatsPerRow: 10,
                vipRows: [6, 7]
            }
        },
        {
            id: 'h6',
            name: 'Phòng 2',
            cinema: 'CineStar Hai Bà Trưng',
            cinemaId: 'c2',
            capacity: 120,
            technologies: ['2D'],
            status: 'inactive',
            isActive: false,
            lastUpdated: '20/02/2025 09:10',
            features: ['Âm thanh 5.1'],
            maintenance: [],
            layout: {
                rows: 12,
                seatsPerRow: 10,
                vipRows: []
            }
        },
        {
            id: 'h7',
            name: 'Phòng 1',
            cinema: 'CineStar Gò Vấp',
            cinemaId: 'c3',
            capacity: 140,
            technologies: ['2D', '3D', '4DX'],
            status: 'active',
            isActive: true,
            lastUpdated: '25/03/2025 08:45',
            features: [
                'Màn hình cong',
                'Âm thanh Dolby',
                'Ghế rung',
                'Hiệu ứng gió'
            ],
            maintenance: [],
            layout: {
                rows: 14,
                seatsPerRow: 10,
                vipRows: [8, 9, 10]
            }
        },
        {
            id: 'h8',
            name: 'Phòng 2',
            cinema: 'CineStar Gò Vấp',
            cinemaId: 'c3',
            capacity: 110,
            technologies: ['2D', '3D'],
            status: 'active',
            isActive: true,
            lastUpdated: '24/03/2025 13:20',
            features: ['Âm thanh Dolby'],
            maintenance: [],
            layout: {
                rows: 11,
                seatsPerRow: 10,
                vipRows: [7, 8]
            }
        },
        {
            id: 'h9',
            name: 'Phòng 1',
            cinema: 'CineStar Đà Lạt',
            cinemaId: 'c4',
            capacity: 90,
            technologies: ['2D'],
            status: 'maintenance',
            isActive: false,
            lastUpdated: '20/03/2025 10:15',
            features: ['Âm thanh 5.1'],
            maintenance: [
                {
                    id: 'm2',
                    issue: 'Nâng cấp hệ thống âm thanh',
                    startDate: '20/03/2025',
                    endDate: '01/04/2025'
                }
            ],
            layout: {
                rows: 9,
                seatsPerRow: 10,
                vipRows: [5, 6]
            }
        },
        {
            id: 'h10',
            name: 'Phòng 2',
            cinema: 'CineStar Đà Lạt',
            cinemaId: 'c4',
            capacity: 100,
            technologies: ['2D', '3D'],
            status: 'active',
            isActive: true,
            lastUpdated: '24/03/2025 17:30',
            features: ['Màn hình cong', 'Âm thanh Dolby'],
            maintenance: [],
            layout: {
                rows: 10,
                seatsPerRow: 10,
                vipRows: [6, 7]
            }
        }
    ];

    // Load sample data
    useEffect(() => {
        // Simulating API call delay
        setTimeout(() => {
            setCinemaList(sampleCinemas);
            setHalls(sampleHalls);
            setFilteredHalls(sampleHalls);
            setIsLoading(false);
        }, 800);
    }, []);

    // Filter halls when filters change
    useEffect(() => {
        let result = [...halls];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (hall) =>
                    hall.name.toLowerCase().includes(searchLower) ||
                    hall.cinema.toLowerCase().includes(searchLower)
            );
        }

        // Apply cinema filter
        if (filters.cinema) {
            result = result.filter((hall) => hall.cinemaId === filters.cinema);
        }

        // Apply status filter
        if (filters.status) {
            result = result.filter((hall) => hall.status === filters.status);
        }

        // Apply technology filter
        if (filters.technology) {
            result = result.filter((hall) =>
                hall.technologies.includes(filters.technology)
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            switch (filters.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'capacity':
                    return b.capacity - a.capacity;
                case 'lastUpdated':
                    // Simple string comparison for dates in DD/MM/YYYY format
                    return b.lastUpdated.localeCompare(a.lastUpdated);
                default:
                    return 0;
            }
        });

        setFilteredHalls(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, halls]);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        if (filterName === 'reset') {
            setFilters({
                search: '',
                cinema: '',
                status: '',
                technology: '',
                sortBy: 'name',
                viewMode: filters.viewMode // Keep the current view mode
            });
        } else {
            setFilters({
                ...filters,
                [filterName]: value
            });
        }
    };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle hall actions
    const handleViewDetails = (hall) => {
        setSelectedHall(hall);
        setShowHallDetails(true);
    };

    const handleEditHall = (hall) => {
        alert(`Chỉnh sửa phòng chiếu: ${hall.name}`);
    };

    const handleDeleteHall = (hall) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa phòng chiếu "${hall.name}" không?`
            )
        ) {
            alert(`Đã xóa phòng chiếu: ${hall.name}`);
        }
    };

    // Calculate paginated halls
    const getPaginatedHalls = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredHalls.slice(startIndex, endIndex);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader title="Quản lý phòng chiếu" />

            <div className="container mx-auto">
                <FiltersSection
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    cinemaList={cinemaList}
                />

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredHalls.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <FaExclamationCircle className="text-gray-400 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                            Không tìm thấy phòng chiếu
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Không có phòng chiếu nào phù hợp với bộ lọc đã chọn.
                        </p>
                        <button
                            onClick={() => handleFilterChange('reset')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Đặt lại bộ lọc
                        </button>
                    </div>
                ) : (
                    <>
                        {filters.viewMode === 'grid' ? (
                            <GridView
                                halls={getPaginatedHalls()}
                                onEditHall={handleEditHall}
                                onDeleteHall={handleDeleteHall}
                                onViewDetails={handleViewDetails}
                            />
                        ) : (
                            <ListView
                                halls={getPaginatedHalls()}
                                onEditHall={handleEditHall}
                                onDeleteHall={handleDeleteHall}
                                onViewDetails={handleViewDetails}
                            />
                        )}

                        <Pagination
                            totalItems={filteredHalls.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Hall Details Modal */}
            {showHallDetails && selectedHall && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                Chi tiết phòng chiếu
                            </h2>
                            <button
                                onClick={() => setShowHallDetails(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {selectedHall.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        {selectedHall.cinema}
                                    </p>
                                </div>
                                <StatusBadge status={selectedHall.status} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">
                                        Thông tin cơ bản
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Số ghế
                                                </p>
                                                <p className="font-medium">
                                                    {selectedHall.capacity}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Công nghệ
                                                </p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {selectedHall.technologies.map(
                                                        (tech) => (
                                                            <TechnologyBadge
                                                                key={tech}
                                                                tech={tech}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Cập nhật
                                                </p>
                                                <p className="font-medium">
                                                    {selectedHall.lastUpdated}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Suất chiếu hôm nay
                                                </p>
                                                <p className="font-medium">
                                                    {selectedHall.isActive
                                                        ? 'Có'
                                                        : 'Không'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">
                                        Tính năng
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <ul className="space-y-2">
                                            {selectedHall.features.map(
                                                (feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center"
                                                    >
                                                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                        <span>{feature}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-medium text-gray-700 mb-2">
                                    Sơ đồ ghế
                                </h4>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="mb-3">
                                        <p className="text-sm text-gray-500">
                                            Số hàng:{' '}
                                            <span className="font-medium">
                                                {selectedHall.layout.rows}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Số ghế mỗi hàng:{' '}
                                            <span className="font-medium">
                                                {
                                                    selectedHall.layout
                                                        .seatsPerRow
                                                }
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Hàng ghế VIP:{' '}
                                            <span className="font-medium">
                                                {selectedHall.layout.vipRows
                                                    .length > 0
                                                    ? selectedHall.layout.vipRows.join(
                                                          ', '
                                                      )
                                                    : 'Không có'}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="text-center p-2 bg-gray-200 rounded mb-4">
                                        <p className="text-sm text-gray-700">
                                            Màn hình
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-12 gap-1 max-h-40 overflow-y-auto">
                                        {Array.from({
                                            length: selectedHall.layout.rows
                                        }).map((_, rowIndex) => {
                                            const row = String.fromCharCode(
                                                65 + rowIndex
                                            );
                                            const isVipRow =
                                                selectedHall.layout.vipRows.includes(
                                                    rowIndex + 1
                                                );

                                            return Array.from({
                                                length: selectedHall.layout
                                                    .seatsPerRow
                                            }).map((_, seatIndex) => (
                                                <div
                                                    key={`${row}${seatIndex + 1}`}
                                                    className={`w-8 h-6 text-xs flex items-center justify-center rounded ${isVipRow ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}
                                                    title={`${row}${seatIndex + 1}`}
                                                >
                                                    {seatIndex + 1}
                                                </div>
                                            ));
                                        })}
                                    </div>

                                    <div className="flex justify-center space-x-4 mt-3">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-100 rounded mr-1"></div>
                                            <span className="text-xs text-gray-700">
                                                Ghế thường
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-yellow-100 rounded mr-1"></div>
                                            <span className="text-xs text-gray-700">
                                                Ghế VIP
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedHall.maintenance.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-700 mb-2">
                                        Lịch bảo trì
                                    </h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        {selectedHall.maintenance.map(
                                            (item) => (
                                                <div
                                                    key={item.id}
                                                    className="border-l-4 border-yellow-500 pl-3 py-2"
                                                >
                                                    <p className="font-medium">
                                                        {item.issue}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Từ {item.startDate} đến{' '}
                                                        {item.endDate}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowHallDetails(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Đóng
                                </button>
                                <button
                                    onClick={() => {
                                        setShowHallDetails(false);
                                        handleEditHall(selectedHall);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <FaEdit className="mr-2" />
                                    Chỉnh sửa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CinemaHallManagement;
