import React, { useState, useEffect } from 'react';
import {
    FaSearch,
    FaTicketAlt,
    FaFilter,
    FaCalendarAlt,
    FaEye,
    FaPrint,
    FaFileExport,
    FaTrash,
    FaCheck,
    FaTimes,
    FaExclamationTriangle,
    FaSync,
    FaChevronDown,
    FaUserAlt,
    FaChair,
    FaFilm,
    FaBuilding,
    FaMoneyBillWave,
    FaQrcode,
    FaDownload,
    FaMapMarkerAlt,
    FaClock,
    FaCalendarDay,
    FaStar,
    FaListAlt,
    FaSortAmountDown,
    FaSortAmountUp,
    FaEllipsisV,
    FaFileInvoiceDollar,
    FaEnvelope,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import { format, parseISO, isBefore, addDays, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';

// Component for the header of the admin page
const AdminHeader = ({ title }) => {
    return (
        <div className="admin-header p-4 bg-white border-b border-gray-300 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaFileExport className="mr-2" />
                    Xuất báo cáo
                </button>
            </div>
        </div>
    );
};

// Component for filters
const FiltersSection = ({
    onFilterChange,
    filters,
    cinemaList,
    moviesList
}) => {
    return (
        <div className="filters-section p-4 bg-white border-b border-gray-300">
            <div className="flex flex-wrap gap-4">
                <div className="search-box flex-grow md:flex-grow-0 md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã vé, tên khách hàng..."
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
                        value={filters.movie}
                        onChange={(e) =>
                            onFilterChange('movie', e.target.value)
                        }
                    >
                        <option value="">Tất cả phim</option>
                        {moviesList.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
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
                        <option value="active">Đã xác nhận</option>
                        <option value="used">Đã sử dụng</option>
                        <option value="reserved">Đang giữ chỗ</option>
                        <option value="cancelled">Đã hủy</option>
                        <option value="expired">Hết hạn</option>
                    </select>
                </div>

                <div className="filter-dropdown flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.showDate}
                        onChange={(e) =>
                            onFilterChange('showDate', e.target.value)
                        }
                    />
                </div>

                <div className="filter-dropdown">
                    <select
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.paymentMethod}
                        onChange={(e) =>
                            onFilterChange('paymentMethod', e.target.value)
                        }
                    >
                        <option value="">Tất cả hình thức thanh toán</option>
                        <option value="credit_card">Thẻ tín dụng</option>
                        <option value="bank_transfer">Chuyển khoản</option>
                        <option value="e_wallet">Ví điện tử</option>
                        <option value="cash">Tiền mặt tại quầy</option>
                    </select>
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
            text = 'Đã xác nhận';
            break;
        case 'used':
            badgeClass += ' bg-blue-100 text-blue-800';
            icon = <FaTicketAlt className="mr-1" />;
            text = 'Đã sử dụng';
            break;
        case 'reserved':
            badgeClass += ' bg-yellow-100 text-yellow-800';
            icon = <FaExclamationTriangle className="mr-1" />;
            text = 'Đang giữ chỗ';
            break;
        case 'cancelled':
            badgeClass += ' bg-red-100 text-red-800';
            icon = <FaTimes className="mr-1" />;
            text = 'Đã hủy';
            break;
        case 'expired':
            badgeClass += ' bg-gray-100 text-gray-800';
            icon = <FaExclamationTriangle className="mr-1" />;
            text = 'Hết hạn';
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

// Ticket card component
const TicketCard = ({
    ticket,
    onViewTicket,
    onPrintTicket,
    onCancelTicket
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="font-medium text-gray-800 flex items-center">
                    <FaTicketAlt className="text-blue-600 mr-2" />
                    <span>{ticket.ticketId}</span>
                </h3>
                <StatusBadge status={ticket.status} />
            </div>
            <div className="p-4">
                <div className="flex items-start mb-4">
                    <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                        {ticket.movie.posterUrl ? (
                            <img
                                src={ticket.movie.posterUrl}
                                alt={ticket.movie.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                <MdLocalMovies className="text-gray-500 text-2xl" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800">
                            {ticket.movie.title}
                        </h4>
                        <div className="text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                                <FaChair className="mr-1 text-gray-500" />
                                <span>Ghế: {ticket.seats.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center">
                        <FaCalendarDay className="mr-1 text-gray-500" />
                        <span>
                            {format(parseISO(ticket.showDate), 'dd/MM/yyyy')}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <FaClock className="mr-1 text-gray-500" />
                        <span>{ticket.showTime}</span>
                    </div>
                    <div className="flex items-center">
                        <FaBuilding className="mr-1 text-gray-500" />
                        <span>{ticket.cinema}</span>
                    </div>
                    <div className="flex items-center">
                        <FaUserAlt className="mr-1 text-gray-500" />
                        <span>{ticket.customer.name}</span>
                    </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <div className="text-sm font-medium text-green-600">
                        {ticket.totalAmount.toLocaleString('vi-VN')} ₫
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onViewTicket(ticket)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Xem chi tiết"
                        >
                            <FaEye />
                        </button>
                        <button
                            onClick={() => onPrintTicket(ticket)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="In vé"
                            disabled={
                                ticket.status === 'cancelled' ||
                                ticket.status === 'expired'
                            }
                        >
                            <FaPrint />
                        </button>
                        {ticket.status === 'active' ||
                        ticket.status === 'reserved' ? (
                            <button
                                onClick={() => onCancelTicket(ticket)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Hủy vé"
                            >
                                <FaTrash />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Ticket list component
const TicketList = ({
    tickets,
    onViewTicket,
    onPrintTicket,
    onCancelTicket,
    viewMode
}) => {
    return (
        <div className="mt-4">
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    {tickets.map((ticket) => (
                        <TicketCard
                            key={ticket.ticketId}
                            ticket={ticket}
                            onViewTicket={onViewTicket}
                            onPrintTicket={onPrintTicket}
                            onCancelTicket={onCancelTicket}
                        />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Mã vé
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Phim
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Thời gian
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Rạp
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Ghế
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Khách hàng
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Tổng tiền
                                </th>
                                <th className="py-3 px-4 text-left font-medium text-gray-700 border-b border-gray-200">
                                    Trạng thái
                                </th>
                                <th className="py-3 px-4 text-center font-medium text-gray-700 border-b border-gray-200">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tickets.map((ticket) => (
                                <tr
                                    key={ticket.ticketId}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4 text-gray-800">
                                        {ticket.ticketId}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-12 bg-gray-200 rounded overflow-hidden mr-2 flex-shrink-0">
                                                {ticket.movie.posterUrl ? (
                                                    <img
                                                        src={
                                                            ticket.movie
                                                                .posterUrl
                                                        }
                                                        alt={ticket.movie.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                                        <MdLocalMovies className="text-gray-500 text-xl" />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-gray-800">
                                                {ticket.movie.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        <div>
                                            {format(
                                                parseISO(ticket.showDate),
                                                'dd/MM/yyyy'
                                            )}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {ticket.showTime}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {ticket.cinema}
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">
                                        {ticket.seats.join(', ')}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-gray-800">
                                            {ticket.customer.name}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {ticket.customer.phone}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-green-600">
                                        {ticket.totalAmount.toLocaleString(
                                            'vi-VN'
                                        )}{' '}
                                        ₫
                                    </td>
                                    <td className="py-3 px-4">
                                        <StatusBadge status={ticket.status} />
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    onViewTicket(ticket)
                                                }
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                title="Xem chi tiết"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    onPrintTicket(ticket)
                                                }
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                title="In vé"
                                                disabled={
                                                    ticket.status ===
                                                        'cancelled' ||
                                                    ticket.status === 'expired'
                                                }
                                            >
                                                <FaPrint />
                                            </button>
                                            {ticket.status === 'active' ||
                                            ticket.status === 'reserved' ? (
                                                <button
                                                    onClick={() =>
                                                        onCancelTicket(ticket)
                                                    }
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                    title="Hủy vé"
                                                >
                                                    <FaTrash />
                                                </button>
                                            ) : null}
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

// Pagination component
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
                {totalItems} vé
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

// Ticket details component
const TicketDetails = ({
    ticket,
    onClose,
    onPrint,
    onCancel,
    onSendConfirmation
}) => {
    const canCancel =
        ticket.status === 'active' || ticket.status === 'reserved';
    const showDate = parseISO(ticket.showDate);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FaTicketAlt className="text-blue-600 mr-2" />
                        Chi tiết vé #{ticket.ticketId}
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
                        {/* Movie and show information */}
                        <div className="md:w-1/3">
                            <div className="w-full aspect-[2/3] bg-gray-200 rounded-md overflow-hidden mb-3">
                                {ticket.movie.posterUrl ? (
                                    <img
                                        src={ticket.movie.posterUrl}
                                        alt={ticket.movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                        <MdLocalMovies className="text-gray-500 text-5xl" />
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-1">
                                {ticket.movie.title}
                            </h3>
                            <div className="text-gray-600 mb-3">
                                <div className="flex items-center mb-1">
                                    <FaFilm className="mr-2 text-gray-500" />
                                    <span>
                                        {ticket.movie.duration} phút •{' '}
                                        {ticket.format}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <FaQrcode className="text-gray-500 text-xl mr-2" />
                                    <span className="font-medium text-gray-800">
                                        Mã vé
                                    </span>
                                </div>
                                <div className="text-center bg-white p-3 rounded-lg">
                                    <div className="bg-gray-200 w-32 h-32 mx-auto flex items-center justify-center">
                                        <FaQrcode className="text-gray-500 text-5xl" />
                                    </div>
                                    <div className="mt-2 text-gray-600 text-sm">
                                        {ticket.ticketId}
                                    </div>
                                </div>
                                <div className="mt-3 text-sm text-center text-gray-500">
                                    Quét mã QR để xác thực vé tại rạp
                                </div>
                            </div>

                            <div className="mt-4">
                                <StatusBadge status={ticket.status} />
                            </div>
                        </div>

                        {/* Ticket details */}
                        <div className="md:w-2/3">
                            {/* Booking information */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaListAlt className="mr-2 text-blue-600" />
                                    Thông tin đặt vé
                                </h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Rạp chiếu
                                        </p>
                                        <p className="font-medium">
                                            {ticket.cinema}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Phòng chiếu
                                        </p>
                                        <p className="font-medium">
                                            {ticket.hall}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Ngày chiếu
                                        </p>
                                        <p className="font-medium">
                                            {format(
                                                showDate,
                                                'EEEE, dd/MM/yyyy',
                                                { locale: vi }
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Giờ chiếu
                                        </p>
                                        <p className="font-medium">
                                            {ticket.showTime}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">
                                            Ghế
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {ticket.seats.map((seat, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
                                                >
                                                    {seat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">
                                            Địa chỉ
                                        </p>
                                        <p className="font-medium">
                                            {ticket.address}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer information */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaUserAlt className="mr-2 text-blue-600" />
                                    Thông tin khách hàng
                                </h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Tên khách hàng
                                        </p>
                                        <p className="font-medium">
                                            {ticket.customer.name}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Điện thoại
                                        </p>
                                        <p className="font-medium">
                                            {ticket.customer.phone}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        <p className="font-medium">
                                            {ticket.customer.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Thời gian đặt vé
                                        </p>
                                        <p className="font-medium">
                                            {format(
                                                parseISO(ticket.bookingDate),
                                                'dd/MM/yyyy HH:mm'
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Phương thức thanh toán
                                        </p>
                                        <p className="font-medium">
                                            {ticket.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment summary */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                    <FaFileInvoiceDollar className="mr-2 text-blue-600" />
                                    Thông tin thanh toán
                                </h4>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 border-b">
                                                    Mô tả
                                                </th>
                                                <th className="py-2 px-4 text-center text-xs font-medium text-gray-600 border-b">
                                                    SL
                                                </th>
                                                <th className="py-2 px-4 text-right text-xs font-medium text-gray-600 border-b">
                                                    Đơn giá
                                                </th>
                                                <th className="py-2 px-4 text-right text-xs font-medium text-gray-600 border-b">
                                                    Thành tiền
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {ticket.seatTypes.map(
                                                (seatType, index) => (
                                                    <tr key={index}>
                                                        <td className="py-2 px-4 text-sm text-gray-800">
                                                            Vé {seatType.type}
                                                        </td>
                                                        <td className="py-2 px-4 text-sm text-gray-800 text-center">
                                                            {seatType.count}
                                                        </td>
                                                        <td className="py-2 px-4 text-sm text-gray-800 text-right">
                                                            {seatType.price.toLocaleString(
                                                                'vi-VN'
                                                            )}{' '}
                                                            ₫
                                                        </td>
                                                        <td className="py-2 px-4 text-sm text-gray-800 text-right">
                                                            {(
                                                                seatType.price *
                                                                seatType.count
                                                            ).toLocaleString(
                                                                'vi-VN'
                                                            )}{' '}
                                                            ₫
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            {ticket.combos.map(
                                                (combo, index) => (
                                                    <tr key={`combo-${index}`}>
                                                        <td className="py-2 px-4 text-sm text-gray-800">
                                                            {combo.name}
                                                        </td>
                                                        <td className="py-2 px-4 text-sm text-gray-800 text-center">
                                                            {combo.quantity}
                                                        </td>
                                                        <td className="py-2 px-4 text-sm text-gray-800 text-right">
                                                            {combo.price.toLocaleString(
                                                                'vi-VN'
                                                            )}{' '}
                                                            ₫
                                                        </td>
                                                        <td className="py-2 px-4 text-sm text-gray-800 text-right">
                                                            {(
                                                                combo.price *
                                                                combo.quantity
                                                            ).toLocaleString(
                                                                'vi-VN'
                                                            )}{' '}
                                                            ₫
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            {ticket.discount && (
                                                <tr>
                                                    <td
                                                        className="py-2 px-4 text-sm text-gray-800"
                                                        colSpan="3"
                                                    >
                                                        Giảm giá
                                                    </td>
                                                    <td className="py-2 px-4 text-sm text-red-600 text-right">
                                                        -
                                                        {ticket.discount.toLocaleString(
                                                            'vi-VN'
                                                        )}{' '}
                                                        ₫
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td
                                                    className="py-2 px-4 font-medium text-gray-800"
                                                    colSpan="3"
                                                >
                                                    Tổng cộng
                                                </td>
                                                <td className="py-2 px-4 font-medium text-green-600 text-right">
                                                    {ticket.totalAmount.toLocaleString(
                                                        'vi-VN'
                                                    )}{' '}
                                                    ₫
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Ticket actions */}
                            <div className="flex flex-wrap justify-end gap-3">
                                {canCancel && (
                                    <button
                                        onClick={onCancel}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                                    >
                                        <FaTrash className="mr-2" />
                                        Hủy vé
                                    </button>
                                )}
                                <button
                                    onClick={onSendConfirmation}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                    disabled={
                                        ticket.status === 'cancelled' ||
                                        ticket.status === 'expired'
                                    }
                                >
                                    <FaEnvelope className="mr-2" />
                                    Gửi xác nhận
                                </button>
                                <button
                                    onClick={onPrint}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                                    disabled={
                                        ticket.status === 'cancelled' ||
                                        ticket.status === 'expired'
                                    }
                                >
                                    <FaPrint className="mr-2" />
                                    In vé
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
    );
};

// Main component for ticket management
const TicketManagement = () => {
    const [filters, setFilters] = useState({
        search: '',
        cinema: '',
        movie: '',
        status: '',
        showDate: '',
        paymentMethod: ''
    });

    const [viewMode, setViewMode] = useState('table');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [cinemaList, setCinemaList] = useState([]);
    const [moviesList, setMoviesList] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showTicketDetails, setShowTicketDetails] = useState(false);
    const itemsPerPage = 10;

    // Sample data for cinemas
    const sampleCinemas = [
        { id: 'c1', name: 'CineStar Quốc Thanh' },
        { id: 'c2', name: 'CineStar Hai Bà Trưng' },
        { id: 'c3', name: 'CineStar Gò Vấp' },
        { id: 'c4', name: 'CineStar Đà Lạt' }
    ];

    // Sample data for movies
    const sampleMovies = [
        {
            id: 'm1',
            title: 'Nhà Giả Tiền',
            duration: 118,
            posterUrl:
                'https://placehold.co/120x180/orange/white?text=Nha+Gia+Tien'
        },
        {
            id: 'm2',
            title: 'Quỷ Nhập Tràng',
            duration: 105,
            posterUrl:
                'https://placehold.co/120x180/darkred/white?text=Quy+Nhap+Trang'
        },
        {
            id: 'm3',
            title: 'Tiếng Vọng Kinh Hoàng',
            duration: 95,
            posterUrl:
                'https://placehold.co/120x180/purple/white?text=Tieng+Vong+Kinh+Hoang'
        },
        {
            id: 'm4',
            title: 'Sát Thủ Vô Cùng Cực Hại',
            duration: 115,
            posterUrl:
                'https://placehold.co/120x180/navy/white?text=Sat+Thu+Vo+Cung+Cuc+Hai'
        },
        {
            id: 'm5',
            title: 'Biệt Đội Đánh Thuê',
            duration: 120,
            posterUrl:
                'https://placehold.co/120x180/black/white?text=Biet+Doi+Danh+Thue'
        }
    ];

    // Generate sample ticket data
    const generateSampleTickets = () => {
        const result = [];
        const today = new Date();
        // eslint-disable-next-line
        const statuses = ['active', 'used', 'reserved', 'cancelled', 'expired'];
        const paymentMethods = [
            'Thẻ tín dụng/ghi nợ',
            'Chuyển khoản ngân hàng',
            'Ví điện tử MoMo',
            'Ví điện tử ZaloPay',
            'Tiền mặt tại quầy'
        ];
        const formats = ['2D', '3D', '4DX'];
        const halls = ['Phòng 1', 'Phòng 2', 'Phòng 3', 'Phòng 4', 'Phòng 5'];
        const seatTypes = [
            { type: 'Thường', price: 90000 },
            { type: 'VIP', price: 120000 },
            { type: 'Đôi', price: 200000 }
        ];
        const combos = [
            { name: 'Combo Đơn', price: 85000 },
            { name: 'Combo Đôi', price: 115000 },
            { name: 'Combo Gia Đình', price: 195000 },
            { name: 'Bắp Rang Bơ (L)', price: 45000 },
            { name: 'Nước Ngọt (L)', price: 35000 }
        ];

        // Generate addresses for cinemas
        const cinemaAddresses = {
            c1: '271 Nguyễn Trãi, Q.1, TP.HCM',
            c2: '135 Hai Bà Trưng, Q.1, TP.HCM',
            c3: '340 Phan Văn Trị, Q. Gò Vấp, TP.HCM',
            c4: '2 Hùng Vương, P.10, TP. Đà Lạt, Lâm Đồng'
        };

        // Generate 100 sample tickets
        for (let i = 1; i <= 100; i++) {
            const ticketId = `TIX${String(i).padStart(6, '0')}`;

            // Random cinema
            const cinemaIndex = Math.floor(
                Math.random() * sampleCinemas.length
            );
            const cinema = sampleCinemas[cinemaIndex];

            // Random movie
            const movieIndex = Math.floor(Math.random() * sampleMovies.length);
            const movie = sampleMovies[movieIndex];

            // Random format
            const format =
                formats[
                    Math.floor(Math.random() * (movie.id === 'm5' ? 3 : 2))
                ]; // Biệt Đội Đánh Thuê can be 4DX

            // Random hall
            const hall = halls[Math.floor(Math.random() * halls.length)];

            // Show date (from 7 days ago to 14 days in future)
            const daysOffset = Math.floor(Math.random() * 21) - 7;
            const showDate = addDays(today, daysOffset);

            // Show time
            const hours = [10, 12, 14, 16, 18, 20, 22];
            const showHour = hours[Math.floor(Math.random() * hours.length)];
            const showTime = `${showHour}:${Math.random() < 0.5 ? '00' : '30'}`;

            // Booking date (1-3 days before show date)
            const bookingDaysOffset = Math.floor(Math.random() * 3) + 1;
            const bookingDate = subDays(showDate, bookingDaysOffset);

            // Determine status based on dates
            let status;
            if (isBefore(showDate, today)) {
                // Show date in the past
                status =
                    Math.random() < 0.8
                        ? 'used'
                        : Math.random() < 0.5
                          ? 'cancelled'
                          : 'expired';
            } else {
                // Show date in the future
                status =
                    Math.random() < 0.8
                        ? 'active'
                        : Math.random() < 0.5
                          ? 'reserved'
                          : 'cancelled';
            }

            // Random seats (1-4 seats)
            const numSeats = Math.floor(Math.random() * 4) + 1;
            const seatRows = 'ABCDEFGHIJK';
            const seats = [];
            const usedPositions = new Set();

            // Generate unique seats
            for (let j = 0; j < numSeats; j++) {
                let seat;
                do {
                    const row =
                        seatRows[Math.floor(Math.random() * seatRows.length)];
                    const number = Math.floor(Math.random() * 15) + 1;
                    seat = `${row}${number}`;
                } while (usedPositions.has(seat));

                usedPositions.add(seat);
                seats.push(seat);
            }

            // Sort seats
            seats.sort((a, b) => {
                if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
                return parseInt(a.substring(1)) - parseInt(b.substring(1));
            });

            // Random customer data
            const customerNames = [
                'Nguyễn Văn A',
                'Trần Thị B',
                'Lê Văn C',
                'Phạm Thị D',
                'Hoàng Văn E',
                'Ngô Thị F',
                'Đỗ Văn G',
                'Vũ Thị H'
            ];

            const customer = {
                name: customerNames[
                    Math.floor(Math.random() * customerNames.length)
                ],
                phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
                email: `customer${i}@example.com`
            };

            // Random payment method
            const paymentMethod =
                paymentMethods[
                    Math.floor(Math.random() * paymentMethods.length)
                ];

            // Generate seat types breakdown
            const ticketSeatTypes = [];

            // Determine seat type for each seat
            if (numSeats === 1) {
                // Single seat
                const typeIndex = Math.floor(Math.random() * 2); // Regular or VIP
                ticketSeatTypes.push({
                    ...seatTypes[typeIndex],
                    count: 1
                });
            } else if (numSeats === 2 && Math.random() < 0.3) {
                // 30% chance for a couple seat
                ticketSeatTypes.push({
                    ...seatTypes[2], // Couple seat
                    count: 1
                });
            } else {
                // Mixed seats
                const regularCount = Math.floor(Math.random() * numSeats) + 1;
                const vipCount = numSeats - regularCount;

                if (regularCount > 0) {
                    ticketSeatTypes.push({
                        ...seatTypes[0],
                        count: regularCount
                    });
                }

                if (vipCount > 0) {
                    ticketSeatTypes.push({
                        ...seatTypes[1],
                        count: vipCount
                    });
                }
            }

            // Calculate ticket subtotal
            const ticketSubtotal = ticketSeatTypes.reduce(
                (sum, type) => sum + type.price * type.count,
                0
            );

            // Random combos (0-2 combos)
            const numCombos = Math.floor(Math.random() * 3);
            const ticketCombos = [];

            for (let j = 0; j < numCombos; j++) {
                const comboIndex = Math.floor(Math.random() * combos.length);
                const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity

                // Check if this combo already exists
                const existingCombo = ticketCombos.find(
                    (c) => c.name === combos[comboIndex].name
                );

                if (existingCombo) {
                    existingCombo.quantity += quantity;
                } else {
                    ticketCombos.push({
                        ...combos[comboIndex],
                        quantity
                    });
                }
            }

            // Calculate combo subtotal
            const comboSubtotal = ticketCombos.reduce(
                (sum, combo) => sum + combo.price * combo.quantity,
                0
            );

            // Random discount (10% chance of having a discount)
            const discount =
                Math.random() < 0.1
                    ? Math.floor((ticketSubtotal + comboSubtotal) * 0.1)
                    : 0;

            // Calculate total amount
            const totalAmount = ticketSubtotal + comboSubtotal - discount;

            // Create ticket object
            result.push({
                ticketId,
                cinema: cinema.name,
                cinemaId: cinema.id,
                movie: {
                    ...movie
                },
                format,
                hall,
                showDate: format(showDate, 'yyyy-MM-dd'),
                showTime,
                bookingDate: format(bookingDate, 'yyyy-MM-dd HH:mm:ss'),
                seats,
                seatTypes: ticketSeatTypes,
                combos: ticketCombos,
                customer,
                paymentMethod,
                discount,
                totalAmount,
                status,
                address: cinemaAddresses[cinema.id]
            });
        }

        // Sort by booking date (newest first)
        result.sort((a, b) => {
            return (
                parseISO(b.bookingDate).getTime() -
                parseISO(a.bookingDate).getTime()
            );
        });

        return result;
    };

    // Load sample data
    useEffect(() => {
        // Simulating API call delay
        setTimeout(() => {
            setCinemaList(sampleCinemas);
            setMoviesList(sampleMovies);
            const generatedTickets = generateSampleTickets();
            setTickets(generatedTickets);
            setFilteredTickets(generatedTickets);
            setIsLoading(false);
        }, 800);
    }, []);

    // Filter tickets when filters change
    useEffect(() => {
        let result = [...tickets];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (ticket) =>
                    ticket.ticketId.toLowerCase().includes(searchLower) ||
                    ticket.customer.name.toLowerCase().includes(searchLower) ||
                    ticket.customer.phone.includes(searchLower) ||
                    ticket.customer.email.toLowerCase().includes(searchLower)
            );
        }

        // Apply cinema filter
        if (filters.cinema) {
            result = result.filter(
                (ticket) => ticket.cinemaId === filters.cinema
            );
        }

        // Apply movie filter
        if (filters.movie) {
            result = result.filter(
                (ticket) => ticket.movie.id === filters.movie
            );
        }

        // Apply status filter
        if (filters.status) {
            result = result.filter(
                (ticket) => ticket.status === filters.status
            );
        }

        // Apply show date filter
        if (filters.showDate) {
            result = result.filter(
                (ticket) => ticket.showDate === filters.showDate
            );
        }

        // Apply payment method filter
        if (filters.paymentMethod) {
            const paymentLower = filters.paymentMethod.toLowerCase();
            result = result.filter((ticket) =>
                ticket.paymentMethod.toLowerCase().includes(paymentLower)
            );
        }

        setFilteredTickets(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [filters, tickets]);

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        if (filterName === 'reset') {
            setFilters({
                search: '',
                cinema: '',
                movie: '',
                status: '',
                showDate: '',
                paymentMethod: ''
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

    // Get paginated tickets
    const getPaginatedTickets = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTickets.slice(startIndex, startIndex + itemsPerPage);
    };

    // Ticket actions
    const handleViewTicket = (ticket) => {
        setSelectedTicket(ticket);
        setShowTicketDetails(true);
    };

    const handlePrintTicket = (ticket) => {
        alert(`In vé: ${ticket.ticketId}`);
        // In a real app, you would call a print function or open a print modal
    };

    const handleCancelTicket = (ticket) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn hủy vé ${ticket.ticketId} không? Thao tác này không thể hoàn tác.`
            )
        ) {
            // In a real app, you would call an API to cancel the ticket
            const updatedTickets = tickets.map((t) => {
                if (t.ticketId === ticket.ticketId) {
                    return { ...t, status: 'cancelled' };
                }
                return t;
            });

            setTickets(updatedTickets);

            // If viewing ticket details, update the selected ticket
            if (selectedTicket && selectedTicket.ticketId === ticket.ticketId) {
                setSelectedTicket({ ...selectedTicket, status: 'cancelled' });
            }

            alert('Vé đã được hủy thành công.');
        }
    };

    const handleSendConfirmation = (ticket) => {
        alert(`Đã gửi email xác nhận đến ${ticket.customer.email}`);
        // In a real app, you would call an API to send the confirmation email
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader title="Quản lý vé" />

            <div className="container mx-auto">
                <FiltersSection
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    cinemaList={cinemaList}
                    moviesList={moviesList}
                />

                {/* View mode toggle and stats */}
                <div className="bg-white p-4 border-b border-gray-300 flex flex-wrap justify-between items-center">
                    <div className="flex space-x-6">
                        <div className="text-sm">
                            <span className="text-gray-500">Tổng số vé:</span>
                            <span className="ml-1 font-semibold">
                                {filteredTickets.length}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Đã xác nhận:</span>
                            <span className="ml-1 font-semibold text-green-600">
                                {
                                    filteredTickets.filter(
                                        (t) => t.status === 'active'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Đã sử dụng:</span>
                            <span className="ml-1 font-semibold text-blue-600">
                                {
                                    filteredTickets.filter(
                                        (t) => t.status === 'used'
                                    ).length
                                }
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Đã hủy:</span>
                            <span className="ml-1 font-semibold text-red-600">
                                {
                                    filteredTickets.filter(
                                        (t) => t.status === 'cancelled'
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
                            <FaListAlt />
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
                                    let sortedTickets = [...filteredTickets];

                                    switch (sortOption) {
                                        case 'newest':
                                            sortedTickets.sort(
                                                (a, b) =>
                                                    parseISO(
                                                        b.bookingDate
                                                    ).getTime() -
                                                    parseISO(
                                                        a.bookingDate
                                                    ).getTime()
                                            );
                                            break;
                                        case 'oldest':
                                            sortedTickets.sort(
                                                (a, b) =>
                                                    parseISO(
                                                        a.bookingDate
                                                    ).getTime() -
                                                    parseISO(
                                                        b.bookingDate
                                                    ).getTime()
                                            );
                                            break;
                                        case 'showtime_asc':
                                            sortedTickets.sort((a, b) => {
                                                const dateCompare =
                                                    a.showDate.localeCompare(
                                                        b.showDate
                                                    );
                                                return dateCompare !== 0
                                                    ? dateCompare
                                                    : a.showTime.localeCompare(
                                                          b.showTime
                                                      );
                                            });
                                            break;
                                        case 'showtime_desc':
                                            sortedTickets.sort((a, b) => {
                                                const dateCompare =
                                                    b.showDate.localeCompare(
                                                        a.showDate
                                                    );
                                                return dateCompare !== 0
                                                    ? dateCompare
                                                    : b.showTime.localeCompare(
                                                          a.showTime
                                                      );
                                            });
                                            break;
                                        case 'price_asc':
                                            sortedTickets.sort(
                                                (a, b) =>
                                                    a.totalAmount -
                                                    b.totalAmount
                                            );
                                            break;
                                        case 'price_desc':
                                            sortedTickets.sort(
                                                (a, b) =>
                                                    b.totalAmount -
                                                    a.totalAmount
                                            );
                                            break;
                                        default:
                                            break;
                                    }

                                    setFilteredTickets(sortedTickets);
                                }}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="oldest">Cũ nhất</option>
                                <option value="showtime_asc">
                                    Suất chiếu (tăng dần)
                                </option>
                                <option value="showtime_desc">
                                    Suất chiếu (giảm dần)
                                </option>
                                <option value="price_asc">
                                    Giá (tăng dần)
                                </option>
                                <option value="price_desc">
                                    Giá (giảm dần)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredTickets.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center mt-4">
                        <FaTicketAlt className="text-gray-400 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                            Không tìm thấy vé nào
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Không có vé nào phù hợp với bộ lọc đã chọn.
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
                        <TicketList
                            tickets={getPaginatedTickets()}
                            onViewTicket={handleViewTicket}
                            onPrintTicket={handlePrintTicket}
                            onCancelTicket={handleCancelTicket}
                            viewMode={viewMode}
                        />

                        <Pagination
                            totalItems={filteredTickets.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            {/* Ticket Details Modal */}
            {showTicketDetails && selectedTicket && (
                <TicketDetails
                    ticket={selectedTicket}
                    onClose={() => setShowTicketDetails(false)}
                    onPrint={() => handlePrintTicket(selectedTicket)}
                    onCancel={() => handleCancelTicket(selectedTicket)}
                    onSendConfirmation={() =>
                        handleSendConfirmation(selectedTicket)
                    }
                />
            )}
        </div>
    );
};

import { FaThList } from 'react-icons/fa';

export default TicketManagement;
