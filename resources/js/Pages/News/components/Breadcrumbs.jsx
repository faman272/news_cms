import React from 'react'
import { GoHome } from 'react-icons/go'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

const Breadcrumbs = ({title}) => {
    return (
        <div className='text-xs xl:text-base px-8 xl:px-16 2xl:px-[200px] text-primary leading-4 font-semibold py-2'>
            <div className='flex w-full'>
                <a href="#">
                    <GoHome size={16} />
                </a>
                <a href="#">
                    <MdOutlineKeyboardArrowRight size={16} />
                </a>
                <a href="#">
                    Activities
                </a>
                <a href="#">
                    <MdOutlineKeyboardArrowRight size={16} />
                </a>
                <a href="/">
                    <p className='whitespace-nowrap'>
                        Berita SDGs
                    </p>
                </a>
                <a href="#">
                    <MdOutlineKeyboardArrowRight size={16} />
                </a>
                <a href="">
                    <p className='truncate-bread'>
                        {title}
                    </p>
                </a>
            </div>
        </div>
    )
}

export default Breadcrumbs
