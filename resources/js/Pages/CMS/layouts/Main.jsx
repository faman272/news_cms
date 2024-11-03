import React from 'react'
import Sidebar from '../partials/Sidebar'
import Header from '../partials/Header'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const Main = ({ children }) => {
    return (

        <div className="flex h-screen bg-gray-200 font-roboto">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="light" />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <Header />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container px-6 py-8 mx-auto">

                        {/* Content */}
                        {children}

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Main
