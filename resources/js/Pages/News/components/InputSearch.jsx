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
        <form onSubmit={handleSubmit} className="flex w-full gap-2 md:max-w-[40%]">
            <div className="relative flex items-center w-full">
                <FiSearch size={16} className="absolute left-3 text-primary" />
                <input
                    type="text"
                    value={query}
                    onChange={handleOnChange}
                    placeholder="CARI DISINI"
                    className="w-full pr-3 text-xs text-right placeholder-gray-400 border border-gray-300 rounded-sm focus:outline-none focus:border-primary md:text-sm lg:text-base"
                />
            </div>
            <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white rounded-sm bg-primary md:text-sm lg:text-base"
            >
                CARI
            </button>
        </form>
    );
};

export default InputSearch;
