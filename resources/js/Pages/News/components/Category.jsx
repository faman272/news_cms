import React, { useState, useEffect } from 'react'
import CategoriesCheckbox from './CategoriesCheckbox'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

const Category = ({ categories, handleFilterByCategory }) => {


    const [isOpen, setIsOpen] = useState(true)

    const tonggleCategories = () => setIsOpen(!isOpen)

    return (
        <>
            <section className="hidden w-1/3 lg:block">
                <div className="sticky flex flex-col gap-2 top-5">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold leading-2xs">Kategori</h1>
                        <button
                            onClick={tonggleCategories}
                        >
                            {isOpen ? <IoMdArrowDropdown size={27} /> : <IoMdArrowDropup size={27} />}

                        </button>
                    </div>
                    {
                        isOpen &&
                        (
                            <div className='flex flex-col gap-2'>
                                {
                                    categories.map((item) => (
                                        <CategoriesCheckbox
                                            key={item.id}
                                            category={item.name}
                                            handleFilterByCategory={handleFilterByCategory}
                                        />
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
            </section>
        </>
    )
}

export default Category
