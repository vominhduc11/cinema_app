import React from 'react';
import Modal from 'react-modal';
import { IoFastFood, IoClose } from 'react-icons/io5';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ComboSelectionModal({
    comboModalOpen,
    setComboModalOpen,
    combos,
    selectedSeats,
    setSeatModalOpen,
    updateComboQuantity,
    getSeatsTotal,
    getTotalAmount,
    proceedToPayment,
    customModalStyles,
    formatCurrency
}) {
    return (
        <Modal
            isOpen={comboModalOpen}
            onRequestClose={() => setComboModalOpen(false)}
            style={customModalStyles}
            contentLabel="Combo Selection Modal"
            closeTimeoutMS={300}
        >
            <div className="bg-gray-800 text-white max-w-3xl w-full overflow-hidden animate-fadeIn">
                <div className="bg-gray-900 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center">
                        <IoFastFood className="mr-2" /> Chọn Bắp & Nước
                    </h2>
                    <button
                        onClick={() => setComboModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Seats summary */}
                    <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">Ghế đã chọn</p>
                                <p className="text-yellow-500">
                                    {selectedSeats
                                        .map((seat) => seat.id)
                                        .join(', ')}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm">Tổng tiền ghế</p>
                                <p className="font-bold text-yellow-500">
                                    {formatCurrency(getSeatsTotal())}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Combos */}
                    <div className="space-y-4 mb-6">
                        {combos.map((combo) => (
                            <div
                                key={combo.id}
                                className="flex bg-gray-700 rounded-lg overflow-hidden transition-transform hover:scale-[1.01] animate-fadeIn"
                                style={{
                                    animationDelay: `${combo.id * 100}ms`
                                }}
                            >
                                <img
                                    src={combo.image}
                                    alt={combo.name}
                                    className="w-24 h-24 object-cover"
                                />
                                <div className="flex-1 p-3 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">
                                            {combo.name}
                                        </h3>
                                        <p className="text-sm text-gray-300">
                                            {combo.description}
                                        </p>
                                        <p className="text-yellow-500 font-bold">
                                            {formatCurrency(combo.price)}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() =>
                                                updateComboQuantity(
                                                    combo.id,
                                                    -1
                                                )
                                            }
                                            className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="mx-3 w-5 text-center">
                                            {combo.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateComboQuantity(combo.id, 1)
                                            }
                                            className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="p-4 bg-gray-700 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">Tổng Đơn Hàng</p>
                                <p className="text-sm text-gray-300">
                                    Vé + Đồ ăn
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-yellow-500">
                                    {formatCurrency(getTotalAmount())}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <button
                            onClick={() => {
                                setComboModalOpen(false);
                                setSeatModalOpen(true);
                            }}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                        >
                            <FaChevronLeft className="mr-2" /> Quay lại
                        </button>
                        <button
                            onClick={proceedToPayment}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-lg transition-colors flex items-center"
                        >
                            Tiếp tục <FaChevronRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ComboSelectionModal;
