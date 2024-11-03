import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = () => {
    return (
        <div class="flex justify-center py-5 xl:py-10 space-x-1">
            <button class="rounded-sm border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                <MdOutlineKeyboardArrowLeft size={20} />
            </button>
            <button class="min-w-9 rounded-sm bg-primary py-2 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-secondary focus:shadow-none active:bg-primary hover:bg-tertiary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                1
            </button>
            <button class="min-w-9 rounded-sm border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                2
            </button>
            <button class="min-w-9 rounded-sm border border-slate-300 py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                ...
            </button>
            <button class="min-w-9 rounded-sm border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2">
                <MdOutlineKeyboardArrowRight size={20} />
            </button>
        </div>
    )
}

export default Pagination
