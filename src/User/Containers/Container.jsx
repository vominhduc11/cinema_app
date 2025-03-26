import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../User/Layouts/Header';
import Navbar from '../../User/Layouts/Navbar';
import Footer from '../../User/Layouts/Footer';

function Container() {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Container;
