import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";

const InputSearch = ({ setSearchQuery }) => {
    const [query, setQuery] = useState('');

    const handleOnChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setSearchQuery(query); 
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="relative flex items-center w-full">
                <FiSearch size={16} className="absolute text-gray-500 left-3" />
                <input
                    type="text"
                    value={query} // Mengatur nilai input
                    onChange={handleOnChange} // Menangani perubahan input
                    placeholder="CARI DISINI"
                    className="w-[222px] lg:w-[325px] xl:w-[420px] h-[34px] text-xs leading-2xs lg:text-base pl-10 pr-3 text-right placeholder-gray-400 border border-gray-300 rounded-sm focus:outline-none focus:border-primary"
                />
            </div>
            <button type='submit' className="py-2 text-xs font-bold text-white rounded-sm bg-primary leading-2xs lg:text-sm px-7">
                CARI
            </button>
        </form>
    );
};

export default InputSearch;