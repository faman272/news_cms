import React from 'react';

const YearFilter = ({ setSelectedYear }) => {
    const handleOnChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <div className="items-center hidden gap-4 text-base md:flex 2xl:text-lg lg:flex">
            <h2 className="font-medium">Tahun Rilis</h2>
            <select
                onChange={handleOnChange}
                className="text-lg font-medium border-none rounded-sm text-primary bg-primary30"
            >
                <option className='text-black bg-white' value="Semua">
                    Semua
                </option>
                <option className='text-black bg-white' value="2024">
                    2024
                </option>
                <option className='text-black bg-white' value="2023">
                    2023
                </option>
                <option className='text-black bg-white' value="2022">
                    2022
                </option>
                <option className='text-black bg-white' value="2021">
                    2021
                </option>
                <option className='text-black bg-white' value="2020">
                    2020
                </option>
            </select>
        </div>
    );
};

export default YearFilter;