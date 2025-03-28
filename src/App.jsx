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

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // eslint-disable-next-line
    const [role, setRole] = useState('admin');

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
                    <Header />
                    <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
                </>
            )}
        </>
    );
}

export default App;
