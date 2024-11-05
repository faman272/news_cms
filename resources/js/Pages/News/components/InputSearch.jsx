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
        <form onSubmit={handleSubmit} className="flex w-full gap-4 xl:w-1/2">
            <div className="relative flex items-center w-full ">
                <FiSearch size={16} className="absolute text-primary left-3" />
                <input
                    type="text"
                    value={query} 
                    onChange={handleOnChange} 
                    placeholder="CARI DISINI"
                    className="w-full pr-3 text-xs text-right placeholder-gray-400 border border-gray-300 rounded-sm leading-2xs lg:text-base focus:outline-none focus:border-primary"
                />
            </div>
            <button type='submit' className="py-2 text-xs font-bold text-white rounded-sm xl:text-base bg-primary leading-2xs lg:text-sm px-7">
                CARI
            </button>
        </form>
    );
};

export default InputSearch;