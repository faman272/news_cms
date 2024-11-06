import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className="flex justify-center py-5 space-x-1 xl:py-10">
            <button
                className="px-3 py-2 ml-2 text-sm text-center transition-all border rounded-sm shadow-sm border-slate-300 hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <MdOutlineKeyboardArrowLeft size={20} />
            </button>
            {Array(totalPages)
                .fill(0)
                .map((_, index) => (
                    <button
                        key={index + 1}
                        className={`min-w-9 rounded-sm ${currentPage === index + 1
                            ? "bg-primary text-white"
                            : "border border-slate-300 text-darkGrey hover:text-white hover:bg-primary"
                            } py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg focus:bg-secondary focus:shadow-none active:bg-primary hover:bg-tertiary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            <button
                className="px-3 py-2 ml-2 text-sm text-center transition-all border rounded-sm shadow-sm border-slate-300 hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <MdOutlineKeyboardArrowRight size={20} />
            </button>
        </div>
    )
}

export default Pagination
