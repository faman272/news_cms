import React, { useState } from 'react';
import { BiNews } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { BsPersonVcard } from "react-icons/bs";
import { Link, usePage } from '@inertiajs/react';

const Sidebar = () => {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Get the middle of url
    const middle = url.split('/')[2];

    const isDashboard = (path) => url === path;

    const isActive = (path) => middle === path;


    return (
        <div>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition-transform duration-300 transform bg-gray-900 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center gap-2">
                        <img src="/images/usu.png" alt="" className='w-10 h-10' />
                        <span className="mx-2 text-2xl font-semibold text-white">Dashboard</span>
                    </div>
                </div>

                <nav className="h-screen mt-10">
                    <Link
                        href="/dashboard"
                        className={`flex items-center px-6 py-2 mt-4 ${isDashboard('/dashboard') ? 'bg-gray-700 text-gray-100' : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'}`}
                    >
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        <span className="mx-3">Dashboard</span>
                    </Link>

                    <Link
                        href="/dashboard/news"
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('news') ? 'bg-gray-700 text-gray-100' : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'}`}
                    >
                        <BiNews className="w-6 h-6" />
                        <span className="mx-3">News</span>
                    </Link>

                    <Link
                        href="/dashboard/categories"
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('categories') ? 'bg-gray-700 text-gray-100' : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'}`}
                    >
                        <TbCategoryPlus className="w-6 h-6" />
                        <span className="mx-3">Category News</span>
                    </Link>

                    <Link
                        href="/dashboard/authors"
                        className={`flex items-center px-6 py-2 mt-4 ${isActive('authors') ? 'bg-gray-700 text-gray-100' : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'}`}
                    >
                        <BsPersonVcard className="w-6 h-6" />
                        <span className="mx-3">Authors</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
