import React from 'react';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import { MdConfirmationNumber } from 'react-icons/md';
import { FaChevronLeft, FaQrcode } from 'react-icons/fa';

function PaymentModal({
    paymentModalOpen,
    setPaymentModalOpen,
    movie,
    currentCinema,
    currentTime,
    selectedSeats,
    combos,
    ticketId,
    getFormattedDate,
    getSeatsTotal,
    getTotalAmount,
    formatCurrency,
    completePayment,
    customModalStyles,
    setComboModalOpen
}) {
    return (
        <Modal
            isOpen={paymentModalOpen}
            onRequestClose={() => setPaymentModalOpen(false)}
            style={customModalStyles}
            contentLabel="Payment Modal"
            closeTimeoutMS={300}
        >
            <div className="bg-gray-800 text-white max-w-3xl w-full overflow-hidden animate-fadeIn">
                <div className="bg-gray-900 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center">
                        <MdConfirmationNumber className="mr-2" /> Thông Tin Vé
                    </h2>
                    <button
                        onClick={() => setPaymentModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Ticket info */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden mb-6 divide-y divide-gray-700 animate-fadeInUp">
                        <div className="p-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-gray-900">
                            <h3 className="text-lg font-bold">Vé Xem Phim</h3>
                            <p className="text-sm">Mã vé: {ticketId}</p>
                        </div>

                        <div className="p-4 flex items-start">
                            <img
                                src={movie?.posterUrl}
                                alt={movie?.title}
                                className="w-20 h-30 object-cover rounded"
                            />
                            <div className="ml-4 flex-1">
                                <h3 className="font-bold">{movie?.title}</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                                    <div>
                                        <p className="text-gray-400">
                                            Rạp chiếu:
                                        </p>
                                        <p>{currentCinema?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">
                                            Suất chiếu:
                                        </p>
                                        <p>
                                            {currentTime} | {getFormattedDate()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Ghế:</p>
                                        <p className="text-yellow-500">
                                            {selectedSeats
                                                .map((seat) => seat.id)
                                                .join(', ')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">
                                            Thành tiền:
                                        </p>
                                        <p className="text-yellow-500 font-bold">
                                            {formatCurrency(getSeatsTotal())}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Food and drinks */}
                        {combos.some((combo) => combo.quantity > 0) && (
                            <div className="p-4">
                                <h4 className="font-medium mb-3">Bắp & Nước</h4>
                                <div className="space-y-2">
                                    {combos
                                        .filter((combo) => combo.quantity > 0)
                                        .map((combo) => (
                                            <div
                                                key={combo.id}
                                                className="flex justify-between text-sm"
                                            >
                                                <span>
                                                    {combo.name} x
                                                    {combo.quantity}
                                                </span>
                                                <span className="text-yellow-500">
                                                    {formatCurrency(
                                                        combo.price *
                                                            combo.quantity
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {/* Total */}
                        <div className="p-4 bg-gray-700">
                            <div className="flex justify-between items-center">
                                <h4 className="font-bold">Tổng thanh toán</h4>
                                <span className="text-xl font-bold text-yellow-500">
                                    {formatCurrency(getTotalAmount())}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Payment Section */}
                    <div
                        className="flex flex-col items-center mb-6 animate-fadeInUp bg-gray-900 rounded-lg p-6"
                        style={{ animationDelay: '200ms' }}
                    >
                        <h3 className="font-bold mb-4 text-center">
                            Thanh toán bằng mã QR
                        </h3>

                        <div className="bg-white p-5 rounded-lg mb-4 relative">
                            <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse rounded-lg"></div>
                            <FaQrcode className="text-black w-56 h-56 relative z-10" />
                        </div>

                        <div className="text-center">
                            <p className="text-yellow-500 font-bold mb-2">
                                {formatCurrency(getTotalAmount())}
                            </p>
                            <p className="text-sm text-gray-300 mb-4">
                                Vui lòng quét mã QR bằng ứng dụng ngân hàng hoặc
                                ví điện tử để thanh toán
                            </p>
                            <div className="flex justify-center space-x-2">
                                <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">
                                    Quét bằng ứng dụng ngân hàng
                                </span>
                                <span className="px-2 py-1 bg-gray-700 rounded-md text-xs">
                                    Thời gian: 15:00
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div
                        className="bg-gray-900 rounded-lg p-4 mb-6 animate-fadeInUp"
                        style={{ animationDelay: '300ms' }}
                    >
                        <div className="flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-ping"></div>
                            <p className="text-yellow-500">
                                Đang chờ thanh toán...
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div
                        className="flex justify-between animate-fadeInUp"
                        style={{ animationDelay: '400ms' }}
                    >
                        <button
                            onClick={() => {
                                setPaymentModalOpen(false);
                                setComboModalOpen(true);
                            }}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                        >
                            <FaChevronLeft className="mr-2" /> Quay lại
                        </button>
                        <button
                            onClick={completePayment}
                            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg transition-colors font-bold"
                        >
                            Đã thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default PaymentModal;
