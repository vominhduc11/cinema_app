import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { MdEventSeat } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function SeatSelectionModal({
    seatModalOpen,
    setSeatModalOpen,
    movie,
    currentCinema,
    getFormattedDate,
    seats,
    selectedSeats,
    toggleSeat,
    currentTime,
    getSeatsTotal,
    formatCurrency,
    proceedToComboSelection,
    customModalStyles
}) {
    return (
        <Modal
            isOpen={seatModalOpen}
            onRequestClose={() => setSeatModalOpen(false)}
            style={customModalStyles}
            contentLabel="Seat Selection Modal"
            closeTimeoutMS={300}
        >
            <div className="bg-gray-800 text-white max-w-3xl w-full overflow-hidden animate-fadeIn">
                <div className="bg-gray-900 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center">
                        <MdEventSeat className="mr-2" /> Chọn Ghế Ngồi
                    </h2>
                    <button
                        onClick={() => setSeatModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Movie info */}
                    <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-start">
                            <img
                                src={movie?.posterUrl}
                                alt={movie?.title}
                                className="w-16 h-24 object-cover rounded"
                            />
                            <div className="ml-4">
                                <h3 className="font-bold">{movie?.title}</h3>
                                <p className="text-sm text-gray-300">
                                    {currentCinema?.name}
                                </p>
                                <p className="text-sm text-gray-300">
                                    {getFormattedDate()} | {currentTime}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Screen */}
                    <div className="relative mb-8">
                        <div className="h-3 bg-blue-500 rounded-t-full mx-auto w-3/4"></div>
                        <div className="text-center text-sm text-gray-400 mt-1">
                            Màn hình
                        </div>
                    </div>

                    {/* Seats */}
                    <div className="grid place-items-center mb-8">
                        <div className="grid grid-cols-12 gap-1">
                            {seats.flatMap((row, rowIndex) =>
                                row.map((seat, seatIndex) => (
                                    <button
                                        key={`${rowIndex}-${seatIndex}`}
                                        className={`w-7 h-7 rounded-t text-xs font-bold transition-all transform hover:scale-110 ${
                                            selectedSeats.find(
                                                (s) => s.id === seat.id
                                            )
                                                ? 'bg-yellow-500 text-gray-900'
                                                : seat.status === 'taken'
                                                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                  : seat.status === 'vip'
                                                    ? 'bg-red-700 text-white'
                                                    : 'bg-gray-500 text-white'
                                        }`}
                                        onClick={() => toggleSeat(seat)}
                                        disabled={seat.status === 'taken'}
                                        title={seat.id}
                                    >
                                        {seatIndex === 0 ? seat.row : ''}
                                        {rowIndex === 0 ? seat.number : ''}
                                        {seatIndex !== 0 && rowIndex !== 0
                                            ? ''
                                            : ''}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center space-x-6 mb-6 text-sm">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-500 rounded-t mr-2"></div>
                            <span>Thường</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-700 rounded-t mr-2"></div>
                            <span>VIP</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-t mr-2"></div>
                            <span>Đã chọn</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-600 rounded-t mr-2"></div>
                            <span>Đã bán</span>
                        </div>
                    </div>

                    {/* Selected seats summary */}
                    {selectedSeats.length > 0 && (
                        <div className="p-4 bg-gray-700 rounded-lg mb-6 animate-fadeIn">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold">
                                        Ghế đã chọn ({selectedSeats.length})
                                    </p>
                                    <p className="text-yellow-500">
                                        {selectedSeats
                                            .map((seat) => seat.id)
                                            .join(', ')}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm">Tổng tiền</p>
                                    <p className="text-xl font-bold text-yellow-500">
                                        {formatCurrency(getSeatsTotal())}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            onClick={() => setSeatModalOpen(false)}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                        >
                            <FaChevronLeft className="mr-2" /> Quay lại
                        </button>
                        <button
                            onClick={proceedToComboSelection}
                            className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                                selectedSeats.length === 0
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                            }`}
                            disabled={selectedSeats.length === 0}
                        >
                            Tiếp tục <FaChevronRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default SeatSelectionModal;
