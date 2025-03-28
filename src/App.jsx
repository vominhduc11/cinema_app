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
import { useState } from 'react';
import Layout from './Admin/Layouts/Layout';
import AllUsersPage from './Admin/Contents/AllUsersPage';
import DashboardPage from './Admin/Contents/DashboardPage';
import RolesPermissionsPage from './Admin/Contents/RolesPermissionsPage';
import AllMoviesPage from './Admin/Contents/AllMoviesPage';
import MovieSchedulesPage from './Admin/Contents/MovieSchedulesPage';
import AllTheatersPage from './Admin/Contents/AllTheatersPage';
import TheaterLocationsPage from './Admin/Contents/TheaterLocationsPage';
import MoviesByTheaterPage from './Admin/Contents/MoviesByTheaterPage';
import AllRoomsPage from './Admin/Contents/AllRoomsPage';
import ShowtimesPage from './Admin/Contents/ShowtimesPage';
import AllPromotionsPage from './Admin/Contents/AllPromotionsPage';
import DiscountsPage from './Admin/Contents/DiscountsPage';
import SendNotificationsPage from './Admin/Contents/SendNotificationsPage';

function App() {
    // eslint-disable-next-line
    const [role, setRole] = useState('admin');

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
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Layout />}>
                            <Route
                                path="/allusers"
                                element={<AllUsersPage />}
                            />
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/roles"
                                element={<RolesPermissionsPage />}
                            />
                            <Route path="/movies" element={<AllMoviesPage />} />
                            <Route
                                path="/schedules"
                                element={<MovieSchedulesPage />}
                            />
                            <Route
                                path="/theaters"
                                element={<AllTheatersPage />}
                            />
                            <Route
                                path="/locations"
                                element={<TheaterLocationsPage />}
                            />
                            <Route
                                path="/movies-by-theater"
                                element={<MoviesByTheaterPage />}
                            />
                            <Route path="/rooms" element={<AllRoomsPage />} />
                            <Route
                                path="/showtimes"
                                element={<ShowtimesPage />}
                            />
                            <Route
                                path="/promotions"
                                element={<AllPromotionsPage />}
                            />
                            <Route
                                path="/discounts"
                                element={<DiscountsPage />}
                            />
                            <Route
                                path="/notifications"
                                element={<SendNotificationsPage />}
                            />
                        </Route>
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
