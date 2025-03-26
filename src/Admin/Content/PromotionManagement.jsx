import React, { useState, useEffect } from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaFileExport,
    FaSync,
    FaCalendarAlt,
    FaRegCalendarCheck,
    FaPercentage,
    FaTicketAlt,
    FaTags,
    FaQrcode,
    FaChartLine,
    FaCheck,
    FaTimes,
    FaClock,
    FaExclamationTriangle,
    FaCopy,
    FaTable,
    FaThList,
    FaUsers,
    FaStore,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { format, parseISO, isAfter, isBefore, isSameDay } from 'date-fns';

// Admin Header Component
const AdminHeader = ({ title }) => {
    return (
        <div className="admin-header p-4 bg-white border-b border-gray-300 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaPlus className="mr-2" />
                    Thêm khuyến mãi
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
const FiltersSection = ({ onFilterChange, filters }) => {
    return (
        <div className="filters-section p-4 bg-white border-b border-gray-300">
            <div className="flex flex-wrap gap-4">
                <div className="search-box flex-grow md:flex-grow-0 md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, mã khuyến mãi..."
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
                        <option value="scheduled">Sắp diễn ra</option>
                        <option value="ended">Đã kết thúc</option>
                        <option value="paused">Tạm dừng</option>
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.type}
                        onChange={(e) => onFilterChange('type', e.target.value)}
                    >
                        <option value="">Tất cả loại khuyến mãi</option>
                        <option value="percentage">Giảm theo phần trăm</option>
                        <option value="fixed">Giảm giá trực tiếp</option>
                        <option value="bogo">Mua 1 tặng 1</option>
                        <option value="combo">Ưu đãi combo</option>
                        <option value="special">Sự kiện đặc biệt</option>
                    </select>
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.target}
                        onChange={(e) =>
                            onFilterChange('target', e.target.value)
                        }
                    >
                        <option value="">Tất cả đối tượng</option>
                        <option value="all">Tất cả khách hàng</option>
                        <option value="new">Khách hàng mới</option>
                        <option value="loyalty">Thành viên thân thiết</option>
                        <option value="birthday">Sinh nhật</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <span className="mr-2 text-gray-700">Ngày:</span>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.date}
                        onChange={(e) => onFilterChange('date', e.target.value)}
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
        case 'scheduled':
            badgeClass += ' bg-blue-100 text-blue-800';
            icon = <FaRegCalendarCheck className="mr-1" />;
            text = 'Sắp diễn ra';
            break;
        case 'ended':
            badgeClass += ' bg-gray-100 text-gray-800';
            icon = <FaTimes className="mr-1" />;
            text = 'Đã kết thúc';
            break;
        case 'paused':
            badgeClass += ' bg-yellow-100 text-yellow-800';
            icon = <FaClock className="mr-1" />;
            text = 'Tạm dừng';
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

// Promotion Type Badge Component
const TypeBadge = ({ type }) => {
    let badgeClass =
        'px-2 py-1 rounded-md text-xs font-medium flex items-center';
    let icon = null;
    let text = '';

    switch (type) {
        case 'percentage':
            badgeClass += ' bg-blue-100 text-blue-800';
            icon = <FaPercentage className="mr-1" />;
            text = 'Giảm %';
            break;
        case 'fixed':
            badgeClass += ' bg-green-100 text-green-800';
            icon = <FaTags className="mr-1" />;
            text = 'Giảm giá trực tiếp';
            break;
        case 'bogo':
            badgeClass += ' bg-purple-100 text-purple-800';
            icon = <FaTicketAlt className="mr-1" />;
            text = 'Mua 1 tặng 1';
            break;
        case 'combo':
            badgeClass += ' bg-indigo-100 text-indigo-800';
            icon = <FaStore className="mr-1" />;
            text = 'Ưu đãi combo';
            break;
        case 'special':
            badgeClass += ' bg-yellow-100 text-yellow-800';
            icon = <FaExclamationTriangle className="mr-1" />;
            text = 'Sự kiện đặc biệt';
            break;
        default:
            badgeClass += ' bg-gray-100 text-gray-800';
            text = 'Khác';
    }

    return (
        <span className={badgeClass}>
            {icon}
            {text}
        </span>
    );
};

// Target Badge Component
const TargetBadge = ({ target }) => {
    let badgeClass =
        'px-2 py-1 rounded-md text-xs font-medium flex items-center';
    let icon = null;
    let text = '';

    switch (target) {
        case 'all':
            badgeClass += ' bg-teal-100 text-teal-800';
            icon = <FaUsers className="mr-1" />;
            text = 'Tất cả';
            break;
        case 'new':
            badgeClass += ' bg-cyan-100 text-cyan-800';
            icon = <FaUsers className="mr-1" />;
            text = 'Khách mới';
            break;
        case 'loyalty':
            badgeClass += ' bg-purple-100 text-purple-800';
            icon = <FaUsers className="mr-1" />;
            text = 'Thành viên thân thiết';
            break;
        case 'birthday':
            badgeClass += ' bg-pink-100 text-pink-800';
            icon = <FaUsers className="mr-1" />;
            text = 'Sinh nhật';
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

// Promotion Card Component (for grid view)
const PromotionCard = ({
    promotion,
    onViewPromotion,
    onEditPromotion,
    onDeletePromotion,
    onToggleStatus
}) => {
    // Function to copy promo code to clipboard
    const copyToClipboard = (e, code) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        alert(`Đã sao chép: ${code}`);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{promotion.name}</h3>
                <StatusBadge status={promotion.status} />
            </div>

            <div className="p-4">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <TypeBadge type={promotion.type} />
                        <TargetBadge target={promotion.target} />
                    </div>

                    <div className="bg-gray-50 p-3 rounded flex items-center justify-between">
                        <div className="text-gray-700 font-medium tracking-wide truncate">
                            {promotion.code}
                        </div>
                        <button
                            onClick={(e) => copyToClipboard(e, promotion.code)}
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                            title="Sao chép mã"
                        >
                            <FaCopy />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <div className="text-gray-500">Giá trị</div>
                            <div className="font-semibold text-gray-800">
                                {promotion.type === 'percentage'
                                    ? promotion.value + '%'
                                    : promotion.type === 'fixed'
                                      ? promotion.value.toLocaleString() + ' ₫'
                                      : promotion.type === 'bogo'
                                        ? 'Mua 1 tặng 1'
                                        : promotion.type === 'combo'
                                          ? 'Combo'
                                          : 'Đặc biệt'}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500">Lượt sử dụng</div>
                            <div className="font-semibold text-gray-800">
                                {promotion.usageCount}/
                                {promotion.usageLimit || '∞'}
                            </div>
                        </div>
                    </div>

                    <div className="text-sm">
                        <div className="text-gray-500 mb-1">
                            Thời gian áp dụng
                        </div>
                        <div className="flex items-center text-gray-800">
                            <FaCalendarAlt className="text-gray-400 mr-1" />
                            <span>
                                {format(
                                    parseISO(promotion.startDate),
                                    'dd/MM/yyyy'
                                )}
                            </span>
                            <span className="mx-2">-</span>
                            <span>
                                {format(
                                    parseISO(promotion.endDate),
                                    'dd/MM/yyyy'
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-green-600 font-medium">
                        {promotion.status === 'active' ||
                        promotion.status === 'scheduled'
                            ? `Còn ${Math.ceil((new Date(promotion.endDate) - new Date()) / (1000 * 60 * 60 * 24))} ngày`
                            : 'Đã kết thúc'}
                    </div>

                    <div className="flex space-x-1">
                        <button
                            onClick={() => onViewPromotion(promotion)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                        >
                            <FaEye />
                        </button>
                        <button
                            onClick={() => onEditPromotion(promotion)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Chỉnh sửa"
                        >
                            <FaEdit />
                        </button>
                        {promotion.status === 'active' ? (
                            <button
                                onClick={() =>
                                    onToggleStatus(promotion, 'paused')
                                }
                                className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"
                                title="Tạm dừng"
                            >
                                <FaClock />
                            </button>
                        ) : promotion.status === 'paused' ? (
                            <button
                                onClick={() =>
                                    onToggleStatus(promotion, 'active')
                                }
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                title="Kích hoạt"
                            >
                                <FaCheck />
                            </button>
                        ) : null}
                        <button
                            onClick={() => onDeletePromotion(promotion)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Xóa"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Promotion List Component
const PromotionList = ({
    promotions,
    onViewPromotion,
    onEditPromotion,
    onDeletePromotion,
    onToggleStatus,
    viewMode
}) => {
    // Function to copy promo code to clipboard
    const copyToClipboard = (e, code) => {
        e.stopPropagation();
        navigator.clipboard.writeText(code);
        alert(`Đã sao chép: ${code}`);
    };

    return (
        <div>
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {promotions.map((promotion) => (
                        <PromotionCard
                            key={promotion.id}
                            promotion={promotion}
                            onViewPromotion={onViewPromotion}
                            onEditPromotion={onEditPromotion}
                            onDeletePromotion={onDeletePromotion}
                            onToggleStatus={onToggleStatus}
                        />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Tên khuyến mãi
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Mã
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Loại
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Giá trị
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Đối tượng
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Thời gian
                                </th>
                                <th className="py-3 px-4 text-left font-medium border-b border-gray-200">
                                    Lượt dùng
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
                            {promotions.map((promotion) => (
                                <tr
                                    key={promotion.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4 text-gray-800">
                                        <div className="font-medium">
                                            {promotion.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            ID: {promotion.id}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded">
                                                {promotion.code}
                                            </span>
                                            <button
                                                onClick={(e) =>
                                                    copyToClipboard(
                                                        e,
                                                        promotion.code
                                                    )
                                                }
                                                className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                                                title="Sao chép mã"
                                            >
                                                <FaCopy />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <TypeBadge type={promotion.type} />
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {promotion.type === 'percentage'
                                            ? promotion.value + '%'
                                            : promotion.type === 'fixed'
                                              ? promotion.value.toLocaleString() +
                                                ' ₫'
                                              : promotion.type === 'bogo'
                                                ? 'Mua 1 tặng 1'
                                                : promotion.type === 'combo'
                                                  ? 'Combo'
                                                  : 'Đặc biệt'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <TargetBadge
                                            target={promotion.target}
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        <div>
                                            {format(
                                                parseISO(promotion.startDate),
                                                'dd/MM/yyyy'
                                            )}
                                        </div>
                                        <div className="text-gray-500">
                                            đến{' '}
                                            {format(
                                                parseISO(promotion.endDate),
                                                'dd/MM/yyyy'
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {promotion.usageCount}/
                                        {promotion.usageLimit || '∞'}
                                    </td>
                                    <td className="py-3 px-4">
                                        <StatusBadge
                                            status={promotion.status}
                                        />
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-center space-x-1">
                                            <button
                                                onClick={() =>
                                                    onViewPromotion(promotion)
                                                }
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onEditPromotion(promotion)
                                                }
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Chỉnh sửa"
                                            >
                                                <FaEdit />
                                            </button>
                                            {promotion.status === 'active' ? (
                                                <button
                                                    onClick={() =>
                                                        onToggleStatus(
                                                            promotion,
                                                            'paused'
                                                        )
                                                    }
                                                    className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded"
                                                    title="Tạm dừng"
                                                >
                                                    <FaClock />
                                                </button>
                                            ) : promotion.status ===
                                              'paused' ? (
                                                <button
                                                    onClick={() =>
                                                        onToggleStatus(
                                                            promotion,
                                                            'active'
                                                        )
                                                    }
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                                                    title="Kích hoạt"
                                                >
                                                    <FaCheck />
                                                </button>
                                            ) : null}
                                            <button
                                                onClick={() =>
                                                    onDeletePromotion(promotion)
                                                }
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
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
            )}
        </div>
    );
};

// Empty State Component
const EmptyState = ({ onResetFilters }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FaTicketAlt className="text-gray-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
                Không tìm thấy khuyến mãi nào
            </h3>
            <p className="text-gray-500 mb-4">
                Không có khuyến mãi nào phù hợp với bộ lọc đã chọn.
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
                {totalItems} khuyến mãi
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

// Promotion Details Modal Component
const PromotionDetailsModal = ({
    promotion,
    onClose,
    onEdit,
    onDelete,
    onToggleStatus
}) => {
    if (!promotion) return null;

    const today = new Date();
    const startDate = parseISO(promotion.startDate);
    const endDate = parseISO(promotion.endDate);
    const isActive = promotion.status === 'active';
    const isPaused = promotion.status === 'paused';
    const isScheduled = promotion.status === 'scheduled';
    // const isEnded = promotion.status === 'ended';

    // Function to copy promo code to clipboard
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Đã sao chép: ${code}`);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FaTicketAlt className="text-blue-600 mr-2" />
                        Chi tiết khuyến mãi
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
                        {/* Promotion basic info */}
                        <div className="md:w-1/3">
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-lg text-gray-800">
                                        {promotion.name}
                                    </h3>
                                    <StatusBadge status={promotion.status} />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <TypeBadge type={promotion.type} />
                                        <TargetBadge
                                            target={promotion.target}
                                        />
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            Mã khuyến mãi
                                        </div>
                                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                                            <span className="font-mono font-medium text-gray-800">
                                                {promotion.code}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    copyToClipboard(
                                                        promotion.code
                                                    )
                                                }
                                                className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                                                title="Sao chép mã"
                                            >
                                                <FaCopy />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            Giá trị khuyến mãi
                                        </div>
                                        <div className="font-bold text-xl text-gray-800">
                                            {promotion.type === 'percentage'
                                                ? promotion.value + '%'
                                                : promotion.type === 'fixed'
                                                  ? promotion.value.toLocaleString() +
                                                    ' ₫'
                                                  : promotion.type === 'bogo'
                                                    ? 'Mua 1 tặng 1'
                                                    : promotion.type === 'combo'
                                                      ? 'Combo'
                                                      : 'Đặc biệt'}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            Thời gian áp dụng
                                        </div>
                                        <div className="text-gray-800">
                                            <div className="flex items-center mb-1">
                                                <FaRegCalendarCheck className="text-green-600 mr-2" />
                                                <span>
                                                    Bắt đầu:{' '}
                                                    {format(
                                                        startDate,
                                                        'HH:mm - dd/MM/yyyy'
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaRegCalendarCheck className="text-red-600 mr-2" />
                                                <span>
                                                    Kết thúc:{' '}
                                                    {format(
                                                        endDate,
                                                        'HH:mm - dd/MM/yyyy'
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-3">
                                    QR Code
                                </h3>
                                <div className="bg-white p-3 rounded-lg flex flex-col items-center">
                                    <div className="bg-gray-100 p-3 rounded-lg mb-2">
                                        <FaQrcode className="text-gray-800 text-7xl" />
                                    </div>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm mt-2 flex items-center"
                                        onClick={() =>
                                            alert(
                                                'Tính năng tải QR code sẽ được bổ sung!'
                                            )
                                        }
                                    >
                                        <FaDownload className="mr-1" />
                                        Tải QR Code
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Promotion details and stats */}
                        <div className="md:w-2/3">
                            {/* Usage Stats */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaChartLine className="mr-2 text-blue-600" />
                                    Thống kê sử dụng
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-blue-600">
                                            {promotion.usageCount}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Lượt đã sử dụng
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-green-600">
                                            {promotion.usageLimit
                                                ? Math.max(
                                                      0,
                                                      promotion.usageLimit -
                                                          promotion.usageCount
                                                  )
                                                : '∞'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Lượt còn lại
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-purple-600">
                                            {promotion.viewCount}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Lượt xem
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg text-center">
                                        <div className="text-lg font-bold text-yellow-600">
                                            {promotion.usageCount > 0
                                                ? Math.round(
                                                      (promotion.usageCount /
                                                          promotion.viewCount) *
                                                          100
                                                  ) + '%'
                                                : '0%'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Tỉ lệ chuyển đổi
                                        </div>
                                    </div>
                                </div>

                                {/* Usage progress bar */}
                                {promotion.usageLimit && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">
                                                Tiến độ sử dụng
                                            </span>
                                            <span className="text-gray-600">
                                                {promotion.usageCount}/
                                                {promotion.usageLimit}(
                                                {Math.round(
                                                    (promotion.usageCount /
                                                        promotion.usageLimit) *
                                                        100
                                                )}
                                                %)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${Math.min(100, Math.round((promotion.usageCount / promotion.usageLimit) * 100))}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Time remaining */}
                                {(isActive || isScheduled) && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">
                                                Thời gian còn lại
                                            </span>
                                            <span className="text-gray-600">
                                                {Math.ceil(
                                                    (endDate - today) /
                                                        (1000 * 60 * 60 * 24)
                                                )}{' '}
                                                ngày
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-green-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        Math.max(
                                                            0,
                                                            Math.round(
                                                                ((endDate -
                                                                    today) /
                                                                    (endDate -
                                                                        startDate)) *
                                                                    100
                                                            )
                                                        )
                                                    )}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Conditions and Details */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h3 className="font-medium text-gray-800 mb-3">
                                    Điều kiện áp dụng
                                </h3>

                                <div className="bg-white p-4 rounded-lg mb-4">
                                    <div className="space-y-3">
                                        {promotion.minPurchase && (
                                            <div className="flex items-start">
                                                <div className="text-green-500 mt-0.5 mr-2">
                                                    <FaCheck />
                                                </div>
                                                <div>
                                                    <p className="text-gray-800">
                                                        Giá trị đơn hàng tối
                                                        thiểu
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {promotion.minPurchase.toLocaleString()}{' '}
                                                        ₫
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {promotion.maxDiscount && (
                                            <div className="flex items-start">
                                                <div className="text-green-500 mt-0.5 mr-2">
                                                    <FaCheck />
                                                </div>
                                                <div>
                                                    <p className="text-gray-800">
                                                        Giảm giá tối đa
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {promotion.maxDiscount.toLocaleString()}{' '}
                                                        ₫
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {promotion.applicableProducts && (
                                            <div className="flex items-start">
                                                <div className="text-green-500 mt-0.5 mr-2">
                                                    <FaCheck />
                                                </div>
                                                <div>
                                                    <p className="text-gray-800">
                                                        Áp dụng cho sản phẩm
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {promotion.applicableProducts ===
                                                        'all'
                                                            ? 'Tất cả sản phẩm'
                                                            : promotion.applicableProducts ===
                                                                'ticket'
                                                              ? 'Chỉ áp dụng cho vé'
                                                              : promotion.applicableProducts ===
                                                                  'food'
                                                                ? 'Chỉ áp dụng cho đồ ăn'
                                                                : 'Sản phẩm được chỉ định'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {promotion.usageLimit && (
                                            <div className="flex items-start">
                                                <div className="text-green-500 mt-0.5 mr-2">
                                                    <FaCheck />
                                                </div>
                                                <div>
                                                    <p className="text-gray-800">
                                                        Giới hạn lượt sử dụng
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {promotion.usageLimit}{' '}
                                                        lần
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {promotion.usagePerUser && (
                                            <div className="flex items-start">
                                                <div className="text-green-500 mt-0.5 mr-2">
                                                    <FaCheck />
                                                </div>
                                                <div>
                                                    <p className="text-gray-800">
                                                        Giới hạn sử dụng mỗi
                                                        người
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {promotion.usagePerUser}{' '}
                                                        lần/người
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {promotion.description && (
                                    <div>
                                        <h3 className="font-medium text-gray-800 mb-2">
                                            Mô tả
                                        </h3>
                                        <div className="bg-white p-4 rounded-lg mb-4">
                                            <p className="text-gray-800 whitespace-pre-line">
                                                {promotion.description}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Promotion actions */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-3">
                                    Quản lý khuyến mãi
                                </h3>

                                <div className="flex flex-wrap gap-3 justify-end">
                                    <button
                                        onClick={() => onEdit(promotion)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <FaEdit className="mr-2" />
                                        Chỉnh sửa
                                    </button>

                                    {(isActive || isScheduled) && (
                                        <button
                                            onClick={() =>
                                                onToggleStatus(
                                                    promotion,
                                                    'paused'
                                                )
                                            }
                                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center"
                                        >
                                            <FaClock className="mr-2" />
                                            Tạm dừng
                                        </button>
                                    )}

                                    {isPaused && (
                                        <button
                                            onClick={() =>
                                                onToggleStatus(
                                                    promotion,
                                                    'active'
                                                )
                                            }
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                                        >
                                            <FaCheck className="mr-2" />
                                            Kích hoạt
                                        </button>
                                    )}

                                    <button
                                        onClick={() => onDelete(promotion)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                                    >
                                        <FaTrash className="mr-2" />
                                        Xóa
                                    </button>

                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        Đóng
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
const PromotionManagement = () => {
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        type: '',
        target: '',
        date: ''
    });

    const [viewMode, setViewMode] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [showPromotionDetails, setShowPromotionDetails] = useState(false);
    const itemsPerPage = 10;

    // Generate sample promotion data
    const generateSamplePromotions = () => {
        const result = [];
        // const statuses = ['active', 'scheduled', 'ended', 'paused'];
        const types = ['percentage', 'fixed', 'bogo', 'combo', 'special'];
        const targets = ['all', 'new', 'loyalty', 'birthday'];
        const today = new Date();

        // Generate 50 sample promotions
        for (let i = 1; i <= 50; i++) {
            const promotionId = `PROMO${String(i).padStart(4, '0')}`;

            // Random type
            const type = types[Math.floor(Math.random() * types.length)];

            // Random value based on type
            let value = 0;
            if (type === 'percentage') {
                // Random percentage between 5% and 50%
                value = Math.floor(Math.random() * 46) + 5;
            } else if (type === 'fixed') {
                // Random fixed amount between 10,000 and 200,000
                value = (Math.floor(Math.random() * 20) + 1) * 10000;
            }

            // Random target audience
            const target = targets[Math.floor(Math.random() * targets.length)];

            // Random dates
            const randomDaysOffset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days from today
            const startDate = new Date(today);
            startDate.setDate(startDate.getDate() + randomDaysOffset);

            const endDate = new Date(startDate);
            endDate.setDate(
                endDate.getDate() + Math.floor(Math.random() * 30) + 5
            ); // 5 to 35 days duration

            // Determine status based on dates
            let status;
            if (isBefore(endDate, today)) {
                status = 'ended';
            } else if (isAfter(startDate, today)) {
                status = 'scheduled';
            } else {
                status = Math.random() < 0.8 ? 'active' : 'paused';
            }

            // Random usage count and limits
            const usageLimit =
                Math.random() < 0.7
                    ? Math.floor(Math.random() * 500) + 50
                    : null;
            const usageCount = usageLimit
                ? Math.floor(Math.random() * (usageLimit * 0.8))
                : Math.floor(Math.random() * 400);
            const viewCount = Math.floor(usageCount * (Math.random() * 3 + 2)); // 2-5 times the usage count

            // Random min purchase and max discount
            const minPurchase =
                Math.random() < 0.6
                    ? (Math.floor(Math.random() * 10) + 1) * 50000
                    : null;
            const maxDiscount =
                type === 'percentage' && Math.random() < 0.7
                    ? (Math.floor(Math.random() * 10) + 1) * 50000
                    : null;

            // Random applicable products
            const applicableProducts = ['all', 'ticket', 'food'][
                Math.floor(Math.random() * 3)
            ];

            // Random usage per user
            const usagePerUser =
                Math.random() < 0.5 ? Math.floor(Math.random() * 3) + 1 : null;

            // Generate promotion code
            const codePrefix =
                type === 'percentage'
                    ? 'PHAN'
                    : type === 'fixed'
                      ? 'GIAM'
                      : type === 'bogo'
                        ? 'MUA1'
                        : type === 'combo'
                          ? 'COMBO'
                          : 'EVENT';
            const code = `${codePrefix}${String(i).padStart(2, '0')}${Math.floor(
                Math.random() * 1000
            )
                .toString()
                .padStart(3, '0')}`;

            // Create promotion object
            result.push({
                id: promotionId,
                name: `Khuyến mãi ${i}`,
                code,
                type,
                value,
                target,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                status,
                usageCount,
                usageLimit,
                viewCount,
                minPurchase,
                maxDiscount,
                applicableProducts,
                usagePerUser,
                description: `Đây là chương trình khuyến mãi ${i}. Áp dụng cho ${target === 'all' ? 'tất cả khách hàng' : target === 'new' ? 'khách hàng mới' : target === 'loyalty' ? 'thành viên thân thiết' : 'khách hàng có sinh nhật'}.`
            });
        }

        // Sort promotions by status and then by start date (newest first)
        result.sort((a, b) => {
            // First sort by status priority: active > scheduled > paused > ended
            const statusPriority = {
                active: 0,
                scheduled: 1,
                paused: 2,
                ended: 3
            };
            if (statusPriority[a.status] !== statusPriority[b.status]) {
                return statusPriority[a.status] - statusPriority[b.status];
            }

            // Then sort by start date (newest first)
            return new Date(b.startDate) - new Date(a.startDate);
        });

        return result;
    };

    // Load sample data
    useEffect(() => {
        // Simulate API call delay
        setTimeout(() => {
            const generatedPromotions = generateSamplePromotions();
            setPromotions(generatedPromotions);
            setFilteredPromotions(generatedPromotions);
            setIsLoading(false);
        }, 800);
    }, []);

    // Filter promotions when filters change
    useEffect(() => {
        filterPromotions();
    }, [filters, promotions]);

    // Filter promotions based on current filters
    const filterPromotions = () => {
        let result = [...promotions];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (promotion) =>
                    promotion.name.toLowerCase().includes(searchLower) ||
                    promotion.code.toLowerCase().includes(searchLower)
            );
        }

        // Apply status filter
        if (filters.status) {
            result = result.filter(
                (promotion) => promotion.status === filters.status
            );
        }

        // Apply type filter
        if (filters.type) {
            result = result.filter(
                (promotion) => promotion.type === filters.type
            );
        }

        // Apply target filter
        if (filters.target) {
            result = result.filter(
                (promotion) => promotion.target === filters.target
            );
        }

        // Apply date filter
        if (filters.date) {
            const filterDate = new Date(filters.date);
            result = result.filter((promotion) => {
                const startDate = parseISO(promotion.startDate);
                const endDate = parseISO(promotion.endDate);
                return (
                    isSameDay(filterDate, startDate) ||
                    isSameDay(filterDate, endDate) ||
                    (isAfter(filterDate, startDate) &&
                        isBefore(filterDate, endDate))
                );
            });
        }

        setFilteredPromotions(result);
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        if (filterName === 'reset') {
            setFilters({
                search: '',
                status: '',
                type: '',
                target: '',
                date: ''
            });
        } else {
            setFilters({
                ...filters,
                [filterName]: value
            });
        }
    };

    // Toggle view mode
    // const toggleViewMode = () => {
    //     setViewMode(viewMode === 'table' ? 'grid' : 'table');
    // };

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Get paginated promotions
    const getPaginatedPromotions = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredPromotions.slice(startIndex, startIndex + itemsPerPage);
    };

    // Promotion actions
    const handleViewPromotion = (promotion) => {
        setSelectedPromotion(promotion);
        setShowPromotionDetails(true);
    };

    const handleEditPromotion = (promotion) => {
        // In a real app, you would redirect to edit page or show an edit modal
        alert(`Chỉnh sửa khuyến mãi: ${promotion.name}`);
    };

    const handleDeletePromotion = (promotion) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa khuyến mãi "${promotion.name}" không? Thao tác này không thể hoàn tác.`
            )
        ) {
            // In a real app, you would call an API to delete the promotion
            const updatedPromotions = promotions.filter(
                (p) => p.id !== promotion.id
            );
            setPromotions(updatedPromotions);

            // Close modal if the deleted promotion is being viewed
            if (selectedPromotion && selectedPromotion.id === promotion.id) {
                setShowPromotionDetails(false);
            }

            alert(`Đã xóa khuyến mãi: ${promotion.name}`);
        }
    };

    const handleToggleStatus = (promotion, newStatus) => {
        // In a real app, you would call an API to update the promotion's status
        const updatedPromotions = promotions.map((p) => {
            if (p.id === promotion.id) {
                return { ...p, status: newStatus };
            }
            return p;
        });

        setPromotions(updatedPromotions);

        // Update the selected promotion if it's being viewed
        if (selectedPromotion && selectedPromotion.id === promotion.id) {
            setSelectedPromotion({
                ...selectedPromotion,
                status: newStatus
            });
        }

        alert(
            `Đã ${newStatus === 'active' ? 'kích hoạt' : 'tạm dừng'} khuyến mãi: ${promotion.name}`
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader title="Quản lý khuyến mãi" />

            <div className="container mx-auto">
                <FiltersSection
                    onFilterChange={handleFilterChange}
                    filters={filters}
                />

                {/* View mode toggle and stats */}
                <div className="bg-white p-4 border-b border-gray-300 flex flex-wrap justify-between items-center">
                    <div className="flex space-x-6">
                        <div className="text-sm">
                            <span className="text-gray-500">Tổng số:</span>
                            <span className="ml-1 font-semibold">
                                {filteredPromotions.length}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">
                                Đang hoạt động:
                            </span>
                            <span className="ml-1 font-semibold text-green-600">
                                {
                                    filteredPromotions.filter(
                                        (p) => p.status === 'active'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Sắp diễn ra:</span>
                            <span className="ml-1 font-semibold text-blue-600">
                                {
                                    filteredPromotions.filter(
                                        (p) => p.status === 'scheduled'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Tạm dừng:</span>
                            <span className="ml-1 font-semibold text-yellow-600">
                                {
                                    filteredPromotions.filter(
                                        (p) => p.status === 'paused'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Đã kết thúc:</span>
                            <span className="ml-1 font-semibold text-gray-600">
                                {
                                    filteredPromotions.filter(
                                        (p) => p.status === 'ended'
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
                                    let sortedPromotions = [
                                        ...filteredPromotions
                                    ];

                                    switch (sortOption) {
                                        case 'newest':
                                            sortedPromotions.sort(
                                                (a, b) =>
                                                    new Date(b.startDate) -
                                                    new Date(a.startDate)
                                            );
                                            break;
                                        case 'oldest':
                                            sortedPromotions.sort(
                                                (a, b) =>
                                                    new Date(a.startDate) -
                                                    new Date(b.startDate)
                                            );
                                            break;
                                        case 'end_date':
                                            sortedPromotions.sort(
                                                (a, b) =>
                                                    new Date(a.endDate) -
                                                    new Date(b.endDate)
                                            );
                                            break;
                                        case 'name_asc':
                                            sortedPromotions.sort((a, b) =>
                                                a.name.localeCompare(b.name)
                                            );
                                            break;
                                        case 'most_used':
                                            sortedPromotions.sort(
                                                (a, b) =>
                                                    b.usageCount - a.usageCount
                                            );
                                            break;
                                        default:
                                            break;
                                    }

                                    setFilteredPromotions(sortedPromotions);
                                }}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="oldest">Cũ nhất</option>
                                <option value="end_date">Ngày kết thúc</option>
                                <option value="name_asc">Tên (A-Z)</option>
                                <option value="most_used">Lượt sử dụng</option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredPromotions.length === 0 ? (
                    <EmptyState
                        onResetFilters={() => handleFilterChange('reset')}
                    />
                ) : (
                    <>
                        <PromotionList
                            promotions={getPaginatedPromotions()}
                            onViewPromotion={handleViewPromotion}
                            onEditPromotion={handleEditPromotion}
                            onDeletePromotion={handleDeletePromotion}
                            onToggleStatus={handleToggleStatus}
                            viewMode={viewMode}
                        />

                        <Pagination
                            totalItems={filteredPromotions.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Promotion Details Modal */}
            {showPromotionDetails && selectedPromotion && (
                <PromotionDetailsModal
                    promotion={selectedPromotion}
                    onClose={() => setShowPromotionDetails(false)}
                    onEdit={handleEditPromotion}
                    onDelete={handleDeletePromotion}
                    onToggleStatus={handleToggleStatus}
                />
            )}
        </div>
    );
};

export default PromotionManagement;
