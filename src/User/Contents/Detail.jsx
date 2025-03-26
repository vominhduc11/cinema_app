import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FaStar,
    FaChevronLeft,
    FaChevronRight,
    FaQrcode
} from 'react-icons/fa';
import { IoFastFood, IoClose } from 'react-icons/io5';
import { MdEventSeat, MdConfirmationNumber } from 'react-icons/md';
import Modal from 'react-modal';
import nowShowingMovies from '../Data/nowShowingMovies';
import HeroSection from '../Components/Detail/HeroSection';
import ContentFilm from '../Components/Detail/ContentFilm';
import CastAndCrew from '../Components/Detail/CastAndCrew';
import Showtime from '../Components/Detail/Showtime';
import ReviewSection from '../Components/Detail/ReviewSection';
import RelatedMovies from '../Components/Detail/RelatedMovies';
import TrailerModal from '../Modals/TrailerModal';
import SeatSelectionModal from '../Modals/SeatSelectionModal';
import ComboSelectionModal from '../Modals/ComboSelectionModal';
import PaymentModal from '../Modals/PaymentModal';

const customModalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#1F2937', // gray-800
        border: 'none',
        borderRadius: '0.5rem',
        padding: 0,
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'auto'
    }
};

const Detail = () => {
    const [movie, setMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(0);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    // Modal states
    const [trailerModalOpen, setTrailerModalOpen] = useState(false);
    const [seatModalOpen, setSeatModalOpen] = useState(false);
    const [comboModalOpen, setComboModalOpen] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);

    // Current selected data
    const [currentCinema, setCurrentCinema] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Get next 7 days for showtimes
    const getDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const dates = getDates();

    // Find the movie either from URL params or use first movie as fallback
    useEffect(() => {
        if (nowShowingMovies && nowShowingMovies.length > 0) {
            const foundMovie = id
                ? nowShowingMovies.find((m) => m.id === Number(id))
                : nowShowingMovies[0];

            setMovie(foundMovie);
            setLoading(false);
        }
    }, [id]);

    const formatDate = (date) => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return {
            day: date.getDate(),
            weekday: days[date.getDay()],
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };
    };
    // Format date for display in modals
    const getFormattedDate = () => {
        const date = dates[selectedDate];
        const formatted = formatDate(date);
        return `${formatted.weekday}, ${formatted.day}/${formatted.month}/${formatted.year}`;
    };

    // Seat generation
    const generateSeats = () => {
        const rows = 'ABCDEFGHIJ';
        const seatsData = [];

        for (let i = 0; i < rows.length; i++) {
            const row = [];
            for (let j = 1; j <= 12; j++) {
                // Random status for demonstration
                const status =
                    Math.random() < 0.2
                        ? 'taken'
                        : Math.random() < 0.3
                          ? 'vip'
                          : 'available';

                row.push({
                    id: `${rows[i]}${j}`,
                    row: rows[i],
                    number: j,
                    status,
                    price: status === 'vip' ? 120000 : 90000
                });
            }
            seatsData.push(row);
        }

        return seatsData;
    };

    const [seats, setSeats] = useState(generateSeats());

    // Reset seats when opening modal
    useEffect(() => {
        if (seatModalOpen) {
            setSeats(generateSeats());
            setSelectedSeats([]);
        }
    }, [seatModalOpen]);

    // Toggle seat selection
    const toggleSeat = (seat) => {
        if (seat.status === 'taken') return;

        if (selectedSeats.find((s) => s.id === seat.id)) {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    // Combos data
    const [combos, setCombos] = useState([
        {
            id: 1,
            name: 'Combo Đơn',
            description: '1 bắp lớn + 1 nước lớn',
            price: 85000,
            image: 'https://placehold.co/200x150/orange/white?text=Combo+1',
            quantity: 0
        },
        {
            id: 2,
            name: 'Combo Đôi',
            description: '1 bắp lớn + 2 nước lớn',
            price: 115000,
            image: 'https://placehold.co/200x150/orange/white?text=Combo+2',
            quantity: 0
        },
        {
            id: 3,
            name: 'Combo Gia Đình',
            description: '2 bắp lớn + 4 nước lớn',
            price: 195000,
            image: 'https://placehold.co/200x150/orange/white?text=Combo+3',
            quantity: 0
        },
        {
            id: 4,
            name: 'Bắp Rang Bơ',
            description: 'Size L',
            price: 45000,
            image: 'https://placehold.co/200x150/yellow/white?text=Popcorn',
            quantity: 0
        },
        {
            id: 5,
            name: 'Nước Ngọt',
            description: 'Coca, Pepsi, Sprite',
            price: 35000,
            image: 'https://placehold.co/200x150/brown/white?text=Drink',
            quantity: 0
        }
    ]);

    // Reset combos when opening combo modal
    useEffect(() => {
        if (comboModalOpen) {
            setCombos(combos.map((combo) => ({ ...combo, quantity: 0 })));
        }
    }, [comboModalOpen]);

    // Update combo quantity
    const updateComboQuantity = (id, increment) => {
        setCombos(
            combos.map((combo) => {
                if (combo.id === id) {
                    const newQuantity = combo.quantity + increment;
                    return {
                        ...combo,
                        quantity: newQuantity < 0 ? 0 : newQuantity
                    };
                }
                return combo;
            })
        );
    };

    // Calculate totals
    const getSeatsTotal = () => {
        return selectedSeats.reduce((total, seat) => {
            return total + (seat.status === 'vip' ? 120000 : 90000);
        }, 0);
    };

    const getCombosTotal = () => {
        return combos.reduce((total, combo) => {
            return total + combo.price * combo.quantity;
        }, 0);
    };

    const getTotalAmount = () => {
        return getSeatsTotal() + getCombosTotal();
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Handle trailer view
    const openTrailerModal = () => {
        setTrailerModalOpen(true);
    };

    // Proceed to next steps
    const proceedToComboSelection = () => {
        if (selectedSeats.length === 0) return;
        setSeatModalOpen(false);
        setComboModalOpen(true);
    };

    const proceedToPayment = () => {
        setComboModalOpen(false);
        setPaymentModalOpen(true);
    };

    const completePayment = () => {
        // In a real app, we would process payment here
        // For demo, just close all modals and reset state
        setPaymentModalOpen(false);
        setSelectedSeats([]);
        setCombos(combos.map((combo) => ({ ...combo, quantity: 0 })));

        // Show success message
        alert('Thanh toán thành công! Vé của bạn đã được đặt.');
    };

    // Generate a random ticket ID for demo
    const ticketId =
        'TIX' +
        Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0');

    // Add animation styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-in-out;
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes fadeInUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }

      .modal-overlay {
        opacity: 0;
        transition: opacity 300ms ease-in-out;
      }
      
      .modal-overlay.ReactModal__Overlay--after-open {
        opacity: 1;
      }
      
      .modal-overlay.ReactModal__Overlay--before-close {
        opacity: 0;
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Phim không tồn tại
                    </h2>
                    <Link
                        to="/"
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero section with backdrop */}
            <HeroSection movie={movie} openTrailerModal={openTrailerModal} />
            {/* Movie synopsis */}
            <ContentFilm movie={movie} />
            {/* Cast and crew */}
            <CastAndCrew />
            {/* Showtimes */}
            <Showtime
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                currentCinema={currentCinema}
                setCurrentCinema={setCurrentCinema}
                setCurrentTime={setCurrentTime}
                setSeatModalOpen={setSeatModalOpen}
                dates={dates}
                movie={movie}
            />

            {/* Reviews section */}
            <ReviewSection />

            {/* Related movies */}
            <RelatedMovies />

            {/* Trailer Modal */}
            <TrailerModal
                trailerModalOpen={trailerModalOpen}
                setTrailerModalOpen={setTrailerModalOpen}
                selectedMovie={movie}
            />

            {/* Seat Selection Modal */}
            <SeatSelectionModal
                seatModalOpen={seatModalOpen}
                setSeatModalOpen={setSeatModalOpen}
                seats={seats}
                toggleSeat={toggleSeat}
                selectedSeats={selectedSeats}
                getSeatsTotal={getSeatsTotal}
                formatCurrency={formatCurrency}
                setComboModalOpen={setComboModalOpen}
                getFormattedDate={getFormattedDate}
                currentCinema={currentCinema}
                currentTime={currentTime}
                proceedToComboSelection={proceedToComboSelection}
                customModalStyles={customModalStyles}
            />
            {/* Combo Selection Modal */}
            <ComboSelectionModal
                comboModalOpen={comboModalOpen}
                setComboModalOpen={setComboModalOpen}
                combos={combos}
                updateComboQuantity={updateComboQuantity}
                getCombosTotal={getCombosTotal}
                formatCurrency={formatCurrency}
                proceedToPayment={proceedToPayment}
                customModalStyles={customModalStyles}
                selectedSeats={selectedSeats}
                getSeatsTotal={getSeatsTotal}
                getTotalAmount={getTotalAmount}
            />
            {/* Payment Modal */}
            <PaymentModal
                paymentModalOpen={paymentModalOpen}
                setPaymentModalOpen={setPaymentModalOpen}
                completePayment={completePayment}
                customModalStyles={customModalStyles}
                formatCurrency={formatCurrency}
                ticketId={ticketId}
                selectedSeats={selectedSeats}
                getSeatsTotal={getSeatsTotal}
                combos={combos}
                getCombosTotal={getCombosTotal}
                getTotalAmount={getTotalAmount}
                setComboModalOpen={setComboModalOpen}
                getFormattedDate={getFormattedDate}
            />
        </div>
    );
};

export default Detail;
