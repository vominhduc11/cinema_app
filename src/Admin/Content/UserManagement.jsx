import React, { useState, useEffect } from 'react';
import {
    FaSearch,
    FaUserPlus,
    FaEdit,
    FaTrash,
    FaLock,
    FaUnlock,
    FaEye,
    FaFileExport,
    FaFilter,
    FaSync,
    FaSortAmountDown,
    FaSortAmountUp,
    FaUserAlt,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaListAlt,
    FaThList,
    FaTable,
    FaChevronDown,
    FaChevronUp,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
    FaCheck,
    FaBan,
    FaFileDownload,
    FaStar,
    FaCrown,
    FaFilm,
    FaTicketAlt,
    FaShieldAlt,
    FaAddressCard,
    FaUserCog
} from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
// eslint-disable-next-line
import { vi } from 'date-fns/locale';

// Admin Header Component
const AdminHeader = ({ title }) => {
    return (
        <div className="admin-header p-4 bg-white border-b border-gray-300 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaUserPlus className="mr-2" />
                    Thêm người dùng
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center">
                    <FaFileExport className="mr-2" />
                    Xuất báo cáo
                </button>
            </div>
        </div>
    );
};

// Filters Component
const FiltersSection = ({ onFilterChange, filters, membershipLevels }) => {
    return (
        <div className="filters-section p-4 bg-white border-b border-gray-300">
            <div className="flex flex-wrap gap-4">
                <div className="search-box flex-grow md:flex-grow-0 md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
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
                        value={filters.status}
                        onChange={(e) =>
                            onFilterChange('status', e.target.value)
                        }
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang hoạt động</option>
                        <option value="inactive">Không hoạt động</option>
                        <option value="locked">Đã khóa</option>
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.membershipLevel}
                        onChange={(e) =>
                            onFilterChange('membershipLevel', e.target.value)
                        }
                    >
                        <option value="">Tất cả hạng thành viên</option>
                        {membershipLevels.map((level) => (
                            <option key={level.id} value={level.id}>
                                {level.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.registrationMethod}
                        onChange={(e) =>
                            onFilterChange('registrationMethod', e.target.value)
                        }
                    >
                        <option value="">Tất cả phương thức đăng ký</option>
                        <option value="direct">Đăng ký trực tiếp</option>
                        <option value="facebook">Đăng nhập qua Facebook</option>
                        <option value="google">Đăng nhập qua Google</option>
                    </select>
                </div>

                <div className="filter-dropdown flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.registrationDate}
                        onChange={(e) =>
                            onFilterChange('registrationDate', e.target.value)
                        }
                        placeholder="Ngày đăng ký"
                    />
                </div>

                <button
                    className="ml-auto px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
                    onClick={() => onFilterChange('reset')}
                >
                    <FaSync className="mr-2" />
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

// Status Badge Component
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
        case 'inactive':
            badgeClass += ' bg-gray-100 text-gray-800';
            icon = <FaBan className="mr-1" />;
            text = 'Không hoạt động';
            break;
        case 'locked':
            badgeClass += ' bg-red-100 text-red-800';
            icon = <FaLock className="mr-1" />;
            text = 'Đã khóa';
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

// Membership Level Badge
const MembershipBadge = ({ level }) => {
    let badgeClass =
        'px-2 py-1 rounded-md text-xs font-medium flex items-center';
    let icon = null;

    switch (level) {
        case 'Basic':
            badgeClass += ' bg-gray-100 text-gray-800';
            icon = <FaUserAlt className="mr-1" />;
            break;
        case 'Silver':
            badgeClass += ' bg-blue-100 text-blue-800';
            icon = <FaStar className="mr-1" />;
            break;
        case 'Gold':
            badgeClass += ' bg-yellow-100 text-yellow-800';
            icon = <FaStar className="mr-1" />;
            break;
        case 'Platinum':
            badgeClass += ' bg-purple-100 text-purple-800';
            icon = <FaCrown className="mr-1" />;
            break;
        default:
            badgeClass += ' bg-gray-100 text-gray-800';
            icon = <FaUserAlt className="mr-1" />;
    }

    return (
        <span className={badgeClass}>
            {icon}
            {level}
        </span>
    );
};

// Registration Method Badge
const RegistrationMethodBadge = ({ method }) => {
    let badgeClass = 'px-2 py-1 rounded-md text-xs font-medium';
    let content = '';

    switch (method) {
        case 'direct':
            badgeClass += ' bg-blue-100 text-blue-800';
            content = 'Trực tiếp';
            break;
        case 'facebook':
            badgeClass += ' bg-indigo-100 text-indigo-800';
            content = 'Facebook';
            break;
        case 'google':
            badgeClass += ' bg-red-100 text-red-800';
            content = 'Google';
            break;
        default:
            badgeClass += ' bg-gray-100 text-gray-800';
            content = 'Khác';
    }

    return <span className={badgeClass}>{content}</span>;
};

// User Card Component (for grid view)
const UserCard = ({
    user,
    onViewUser,
    onEditUser,
    onDeleteUser,
    onToggleUserStatus
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <StatusBadge status={user.status} />
            </div>

            <div className="p-4">
                <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                <FaUserAlt className="text-gray-500" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-1">
                            <MembershipBadge level={user.membershipLevel} />
                        </div>
                        <div className="text-sm text-gray-600">
                            ID: {user.id}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <span className="text-gray-800 truncate">
                            {user.email}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaPhone className="text-gray-500 mr-2" />
                        <span className="text-gray-800">
                            {user.phone || '(Chưa cập nhật)'}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-500 mr-2" />
                        <span className="text-gray-800">
                            {format(
                                parseISO(user.registrationDate),
                                'dd/MM/yyyy'
                            )}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <div className="flex items-center">
                            <FaFilm className="mr-1" />
                            <span>{user.watchedMovies}</span>
                        </div>
                        <div className="flex items-center">
                            <FaTicketAlt className="mr-1" />
                            <span>{user.purchasedTickets}</span>
                        </div>
                    </div>

                    <div className="flex space-x-1">
                        <button
                            onClick={() => onViewUser(user)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                        >
                            <FaEye />
                        </button>
                        <button
                            onClick={() => onEditUser(user)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Chỉnh sửa"
                        >
                            <FaEdit />
                        </button>
                        {user.status === 'locked' ? (
                            <button
                                onClick={() => onToggleUserStatus(user)}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                title="Mở khóa tài khoản"
                            >
                                <FaUnlock />
                            </button>
                        ) : (
                            <button
                                onClick={() => onToggleUserStatus(user)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Khóa tài khoản"
                            >
                                <FaLock />
                            </button>
                        )}
                        <button
                            onClick={() => onDeleteUser(user)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Xóa người dùng"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// User List Component
const UserList = ({
    users,
    onViewUser,
    onEditUser,
    onDeleteUser,
    onToggleUserStatus,
    viewMode
}) => {
    return (
        <div>
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onViewUser={onViewUser}
                            onEditUser={onEditUser}
                            onDeleteUser={onDeleteUser}
                            onToggleUserStatus={onToggleUserStatus}
                        />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Tên người dùng
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Email
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Số điện thoại
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Hạng thành viên
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Đăng ký qua
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Ngày đăng ký
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Lượt xem phim
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Trạng thái
                                </th>
                                <th className="py-3 px-4 text-center font-medium border-b border-gray-200">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2 flex-shrink-0">
                                                {user.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                                        <FaUserAlt className="text-gray-500 text-xs" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-800">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    ID: {user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {user.email}
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {user.phone || '(Chưa cập nhật)'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <MembershipBadge
                                            level={user.membershipLevel}
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <RegistrationMethodBadge
                                            method={user.registrationMethod}
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {format(
                                            parseISO(user.registrationDate),
                                            'dd/MM/yyyy'
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {user.watchedMovies}
                                    </td>
                                    <td className="py-3 px-4">
                                        <StatusBadge status={user.status} />
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-center space-x-1">
                                            <button
                                                onClick={() => onViewUser(user)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => onEditUser(user)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <FaEdit />
                                            </button>
                                            {user.status === 'locked' ? (
                                                <button
                                                    onClick={() =>
                                                        onToggleUserStatus(user)
                                                    }
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                                    title="Mở khóa tài khoản"
                                                >
                                                    <FaUnlock />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        onToggleUserStatus(user)
                                                    }
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                    title="Khóa tài khoản"
                                                >
                                                    <FaLock />
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    onDeleteUser(user)
                                                }
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                title="Xóa người dùng"
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
            )}
        </div>
    );
};

// Empty State Component
const EmptyState = ({ onResetFilters }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FaUserAlt className="text-gray-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
                Không tìm thấy người dùng nào
            </h3>
            <p className="text-gray-500 mb-4">
                Không có người dùng nào phù hợp với bộ lọc đã chọn.
            </p>
            <button
                onClick={onResetFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
                Đặt lại bộ lọc
            </button>
        </div>
    );
};

// Pagination Component
const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5; // Show at most 5 page numbers

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are 5 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show current page, 2 pages before and 2 pages after when possible
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) {
                    pageNumbers.push('...');
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
            <div className="text-sm text-gray-500">
                Hiển thị{' '}
                {Math.min(itemsPerPage * (currentPage - 1) + 1, totalItems)} đến{' '}
                {Math.min(itemsPerPage * currentPage, totalItems)} trong số{' '}
                {totalItems} người dùng
            </div>

            <div className="flex space-x-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                    <FaChevronLeft />
                </button>

                {getPageNumbers().map((pageNumber, index) =>
                    pageNumber === '...' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-1 text-gray-500"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
                        >
                            {pageNumber}
                        </button>
                    )
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

// User Details Modal Component
const UserDetailsModal = ({
    user,
    onClose,
    onEdit,
    onToggleStatus,
    onDelete
}) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FaUserAlt className="text-blue-600 mr-2" />
                        Chi tiết người dùng
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* User profile and basic info */}
                        <div className="md:w-1/3">
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-3">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                            <FaUserAlt className="text-gray-500 text-4xl" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-1">
                                    {user.name}
                                </h3>
                                <div className="mb-2">
                                    <MembershipBadge
                                        level={user.membershipLevel}
                                    />
                                </div>
                                <StatusBadge status={user.status} />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            ID người dùng
                                        </p>
                                        <p className="font-medium">{user.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Đăng ký qua
                                        </p>
                                        <p className="font-medium">
                                            <RegistrationMethodBadge
                                                method={user.registrationMethod}
                                            />
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Ngày đăng ký
                                        </p>
                                        <p className="font-medium">
                                            {format(
                                                parseISO(user.registrationDate),
                                                'dd/MM/yyyy'
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Lần đăng nhập cuối
                                        </p>
                                        <p className="font-medium">
                                            {user.lastLogin
                                                ? format(
                                                      parseISO(user.lastLogin),
                                                      'dd/MM/yyyy HH:mm'
                                                  )
                                                : 'Chưa đăng nhập'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaFileDownload className="mr-2 text-blue-600" />
                                    Tải xuống thông tin
                                </h4>
                                <div className="flex flex-col space-y-2">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center">
                                        <FaFileDownload className="mr-2" />
                                        Xuất dữ liệu cá nhân
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center">
                                        <FaTicketAlt className="mr-2" />
                                        Xuất lịch sử giao dịch
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* User details and stats */}
                        <div className="md:w-2/3">
                            {/* Contact Information */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaAddressCard className="mr-2 text-blue-600" />
                                    Thông tin liên hệ
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        <p className="font-medium">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Số điện thoại
                                        </p>
                                        <p className="font-medium">
                                            {user.phone || '(Chưa cập nhật)'}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">
                                            Địa chỉ
                                        </p>
                                        <p className="font-medium">
                                            {user.address || '(Chưa cập nhật)'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Statistics */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaFilm className="mr-2 text-blue-600" />
                                    Hoạt động
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-blue-600">
                                            {user.watchedMovies}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Phim đã xem
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-green-600">
                                            {user.purchasedTickets}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Vé đã mua
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-purple-600">
                                            {user.reviewsCount}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Đánh giá
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-yellow-600">
                                            {user.points.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Điểm tích lũy
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-medium text-gray-700 mb-2">
                                        Phim yêu thích
                                    </h5>
                                    <div className="bg-white p-3 rounded-lg">
                                        {user.favoriteGenres.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {user.favoriteGenres.map(
                                                    (genre, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                                        >
                                                            {genre}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">
                                                Chưa có dữ liệu
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaTicketAlt className="mr-2 text-blue-600" />
                                    Giao dịch gần đây
                                </h4>
                                {user.recentTransactions &&
                                user.recentTransactions.length > 0 ? (
                                    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                        Mã giao dịch
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                        Ngày
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                        Phim
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                                        Số lượng
                                                    </th>
                                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                                                        Tổng tiền
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.recentTransactions.map(
                                                    (transaction, index) => (
                                                        <tr
                                                            key={index}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-4 py-2 text-sm text-gray-900">
                                                                {transaction.id}
                                                            </td>
                                                            <td className="px-4 py-2 text-sm text-gray-900">
                                                                {format(
                                                                    parseISO(
                                                                        transaction.date
                                                                    ),
                                                                    'dd/MM/yyyy'
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-2 text-sm text-gray-900">
                                                                {
                                                                    transaction.movie
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 text-sm text-gray-900">
                                                                {
                                                                    transaction.quantity
                                                                }{' '}
                                                                vé
                                                            </td>
                                                            <td className="px-4 py-2 text-sm text-right font-medium text-gray-900">
                                                                {transaction.amount.toLocaleString(
                                                                    'vi-VN'
                                                                )}{' '}
                                                                ₫
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic text-center p-4 bg-white rounded-lg border border-gray-200">
                                        Người dùng chưa có giao dịch nào
                                    </p>
                                )}
                            </div>

                            {/* User Administration */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaUserCog className="mr-2 text-blue-600" />
                                    Quản lý tài khoản
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Trạng thái tài khoản
                                        </p>
                                        <div className="mt-1 flex items-center">
                                            <StatusBadge status={user.status} />
                                            {user.status === 'locked' && (
                                                <span className="ml-2 text-xs text-red-600">
                                                    Khóa ngày:{' '}
                                                    {user.lockedDate
                                                        ? format(
                                                              parseISO(
                                                                  user.lockedDate
                                                              ),
                                                              'dd/MM/yyyy'
                                                          )
                                                        : 'N/A'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Hạng thành viên
                                        </p>
                                        <div className="flex items-center mt-1">
                                            <MembershipBadge
                                                level={user.membershipLevel}
                                            />
                                            <button className="ml-2 text-xs text-blue-600 hover:underline">
                                                Nâng cấp
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-end space-x-3 mt-4">
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <FaEdit className="mr-2" />
                                        Chỉnh sửa
                                    </button>
                                    {user.status === 'locked' ? (
                                        <button
                                            onClick={() => onToggleStatus(user)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                                        >
                                            <FaUnlock className="mr-2" />
                                            Mở khóa
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onToggleStatus(user)}
                                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center"
                                        >
                                            <FaLock className="mr-2" />
                                            Khóa
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDelete(user)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                                    >
                                        <FaTrash className="mr-2" />
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component
const UserManagement = () => {
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        membershipLevel: '',
        registrationMethod: '',
        registrationDate: ''
    });

    const [viewMode, setViewMode] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const itemsPerPage = 10;

    // Membership levels data
    const membershipLevels = [
        { id: 'basic', name: 'Basic' },
        { id: 'silver', name: 'Silver' },
        { id: 'gold', name: 'Gold' },
        { id: 'platinum', name: 'Platinum' }
    ];

    // Generate sample user data
    const generateSampleUsers = () => {
        const result = [];
        const statuses = ['active', 'inactive', 'locked'];
        const registrationMethods = ['direct', 'facebook', 'google'];
        // eslint-disable-next-line
        const membershipLevelOptions = ['Basic', 'Silver', 'Gold', 'Platinum'];
        const favoriteGenresOptions = [
            'Hành động',
            'Phiêu lưu',
            'Hoạt hình',
            'Hài hước',
            'Tội phạm',
            'Tài liệu',
            'Chính kịch',
            'Gia đình',
            'Giả tưởng',
            'Lịch sử',
            'Kinh dị',
            'Âm nhạc',
            'Bí ẩn',
            'Lãng mạn',
            'Khoa học viễn tưởng',
            'TV Movie',
            'Ly kỳ',
            'Chiến tranh',
            'Cao bồi'
        ];

        // Generate 100 sample users
        for (let i = 1; i <= 100; i++) {
            const userId = `USER${String(i).padStart(6, '0')}`;

            // Random registration date (within the last 2 years)
            const today = new Date();
            const twoYearsAgo = new Date(today);
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

            const registrationTimestamp =
                twoYearsAgo.getTime() +
                Math.random() * (today.getTime() - twoYearsAgo.getTime());
            const registrationDate = new Date(
                registrationTimestamp
            ).toISOString();

            // Random status
            const status =
                statuses[Math.floor(Math.random() * statuses.length)];

            // Locked date if status is locked
            let lockedDate = null;
            if (status === 'locked') {
                const lockTimestamp =
                    new Date(registrationTimestamp).getTime() +
                    Math.random() *
                        (today.getTime() -
                            new Date(registrationTimestamp).getTime());
                lockedDate = new Date(lockTimestamp).toISOString();
            }

            // Last login date
            let lastLogin = null;
            if (status !== 'locked') {
                const loginTimestamp =
                    new Date(registrationTimestamp).getTime() +
                    Math.random() *
                        (today.getTime() -
                            new Date(registrationTimestamp).getTime());
                lastLogin = new Date(loginTimestamp).toISOString();
            }

            // Random registration method
            const registrationMethod =
                registrationMethods[
                    Math.floor(Math.random() * registrationMethods.length)
                ];

            // Random membership level (weighted towards Basic)
            const membershipLevel =
                Math.random() < 0.6
                    ? 'Basic'
                    : Math.random() < 0.7
                      ? 'Silver'
                      : Math.random() < 0.8
                        ? 'Gold'
                        : 'Platinum';

            // Random watch count and points
            const watchedMovies = Math.floor(Math.random() * 50);
            const purchasedTickets = Math.floor(Math.random() * 80);

            // Points based on membership level and activity
            let points = 0;
            switch (membershipLevel) {
                case 'Basic':
                    points = Math.floor(Math.random() * 1000);
                    break;
                case 'Silver':
                    points = 1000 + Math.floor(Math.random() * 4000);
                    break;
                case 'Gold':
                    points = 5000 + Math.floor(Math.random() * 5000);
                    break;
                case 'Platinum':
                    points = 10000 + Math.floor(Math.random() * 10000);
                    break;
                default:
                    points = Math.floor(Math.random() * 1000);
            }

            // Random favorite genres (1-4 genres)
            const numGenres = Math.floor(Math.random() * 4) + 1;
            const favoriteGenres = [];
            const usedGenres = new Set();

            for (let j = 0; j < numGenres; j++) {
                let genre;
                do {
                    genre =
                        favoriteGenresOptions[
                            Math.floor(
                                Math.random() * favoriteGenresOptions.length
                            )
                        ];
                } while (usedGenres.has(genre));

                usedGenres.add(genre);
                favoriteGenres.push(genre);
            }

            // Random review count
            const reviewsCount = Math.floor(Math.random() * 20);

            // Generate sample recent transactions (0-5 transactions)
            const numTransactions = Math.floor(Math.random() * 6);
            const recentTransactions = [];

            for (let j = 0; j < numTransactions; j++) {
                const transactionDate = new Date(
                    new Date(registrationTimestamp).getTime() +
                        Math.random() *
                            (today.getTime() -
                                new Date(registrationTimestamp).getTime())
                ).toISOString();

                const movies = [
                    'Nhà Giả Tiền',
                    'Quỷ Nhập Tràng',
                    'Tiếng Vọng Kinh Hoàng',
                    'Sát Thủ Vô Cùng Cực Hại',
                    'Biệt Đội Đánh Thuê',
                    'Venom: Đối Mặt Tử Thù'
                ];

                recentTransactions.push({
                    id: `TX${Math.floor(Math.random() * 1000000)
                        .toString()
                        .padStart(6, '0')}`,
                    date: transactionDate,
                    movie: movies[Math.floor(Math.random() * movies.length)],
                    quantity: Math.floor(Math.random() * 4) + 1,
                    amount: (Math.floor(Math.random() * 5) + 1) * 50000
                });
            }

            // Sort transactions by date (newest first)
            recentTransactions.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            // Create user object
            result.push({
                id: userId,
                name: `Người dùng ${i}`,
                email: `user${i}@example.com`,
                phone:
                    Math.random() < 0.8
                        ? `09${Math.floor(Math.random() * 100000000)
                              .toString()
                              .padStart(8, '0')}`
                        : null,
                address:
                    Math.random() < 0.5
                        ? `${Math.floor(Math.random() * 100)} Đường ${Math.floor(Math.random() * 50)}, Quận ${Math.floor(Math.random() * 12)}, TP.HCM`
                        : null,
                registrationDate,
                registrationMethod,
                status,
                lockedDate,
                lastLogin,
                membershipLevel,
                avatar:
                    Math.random() < 0.7
                        ? null
                        : `https://i.pravatar.cc/300?img=${i % 70}`,
                watchedMovies,
                purchasedTickets,
                points,
                favoriteGenres,
                reviewsCount,
                recentTransactions
            });
        }

        // Sort users by registration date (newest first)
        result.sort((a, b) => {
            return new Date(b.registrationDate) - new Date(a.registrationDate);
        });

        return result;
    };

    // Load sample data
    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            const generatedUsers = generateSampleUsers();
            setUsers(generatedUsers);
            setFilteredUsers(generatedUsers);
            setIsLoading(false);
        }, 800);
    }, []);

    // Filter users when filters change
    useEffect(() => {
        let result = [...users];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower) ||
                    (user.phone && user.phone.includes(searchLower))
            );
        }

        // Apply status filter
        if (filters.status) {
            result = result.filter((user) => user.status === filters.status);
        }

        // Apply membership level filter
        if (filters.membershipLevel) {
            const levelName = membershipLevels.find(
                (level) => level.id === filters.membershipLevel
            )?.name;
            if (levelName) {
                result = result.filter(
                    (user) => user.membershipLevel === levelName
                );
            }
        }

        // Apply registration method filter
        if (filters.registrationMethod) {
            result = result.filter(
                (user) => user.registrationMethod === filters.registrationMethod
            );
        }

        // Apply registration date filter
        if (filters.registrationDate) {
            const filterDate = filters.registrationDate;
            result = result.filter((user) => {
                const userDate = user.registrationDate.substring(0, 10); // YYYY-MM-DD
                return userDate === filterDate;
            });
        }

        setFilteredUsers(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, users]);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        if (filterName === 'reset') {
            setFilters({
                search: '',
                status: '',
                membershipLevel: '',
                registrationMethod: '',
                registrationDate: ''
            });
        } else {
            setFilters({
                ...filters,
                [filterName]: value
            });
        }
    };

    // Toggle view mode
    // eslint-disable-next-line
    const toggleViewMode = () => {
        setViewMode(viewMode === 'table' ? 'grid' : 'table');
    };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Get paginated users
    const getPaginatedUsers = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
    };

    // User actions
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowUserDetails(true);
    };

    const handleEditUser = (user) => {
        // In a real app, you would redirect to edit page or show an edit modal
        alert(`Chỉnh sửa người dùng: ${user.name}`);
    };

    const handleDeleteUser = (user) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa người dùng "${user.name}" không? Thao tác này không thể hoàn tác.`
            )
        ) {
            // In a real app, you would call an API to delete the user
            const updatedUsers = users.filter((u) => u.id !== user.id);
            setUsers(updatedUsers);

            // Close modal if the deleted user is being viewed
            if (selectedUser && selectedUser.id === user.id) {
                setShowUserDetails(false);
            }

            alert(`Đã xóa người dùng: ${user.name}`);
        }
    };

    const handleToggleUserStatus = (user) => {
        // In a real app, you would call an API to update the user's status
        const newStatus = user.status === 'locked' ? 'active' : 'locked';
        const updatedUsers = users.map((u) => {
            if (u.id === user.id) {
                return {
                    ...u,
                    status: newStatus,
                    lockedDate:
                        newStatus === 'locked' ? new Date().toISOString() : null
                };
            }
            return u;
        });

        setUsers(updatedUsers);

        // Update the selected user if they're being viewed
        if (selectedUser && selectedUser.id === user.id) {
            setSelectedUser({
                ...selectedUser,
                status: newStatus,
                lockedDate:
                    newStatus === 'locked' ? new Date().toISOString() : null
            });
        }

        alert(
            `Đã ${newStatus === 'locked' ? 'khóa' : 'mở khóa'} tài khoản: ${user.name}`
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader title="Danh sách người dùng" />

            <div className="container mx-auto">
                <FiltersSection
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    membershipLevels={membershipLevels}
                />

                {/* View mode toggle and stats */}
                <div className="bg-white p-4 border-b border-gray-300 flex flex-wrap justify-between items-center">
                    <div className="flex space-x-6">
                        <div className="text-sm">
                            <span className="text-gray-500">
                                Tổng số người dùng:
                            </span>
                            <span className="ml-1 font-semibold">
                                {filteredUsers.length}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">
                                Đang hoạt động:
                            </span>
                            <span className="ml-1 font-semibold text-green-600">
                                {
                                    filteredUsers.filter(
                                        (u) => u.status === 'active'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">
                                Không hoạt động:
                            </span>
                            <span className="ml-1 font-semibold text-gray-600">
                                {
                                    filteredUsers.filter(
                                        (u) => u.status === 'inactive'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Đã khóa:</span>
                            <span className="ml-1 font-semibold text-red-600">
                                {
                                    filteredUsers.filter(
                                        (u) => u.status === 'locked'
                                    ).length
                                }
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-l-md border border-gray-300 ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                            title="Xem dạng bảng"
                        >
                            <FaTable />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-r-md border border-gray-300 border-l-0 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-600'}`}
                            title="Xem dạng lưới"
                        >
                            <FaThList />
                        </button>

                        <div className="ml-4">
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                                onChange={(e) => {
                                    // Handle sorting logic here
                                    const sortOption = e.target.value;
                                    let sortedUsers = [...filteredUsers];

                                    switch (sortOption) {
                                        case 'name_asc':
                                            sortedUsers.sort((a, b) =>
                                                a.name.localeCompare(b.name)
                                            );
                                            break;
                                        case 'name_desc':
                                            sortedUsers.sort((a, b) =>
                                                b.name.localeCompare(a.name)
                                            );
                                            break;
                                        case 'newest':
                                            sortedUsers.sort(
                                                (a, b) =>
                                                    new Date(
                                                        b.registrationDate
                                                    ) -
                                                    new Date(a.registrationDate)
                                            );
                                            break;
                                        case 'oldest':
                                            sortedUsers.sort(
                                                (a, b) =>
                                                    new Date(
                                                        a.registrationDate
                                                    ) -
                                                    new Date(b.registrationDate)
                                            );
                                            break;
                                        case 'most_active':
                                            sortedUsers.sort(
                                                (a, b) =>
                                                    b.watchedMovies -
                                                    a.watchedMovies
                                            );
                                            break;
                                        case 'points_desc':
                                            sortedUsers.sort(
                                                (a, b) => b.points - a.points
                                            );
                                            break;
                                        default:
                                            break;
                                    }

                                    setFilteredUsers(sortedUsers);
                                }}
                            >
                                <option value="newest">Đăng ký mới nhất</option>
                                <option value="oldest">Đăng ký cũ nhất</option>
                                <option value="name_asc">Tên (A-Z)</option>
                                <option value="name_desc">Tên (Z-A)</option>
                                <option value="most_active">
                                    Hoạt động nhiều nhất
                                </option>
                                <option value="points_desc">
                                    Điểm cao nhất
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <EmptyState
                        onResetFilters={() => handleFilterChange('reset')}
                    />
                ) : (
                    <>
                        <UserList
                            users={getPaginatedUsers()}
                            onViewUser={handleViewUser}
                            onEditUser={handleEditUser}
                            onDeleteUser={handleDeleteUser}
                            onToggleUserStatus={handleToggleUserStatus}
                            viewMode={viewMode}
                        />

                        <Pagination
                            totalItems={filteredUsers.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* User Details Modal */}
            {showUserDetails && selectedUser && (
                <UserDetailsModal
                    user={selectedUser}
                    onClose={() => setShowUserDetails(false)}
                    onEdit={handleEditUser}
                    onToggleStatus={handleToggleUserStatus}
                    onDelete={handleDeleteUser}
                />
            )}
        </div>
    );
};

export default UserManagement;
