import React from 'react'

const CategoriesCheckbox = ({category, handleFilterByCategory}) => {


    return (
        <div className="flex gap-2">
            <input
                type="checkbox"
                name="kategori"
                value={category}
                onChange={() => handleFilterByCategory(category)}
                id="kategori"
                className="w-4 h-4 border-2 border-gray-400 rounded-sm appearance-none cursor-pointer checked:bg-green-500 checked:border-darkgrey focus:outline-none"
            />
            <label htmlFor="kategori" className="text-sm leading-4 text-darkGrey lg:text-base">
                {category}
            </label>
        </div>
    )
}

export default CategoriesCheckbox
