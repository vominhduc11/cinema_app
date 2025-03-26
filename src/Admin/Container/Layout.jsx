import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-20 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}
            >
                <Sidebar isOpen={sidebarOpen} />
            </div>

            {/* Header and Main Content Container */}
            <div
                className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
            >
                {/* Header */}
                <div className="sticky top-0 z-30 w-full">
                    <Header
                        toggleSidebar={toggleSidebar}
                        sidebarOpen={sidebarOpen}
                    />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-0">
                    <div className="pt-16">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
