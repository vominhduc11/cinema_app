import React, { useState, useEffect } from 'react';
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaFilter,
    FaCalendarAlt,
    FaCalendarDay,
    FaCalendarWeek,
    FaCalendarCheck,
    FaFilm,
    FaBuilding,
    FaChair,
    FaTicketAlt,
    FaMoneyBillWave,
    FaSync,
    FaEye,
    FaTimes,
    FaPlay,
    FaPause,
    FaCheck,
    FaExclamationTriangle,
    FaClock,
    FaSave,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';
import { MdLocalMovies, MdEventSeat } from 'react-icons/md';
import { BiCameraMovie } from 'react-icons/bi';

// Date utilities
import {
    format,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameDay,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isBefore,
    isAfter,
    parseISO,
    subDays
} from 'date-fns';
import { vi } from 'date-fns/locale';

// Component for Admin Header
const AdminHeader = ({ title }) => {
    return (
        <div className="admin-header p-4 bg-white border-b border-gray-300 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                    <FaPlus className="mr-2" />
                    Thêm lịch chiếu
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
    moviesList,
    onViewModeChange,
    viewMode
}) => {
    return (
        <div className="filters-section p-4 bg-white border-b border-gray-300">
            <div className="flex flex-wrap gap-4">
                <div className="search-box flex-grow md:flex-grow-0 md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm lịch chiếu..."
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
                        <option value="upcoming">Sắp chiếu</option>
                        <option value="ongoing">Đang chiếu</option>
                        <option value="completed">Đã chiếu</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </div>

                <div className="filter-dropdown flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={filters.date}
                        onChange={(e) => onFilterChange('date', e.target.value)}
                    />
                </div>

                {/* View mode buttons */}
                <div className="flex ml-auto space-x-1 bg-gray-100 rounded-md">
                    <button
                        className={`px-3 py-2 rounded-l-md flex items-center ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => onViewModeChange('day')}
                        title="Xem theo ngày"
                    >
                        <FaCalendarDay className="mr-1" />
                        <span className="hidden md:inline">Ngày</span>
                    </button>
                    <button
                        className={`px-3 py-2 flex items-center ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => onViewModeChange('week')}
                        title="Xem theo tuần"
                    >
                        <FaCalendarWeek className="mr-1" />
                        <span className="hidden md:inline">Tuần</span>
                    </button>
                    <button
                        className={`px-3 py-2 rounded-r-md flex items-center ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => onViewModeChange('month')}
                        title="Xem theo tháng"
                    >
                        <FaCalendarCheck className="mr-1" />
                        <span className="hidden md:inline">Tháng</span>
                    </button>
                </div>

                <button
                    className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center"
                    onClick={() => onFilterChange('reset')}
                >
                    <FaSync className="mr-1" />
                    <span className="hidden md:inline">Đặt lại</span>
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
        case 'upcoming':
            badgeClass += ' bg-blue-100 text-blue-800';
            icon = <FaClock className="mr-1" />;
            text = 'Sắp chiếu';
            break;
        case 'ongoing':
            badgeClass += ' bg-green-100 text-green-800';
            icon = <FaPlay className="mr-1" />;
            text = 'Đang chiếu';
            break;
        case 'completed':
            badgeClass += ' bg-gray-100 text-gray-800';
            icon = <FaCheck className="mr-1" />;
            text = 'Đã chiếu';
            break;
        case 'cancelled':
            badgeClass += ' bg-red-100 text-red-800';
            icon = <FaTimes className="mr-1" />;
            text = 'Đã hủy';
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

// Component for day view
const DayView = ({
    date,
    screenings,
    onScreeningClick,
    onPreviousDay,
    onNextDay,
    onEditScreening,
    onDeleteScreening
}) => {
    // Group screenings by cinema and hall
    const groupedScreenings = screenings.reduce((groups, screening) => {
        const key = `${screening.cinemaId}-${screening.hallId}`;
        if (!groups[key]) {
            groups[key] = {
                cinema: screening.cinema,
                hall: screening.hall,
                screenings: []
            };
        }
        groups[key].screenings.push(screening);
        return groups;
    }, {});

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            {/* Calendar navigation */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <button
                    onClick={onPreviousDay}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-xl font-bold">
                    {format(date, 'EEEE, dd/MM/yyyy', { locale: vi })}
                </h2>
                <button
                    onClick={onNextDay}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Screenings list */}
            <div className="divide-y divide-gray-200">
                {Object.values(groupedScreenings).length > 0 ? (
                    Object.values(groupedScreenings).map((group, index) => (
                        <div key={index} className="p-4">
                            <div className="flex items-center mb-3">
                                <FaBuilding className="text-gray-500 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {group.cinema} - {group.hall}
                                </h3>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {group.screenings.map((screening) => (
                                    <div
                                        key={screening.id}
                                        className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex p-3 border-b border-gray-200">
                                            <div className="w-16 h-24 bg-gray-200 rounded overflow-hidden mr-3 flex-shrink-0">
                                                {screening.movie.posterUrl ? (
                                                    <img
                                                        src={
                                                            screening.movie
                                                                .posterUrl
                                                        }
                                                        alt={
                                                            screening.movie
                                                                .title
                                                        }
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                                        <BiCameraMovie className="text-gray-500 text-2xl" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">
                                                    {screening.movie.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {screening.movie.duration}{' '}
                                                    phút
                                                </p>
                                                <div className="flex items-center mt-1">
                                                    <StatusBadge
                                                        status={
                                                            screening.status
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-3">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center text-gray-700">
                                                    <FaClock className="mr-1 text-gray-500" />
                                                    <span>
                                                        {screening.startTime} -{' '}
                                                        {screening.endTime}
                                                    </span>
                                                </div>
                                                <div className="text-sm font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                                                    {screening.format}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MdEventSeat className="mr-1" />
                                                    <span>
                                                        {screening.seatsBooked}/
                                                        {screening.totalSeats}{' '}
                                                        ghế
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FaTicketAlt className="mr-1" />
                                                    <span>
                                                        {screening.ticketsSold}{' '}
                                                        vé
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center text-sm font-medium text-green-600">
                                                    <FaMoneyBillWave className="mr-1" />
                                                    <span>
                                                        {screening.revenue.toLocaleString(
                                                            'vi-VN'
                                                        )}{' '}
                                                        ₫
                                                    </span>
                                                </div>

                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={() =>
                                                            onScreeningClick(
                                                                screening
                                                            )
                                                        }
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Xem chi tiết"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            onEditScreening(
                                                                screening
                                                            )
                                                        }
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Chỉnh sửa"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            onDeleteScreening(
                                                                screening
                                                            )
                                                        }
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                        title="Xóa"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center">
                        <MdLocalMovies className="mx-auto text-4xl text-gray-400 mb-2" />
                        <h3 className="text-lg font-medium text-gray-700 mb-1">
                            Không có lịch chiếu nào
                        </h3>
                        <p className="text-gray-500">
                            Không tìm thấy lịch chiếu nào cho ngày này.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Component for week view
const WeekView = ({
    currentDate,
    screenings,
    onScreeningClick,
    onPreviousWeek,
    onNextWeek,
    onEditScreening,
    onDeleteScreening
}) => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    const days = [];

    for (let i = 0; i < 7; i++) {
        days.push(addDays(startDate, i));
    }

    const hoursOfDay = Array.from({ length: 15 }, (_, i) => i + 8); // 8:00 to 22:00

    // Group screenings by day
    const screeningsByDay = screenings.reduce((acc, screening) => {
        const screeningDate = parseISO(screening.date);
        const dayIndex = days.findIndex((day) => isSameDay(day, screeningDate));

        if (dayIndex !== -1) {
            if (!acc[dayIndex]) acc[dayIndex] = [];
            acc[dayIndex].push(screening);
        }

        return acc;
    }, {});

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            {/* Calendar navigation */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <button
                    onClick={onPreviousWeek}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-xl font-bold">
                    {format(startDate, 'dd/MM/yyyy')} -{' '}
                    {format(endDate, 'dd/MM/yyyy')}
                </h2>
                <button
                    onClick={onNextWeek}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Weekly calendar */}
            <div className="overflow-x-auto">
                <div className="min-w-max">
                    {/* Day headers */}
                    <div className="grid grid-cols-8 border-b border-gray-200">
                        <div className="p-3 border-r border-gray-200 bg-gray-50 text-center">
                            <span className="font-medium text-gray-700">
                                Giờ
                            </span>
                        </div>
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={`p-3 text-center ${isSameDay(day, new Date()) ? 'bg-blue-50' : 'bg-gray-50'}`}
                            >
                                <div className="font-medium text-gray-700">
                                    {format(day, 'EEEE', { locale: vi })}
                                </div>
                                <div
                                    className={`text-sm ${isSameDay(day, new Date()) ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
                                >
                                    {format(day, 'dd/MM/yyyy')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hours and screenings */}
                    {hoursOfDay.map((hour) => (
                        <div
                            key={hour}
                            className="grid grid-cols-8 border-b border-gray-200 min-h-[5rem]"
                        >
                            <div className="p-2 border-r border-gray-200 text-center flex items-center justify-center">
                                <span className="text-sm text-gray-600">
                                    {hour}:00
                                </span>
                            </div>

                            {days.map((day, dayIndex) => {
                                const dayScreenings =
                                    screeningsByDay[dayIndex] || [];
                                const hourScreenings = dayScreenings.filter(
                                    (s) => {
                                        const startHour = parseInt(
                                            s.startTime.split(':')[0]
                                        );
                                        return startHour === hour;
                                    }
                                );

                                return (
                                    <div
                                        key={dayIndex}
                                        className="p-1 relative"
                                    >
                                        {hourScreenings.map((screening) => (
                                            <div
                                                key={screening.id}
                                                className={`mb-1 p-1 rounded text-xs border-l-4 
                                                    ${
                                                        screening.status ===
                                                        'upcoming'
                                                            ? 'bg-blue-50 border-blue-500'
                                                            : screening.status ===
                                                                'ongoing'
                                                              ? 'bg-green-50 border-green-500'
                                                              : screening.status ===
                                                                  'completed'
                                                                ? 'bg-gray-50 border-gray-500'
                                                                : 'bg-red-50 border-red-500'
                                                    }`}
                                            >
                                                <div className="font-medium truncate">
                                                    {screening.movie.title}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span>
                                                        {screening.startTime}-
                                                        {screening.endTime}
                                                    </span>
                                                    <span>
                                                        {screening.hall}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between mt-1">
                                                    <div className="flex items-center text-xs">
                                                        <FaChair className="mr-0.5 text-gray-500" />
                                                        <span>
                                                            {
                                                                screening.seatsBooked
                                                            }
                                                            /
                                                            {
                                                                screening.totalSeats
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={() =>
                                                                onScreeningClick(
                                                                    screening
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Xem chi tiết"
                                                        >
                                                            <FaEye size={10} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                onEditScreening(
                                                                    screening
                                                                )
                                                            }
                                                            className="text-blue-600 hover:text-blue-800"
                                                            title="Chỉnh sửa"
                                                        >
                                                            <FaEdit size={10} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                onDeleteScreening(
                                                                    screening
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Xóa"
                                                        >
                                                            <FaTrash
                                                                size={10}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Component for month view
const MonthView = ({
    currentDate,
    screenings,
    onDateClick,
    onPreviousMonth,
    onNextMonth
}) => {
    const startOfTheMonth = startOfMonth(currentDate);
    const endOfTheMonth = endOfMonth(currentDate);
    const startDate = startOfWeek(startOfTheMonth, { weekStartsOn: 1 });
    const endDate = endOfWeek(endOfTheMonth, { weekStartsOn: 1 });

    const days = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    // Group screenings by date
    const screeningsByDate = screenings.reduce((acc, screening) => {
        const date = format(parseISO(screening.date), 'yyyy-MM-dd');
        if (!acc[date]) acc[date] = [];
        acc[date].push(screening);
        return acc;
    }, {});

    const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            {/* Calendar navigation */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <button
                    onClick={onPreviousMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <FaChevronLeft />
                </button>
                <h2 className="text-xl font-bold">
                    {format(currentDate, 'MMMM yyyy', { locale: vi })}
                </h2>
                <button
                    onClick={onNextMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Calendar grid */}
            <div className="p-4">
                {/* Day of week headers */}
                <div className="grid grid-cols-7 mb-2">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                            className="text-center font-medium text-gray-600 py-2"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const dayScreenings = screeningsByDate[dateStr] || [];
                        const isCurrentMonth =
                            day.getMonth() === currentDate.getMonth();
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div
                                key={index}
                                className={`border rounded-md min-h-[7rem] p-1
                                    ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                                    ${isToday ? 'border-blue-300' : 'border-gray-200'}
                                    cursor-pointer hover:border-blue-400`}
                                onClick={() => onDateClick(day)}
                            >
                                <div
                                    className={`text-right mb-1 ${isToday ? 'text-blue-600 font-bold' : ''}`}
                                >
                                    {format(day, 'd')}
                                </div>
                                <div className="space-y-1">
                                    {dayScreenings.length > 0 ? (
                                        dayScreenings.length <= 3 ? (
                                            dayScreenings.map((screening) => (
                                                <div
                                                    key={screening.id}
                                                    className={`text-xs p-1 rounded truncate
                                                        ${
                                                            screening.status ===
                                                            'upcoming'
                                                                ? 'bg-blue-50 text-blue-700'
                                                                : screening.status ===
                                                                    'ongoing'
                                                                  ? 'bg-green-50 text-green-700'
                                                                  : screening.status ===
                                                                      'completed'
                                                                    ? 'bg-gray-50 text-gray-700'
                                                                    : 'bg-red-50 text-red-700'
                                                        }`}
                                                >
                                                    {screening.startTime}{' '}
                                                    {screening.movie.title}
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                                {dayScreenings
                                                    .slice(0, 2)
                                                    .map((screening) => (
                                                        <div
                                                            key={screening.id}
                                                            className={`text-xs p-1 rounded truncate
                                                            ${
                                                                screening.status ===
                                                                'upcoming'
                                                                    ? 'bg-blue-50 text-blue-700'
                                                                    : screening.status ===
                                                                        'ongoing'
                                                                      ? 'bg-green-50 text-green-700'
                                                                      : screening.status ===
                                                                          'completed'
                                                                        ? 'bg-gray-50 text-gray-700'
                                                                        : 'bg-red-50 text-red-700'
                                                            }`}
                                                        >
                                                            {
                                                                screening.startTime
                                                            }{' '}
                                                            {
                                                                screening.movie
                                                                    .title
                                                            }
                                                        </div>
                                                    ))}
                                                <div className="text-xs p-1 text-center bg-gray-100 rounded">
                                                    +{dayScreenings.length - 2}{' '}
                                                    suất chiếu
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        isCurrentMonth && (
                                            <div className="text-xs text-gray-400 italic">
                                                Không có lịch chiếu
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Component for screening details
const ScreeningDetails = ({ screening, onClose }) => {
    if (!screening) return null;

    const ticketCategories = [
        {
            type: 'Người lớn',
            count: Math.floor(screening.ticketsSold * 0.7),
            price: 90000
        },
        {
            type: 'Học sinh/Sinh viên',
            count: Math.floor(screening.ticketsSold * 0.2),
            price: 75000
        },
        {
            type: 'Trẻ em',
            count:
                screening.ticketsSold -
                Math.floor(screening.ticketsSold * 0.7) -
                Math.floor(screening.ticketsSold * 0.2),
            price: 60000
        }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">
                        Chi tiết lịch chiếu
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
                        {/* Movie poster and info */}
                        <div className="md:w-1/3">
                            <div className="w-full aspect-[2/3] bg-gray-200 rounded-md overflow-hidden mb-3">
                                {screening.movie.posterUrl ? (
                                    <img
                                        src={screening.movie.posterUrl}
                                        alt={screening.movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                                        <MdLocalMovies className="text-gray-500 text-5xl" />
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-1">
                                {screening.movie.title}
                            </h3>
                            <div className="text-gray-600 mb-3">
                                <div className="flex items-center mb-1">
                                    <FaClock className="mr-2 text-gray-500" />
                                    <span>{screening.movie.duration} phút</span>
                                </div>
                                <div className="flex items-center mb-1">
                                    <FaFilm className="mr-2 text-gray-500" />
                                    <span>{screening.format}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <StatusBadge status={screening.status} />
                            </div>
                        </div>

                        {/* Screening details */}
                        <div className="md:w-2/3">
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Rạp chiếu
                                        </p>
                                        <p className="font-medium">
                                            {screening.cinema}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Phòng chiếu
                                        </p>
                                        <p className="font-medium">
                                            {screening.hall}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Ngày chiếu
                                        </p>
                                        <p className="font-medium">
                                            {format(
                                                parseISO(screening.date),
                                                'dd/MM/yyyy'
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Giờ chiếu
                                        </p>
                                        <p className="font-medium">
                                            {screening.startTime} -{' '}
                                            {screening.endTime}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h4 className="font-semibold text-gray-800 mb-3">
                                Thông tin vé
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Tổng số ghế
                                        </p>
                                        <p className="font-medium">
                                            {screening.totalSeats}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Số ghế đã đặt
                                        </p>
                                        <p className="font-medium">
                                            {screening.seatsBooked}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Tỉ lệ lấp đầy
                                        </p>
                                        <p className="font-medium">
                                            {Math.round(
                                                (screening.seatsBooked /
                                                    screening.totalSeats) *
                                                    100
                                            )}
                                            %
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Số vé đã bán
                                        </p>
                                        <p className="font-medium">
                                            {screening.ticketsSold}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Doanh thu
                                        </p>
                                        <p className="font-medium text-green-600">
                                            {screening.revenue.toLocaleString(
                                                'vi-VN'
                                            )}{' '}
                                            ₫
                                        </p>
                                    </div>
                                </div>

                                <h5 className="font-medium text-gray-700 mb-2">
                                    Chi tiết vé bán
                                </h5>
                                <div className="bg-white rounded border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Loại vé
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Số lượng
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Giá vé
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thành tiền
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {ticketCategories.map(
                                                (category, index) => (
                                                    <tr key={index}>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            {category.type}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            {category.count}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            {category.price.toLocaleString(
                                                                'vi-VN'
                                                            )}{' '}
                                                            ₫
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-gray-900">
                                                            {(
                                                                category.count *
                                                                category.price
                                                            ).toLocaleString(
                                                                'vi-VN'
                                                            )}{' '}
                                                            ₫
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-gray-50">
                                                <td
                                                    colSpan="3"
                                                    className="px-4 py-2 text-sm font-medium text-gray-900"
                                                >
                                                    Tổng cộng
                                                </td>
                                                <td className="px-4 py-2 text-sm font-medium text-green-600">
                                                    {screening.revenue.toLocaleString(
                                                        'vi-VN'
                                                    )}{' '}
                                                    ₫
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component for screening schedule management
const ScreeningScheduleManagement = () => {
    const [viewMode, setViewMode] = useState('day');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filters, setFilters] = useState({
        search: '',
        cinema: '',
        movie: '',
        status: '',
        date: format(currentDate, 'yyyy-MM-dd')
    });

    const [isLoading, setIsLoading] = useState(false);
    const [cinemaList, setCinemaList] = useState([]);
    const [moviesList, setMoviesList] = useState([]);
    const [screenings, setScreenings] = useState([]);
    const [filteredScreenings, setFilteredScreenings] = useState([]);
    const [selectedScreening, setSelectedScreening] = useState(null);
    const [showScreeningDetails, setShowScreeningDetails] = useState(false);

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

    // Generate sample screenings for the current week
    const generateSampleScreenings = () => {
        const startOfCurrentWeek = startOfWeek(currentDate, {
            weekStartsOn: 1
        });
        const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

        // Generate screenings for a range of days
        const generateForDateRange = (startDate, endDate) => {
            let sampleScreenings = [];
            let currentDay = startDate;

            while (currentDay <= endDate) {
                // Generate 10-15 screenings per day across different cinemas and movies
                const numScreenings = Math.floor(Math.random() * 6) + 10;

                for (let i = 0; i < numScreenings; i++) {
                    const cinemaIndex = Math.floor(
                        Math.random() * sampleCinemas.length
                    );
                    const movieIndex = Math.floor(
                        Math.random() * sampleMovies.length
                    );
                    const cinema = sampleCinemas[cinemaIndex];
                    const movie = sampleMovies[movieIndex];

                    // Random hall number
                    const hallNumber = Math.floor(Math.random() * 5) + 1;

                    // Random starting hour (between 8 and 22)
                    const startHour = Math.floor(Math.random() * 15) + 8;
                    const startMinute = [0, 30][Math.floor(Math.random() * 2)]; // Either 0 or 30

                    // Calculate end time based on movie duration
                    const startDate = new Date(currentDay);
                    startDate.setHours(startHour, startMinute, 0);

                    const endDate = new Date(startDate);
                    endDate.setMinutes(endDate.getMinutes() + movie.duration);

                    // Format times
                    const startTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
                    const endHour = endDate.getHours();
                    const endMinute = endDate.getMinutes();
                    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

                    // Determine status based on current time
                    const now = new Date();
                    let status;
                    if (isBefore(endDate, now)) {
                        status = 'completed';
                    } else if (
                        isBefore(startDate, now) &&
                        isAfter(endDate, now)
                    ) {
                        status = 'ongoing';
                    } else {
                        status = 'upcoming';
                    }

                    // Random values for seats and revenue
                    const totalSeats = Math.floor(Math.random() * 50) + 80; // 80-130 seats
                    const occupancyRate = Math.random(); // 0 to 1
                    const seatsBooked = Math.floor(totalSeats * occupancyRate);
                    const ticketsSold = seatsBooked; // Assuming 1 seat = 1 ticket for simplicity

                    // Average ticket price between 80,000 to 120,000 VND
                    const avgTicketPrice =
                        Math.floor(Math.random() * 40000) + 80000;
                    const revenue = ticketsSold * avgTicketPrice;

                    // Format for 2D, 3D, 4DX
                    const formats = ['2D', '3D', '4DX'];
                    const format =
                        formats[
                            Math.floor(
                                Math.random() * (movie.id === 'm5' ? 3 : 2)
                            )
                        ]; // Biệt Đội Đánh Thuê can be 4DX

                    // Create screening object
                    sampleScreenings.push({
                        id: `scr${sampleScreenings.length + 1}`,
                        date: format(currentDay, 'yyyy-MM-dd'),
                        cinemaId: cinema.id,
                        cinema: cinema.name,
                        hallId: `h${hallNumber}`,
                        hall: `Phòng ${hallNumber}`,
                        movieId: movie.id,
                        movie: {
                            ...movie
                        },
                        startTime,
                        endTime,
                        format,
                        totalSeats,
                        seatsBooked,
                        ticketsSold,
                        revenue,
                        status: Math.random() < 0.05 ? 'cancelled' : status // 5% chance of being cancelled
                    });
                }

                // Move to next day
                currentDay = addDays(currentDay, 1);
            }

            return sampleScreenings;
        };

        // Generate screenings for current week plus some buffer days
        const extendedStartDate = subDays(startOfCurrentWeek, 7);
        const extendedEndDate = addDays(endOfCurrentWeek, 7);

        return generateForDateRange(extendedStartDate, extendedEndDate);
    };

    // Load sample data
    useEffect(() => {
        // Simulating API call delay
        setTimeout(() => {
            setCinemaList(sampleCinemas);
            setMoviesList(sampleMovies);
            const generatedScreenings = generateSampleScreenings();
            setScreenings(generatedScreenings);
            setFilteredScreenings(generatedScreenings);
            setIsLoading(false);
        }, 800);
    }, []);

    // Filter screenings when filters change
    useEffect(() => {
        filterScreenings();
    }, [filters, screenings, currentDate, viewMode]);

    // Filter screenings based on current filters
    const filterScreenings = () => {
        let result = [...screenings];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(
                (screening) =>
                    screening.movie.title.toLowerCase().includes(searchLower) ||
                    screening.cinema.toLowerCase().includes(searchLower) ||
                    screening.hall.toLowerCase().includes(searchLower)
            );
        }

        // Apply cinema filter
        if (filters.cinema) {
            result = result.filter(
                (screening) => screening.cinemaId === filters.cinema
            );
        }

        // Apply movie filter
        if (filters.movie) {
            result = result.filter(
                (screening) => screening.movieId === filters.movie
            );
        }

        // Apply status filter
        if (filters.status) {
            result = result.filter(
                (screening) => screening.status === filters.status
            );
        }

        // Apply date filter based on viewMode
        if (viewMode === 'day') {
            // For day view, show only screenings on the selected date
            const filterDate =
                filters.date || format(currentDate, 'yyyy-MM-dd');
            result = result.filter(
                (screening) => screening.date === filterDate
            );
        } else if (viewMode === 'week') {
            // For week view, show screenings within the current week
            const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
            const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

            result = result.filter((screening) => {
                const screeningDate = parseISO(screening.date);
                return (
                    !isBefore(screeningDate, startDate) &&
                    !isAfter(screeningDate, endDate)
                );
            });
        } else if (viewMode === 'month') {
            // For month view, no additional filtering as we show markers for each day
            // But we could filter to the current month for performance with large datasets
            const startDate = startOfMonth(currentDate);
            const endDate = endOfMonth(currentDate);

            result = result.filter((screening) => {
                const screeningDate = parseISO(screening.date);
                return (
                    !isBefore(screeningDate, subDays(startDate, 7)) &&
                    !isAfter(screeningDate, addDays(endDate, 7))
                );
            });
        }

        // Sort by date and start time
        result.sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.startTime.localeCompare(b.startTime);
        });

        setFilteredScreenings(result);
    };

    // Handle filter changes
    const handleFilterChange = (filterName, value) => {
        if (filterName === 'reset') {
            setFilters({
                search: '',
                cinema: '',
                movie: '',
                status: '',
                date: format(currentDate, 'yyyy-MM-dd')
            });
        } else {
            setFilters({
                ...filters,
                [filterName]: value
            });

            // If changing date in the filters, update the current date as well
            if (filterName === 'date') {
                setCurrentDate(parseISO(value));
            }
        }
    };

    // Handle view mode changes
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    // Navigation handlers
    const handlePreviousDay = () => {
        const newDate = addDays(currentDate, -1);
        setCurrentDate(newDate);
        setFilters({
            ...filters,
            date: format(newDate, 'yyyy-MM-dd')
        });
    };

    const handleNextDay = () => {
        const newDate = addDays(currentDate, 1);
        setCurrentDate(newDate);
        setFilters({
            ...filters,
            date: format(newDate, 'yyyy-MM-dd')
        });
    };

    const handlePreviousWeek = () => {
        setCurrentDate(subWeeks(currentDate, 1));
    };

    const handleNextWeek = () => {
        setCurrentDate(addWeeks(currentDate, 1));
    };

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    // Handle date click in month view
    const handleDateClick = (date) => {
        setCurrentDate(date);
        setFilters({
            ...filters,
            date: format(date, 'yyyy-MM-dd')
        });
        setViewMode('day');
    };

    // Handle screening actions
    const handleScreeningClick = (screening) => {
        setSelectedScreening(screening);
        setShowScreeningDetails(true);
    };

    const handleEditScreening = (screening) => {
        alert(
            `Chỉnh sửa lịch chiếu: ${screening.movie.title} (${screening.date} ${screening.startTime})`
        );
    };

    const handleDeleteScreening = (screening) => {
        if (
            window.confirm(
                `Bạn có chắc chắn muốn xóa lịch chiếu phim "${screening.movie.title}" lúc ${screening.startTime} ngày ${format(parseISO(screening.date), 'dd/MM/yyyy')} không?`
            )
        ) {
            alert(
                `Đã xóa lịch chiếu: ${screening.movie.title} (${screening.date} ${screening.startTime})`
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader title="Quản lý lịch chiếu" />

            <div className="container mx-auto">
                <FiltersSection
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    cinemaList={cinemaList}
                    moviesList={moviesList}
                    onViewModeChange={handleViewModeChange}
                    viewMode={viewMode}
                />

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredScreenings.length === 0 && viewMode !== 'month' ? (
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <MdLocalMovies className="text-gray-400 text-5xl mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                            Không tìm thấy lịch chiếu
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Không có lịch chiếu nào phù hợp với bộ lọc đã chọn.
                        </p>
                        <button
                            onClick={() => handleFilterChange('reset')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Đặt lại bộ lọc
                        </button>
                    </div>
                ) : (
                    <div className="mt-4">
                        {viewMode === 'day' && (
                            <DayView
                                date={currentDate}
                                screenings={filteredScreenings}
                                onScreeningClick={handleScreeningClick}
                                onPreviousDay={handlePreviousDay}
                                onNextDay={handleNextDay}
                                onEditScreening={handleEditScreening}
                                onDeleteScreening={handleDeleteScreening}
                            />
                        )}

                        {viewMode === 'week' && (
                            <WeekView
                                currentDate={currentDate}
                                screenings={filteredScreenings}
                                onScreeningClick={handleScreeningClick}
                                onPreviousWeek={handlePreviousWeek}
                                onNextWeek={handleNextWeek}
                                onEditScreening={handleEditScreening}
                                onDeleteScreening={handleDeleteScreening}
                            />
                        )}

                        {viewMode === 'month' && (
                            <MonthView
                                currentDate={currentDate}
                                screenings={filteredScreenings}
                                onDateClick={handleDateClick}
                                onPreviousMonth={handlePreviousMonth}
                                onNextMonth={handleNextMonth}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Screening Details Modal */}
            {showScreeningDetails && selectedScreening && (
                <ScreeningDetails
                    screening={selectedScreening}
                    onClose={() => setShowScreeningDetails(false)}
                />
            )}
        </div>
    );
};

export default ScreeningScheduleManagement;
