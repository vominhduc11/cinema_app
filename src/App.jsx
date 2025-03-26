import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './User/Contents/Home';
import Detail from './User/Contents/Detail';
import NotFound from './User/Containers/NotFound';
import Container from './User/Containers/Container';
import ChangePassword from './User/Containers/ChangePassword';
import PaymentSuccess from './User/Containers/PaymentSuccess';
import PaymentFailed from './User/Containers/PaymentFailed';
import BookingHistory from './User/Contents/BookingHistory';
import Notifications from './User/Contents/Notifications';
import Header from './Admin/Header';
import Sidebar from './Admin/Sidebar';
import { useState } from 'react';
import Layout from './Admin/Container/Layout';
import Dashboard from './Admin/Content/Dashboard';
import MoviesList from './Admin/Content/MoviesList';
import MoviesAdd from './Admin/Content/MoviesAdd';
import MoviesCategories from './Admin/Content/MoviesCategories';
import TheatersList from './Admin/Content/TheatersList';
import CinemaHallManagement from './Admin/Content/CinemaHallManagement';
import ScreeningScheduleManagement from './Admin/Content/ScreeningScheduleManagement';
import TicketManagement from './Admin/Content/TicketManagement';
import UserManagement from './Admin/Content/UserManagement';
import PromotionManagement from './Admin/Content/PromotionManagement';

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // eslint-disable-next-line
    const [role, setRole] = useState('admin');
    // eslint-disable-next-line
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            {role === 'user' && (
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route
                        path="/changePassword"
                        element={<ChangePassword />}
                    />
                    <Route
                        path="/paymentSuccess"
                        element={<PaymentSuccess />}
                    />
                    <Route path="/paymentFailed" element={<PaymentFailed />} />
                    <Route path="/" element={<Container />}>
                        <Route
                            index
                            element={<Navigate to="/home" replace />}
                        />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/bookingHistory"
                            element={<BookingHistory />}
                        />
                        <Route path="/detail/:id" element={<Detail />} />
                        <Route
                            path="/notification"
                            element={<Notifications />}
                        />
                    </Route>
                </Routes>
            )}

            {role === 'admin' && (
                <>
                    {/* <Header toggleSidebar={toggleSidebar} /> */}
                    <Sidebar sidebarOpen={sidebarOpen} />
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Layout />}>
                            <Route
                                index
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/moviesList"
                                element={<MoviesList />}
                            />
                            <Route path="/moviesAdd" element={<MoviesAdd />} />
                            <Route
                                path="/moviesCategories"
                                element={<MoviesCategories />}
                            />
                            <Route
                                path="/theatersList"
                                element={<TheatersList />}
                            />
                            <Route
                                path="/cinemaHallManagement"
                                element={<CinemaHallManagement />}
                            />
                            <Route
                                path="/screeningScheduleManagement"
                                element={<ScreeningScheduleManagement />}
                            />
                            <Route
                                path="/ticketManagement"
                                element={<TicketManagement />}
                            />
                            <Route
                                path="/userManagement"
                                element={<UserManagement />}
                            />
                            <Route
                                path="/promotionManagement"
                                element={<PromotionManagement />}
                            />
                        </Route>
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
