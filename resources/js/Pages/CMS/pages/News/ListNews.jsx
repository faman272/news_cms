import React, { useState } from 'react';
import Main from '../../layouts/Main';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline, MdOutlineAddCircle } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import formatDate from '@/Pages/News/utils/formatDate';
import { IoSearchOutline } from 'react-icons/io5';

const News = ({ news: initialNews }) => {
    const [news, setNews] = useState(initialNews);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set the number of items per page

    // Search state
    const [searchTerm, setSearchTerm] = useState('');

    // Calculate total pages
    const filteredNews = news.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.categories.some(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    // Get current news for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    const handleDeleteModal = (id) => {
        setDeleteId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/dashboard/news/${deleteId}`);
            setNews(news.filter(item => item.id !== deleteId));
            setIsDeleteModalOpen(false);
            setDeleteId(null);
            toast.success('News deleted successfully!');
        } catch (error) {
            console.error('Error deleting news:', error);
            toast.error('Failed to delete news');
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Main>
            <h3 className="text-3xl font-medium text-gray-700">Data News</h3>
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-1/3 p-6 text-center bg-white rounded-lg shadow-lg">
                        <div className='flex justify-center w-full py-4'>
                            <MdDeleteOutline size={56} className="text-gray-400" />
                        </div>
                        <h3 className="py-2 text-xl text-gray-700">
                            Are you sure you want to delete data?
                        </h3>
                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={handleDeleteCancel} className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300">
                                No, Cancel
                            </button>
                            <button onClick={handleDeleteConfirm} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500">
                                Yes, I am Sure
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <div className="mt-6">
                    <div className="flex flex-col mt-3 sm:flex-row">
                        <div className="flex justify-between w-full ">
                            {/* Search bar */}
                            <div className="relative block w-1/3 mt-2 sm:mt-0">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <IoSearchOutline size={20} />
                                </span>
                                <input 
                                    type="text"
                                    placeholder="Search news by title or category"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full py-2 pl-8 pr-6 text-lg text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                                />
                            </div>
                        </div>
                        <div>
                            <a href='/dashboard/news/create' className="flex items-center gap-2 px-6 py-2 ml-3 font-medium tracking-wide text-white bg-green-600 rounded-md hover:bg-green-500">
                                Add <MdOutlineAddCircle size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        No.
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Image
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Title
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Categories
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Author
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Published Date
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentNews.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="px-5 py-5 text-lg bg-white border-b border-gray-200 ">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt="News" />
                                        </td>
                                        <td className="py-5 text-lg font-medium bg-white border-b border-gray-200 truncate-titlepx-5">{item.title}</td>
                                        <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                            <div className='flex flex-col gap-2 text-nowrap'>
                                                {
                                                    item.categories.map((category, index) => {
                                                        return (
                                                            <span key={index} className='px-2 py-1 text-sm text-center rounded-md bg-primary30 text-primary'>
                                                                {category.name}
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                            {item.author.name}
                                        </td>
                                        <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">{formatDate(item.created_at)}</td>
                                        <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                            <div className="inline-flex mt-2 xs:mt-0">
                                                <a href={`/dashboard/news/${item.id}`} className="px-4 py-2 font-semibold rounded-l bg-slate-200 hover:bg-slate-300 text-primary">
                                                    <FaRegEdit size={18} />
                                                </a>
                                                <button onClick={() => handleDeleteModal(item.id)} className="px-4 py-2 font-semibold text-red-600 rounded-r bg-slate-200 hover:bg-slate-300">
                                                    <MdDeleteOutline size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ div>
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center mt-4">
                    {Array(totalPages).fill(0).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 text-lg font-medium rounded ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-white'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </Main>
    );
};

export default News;