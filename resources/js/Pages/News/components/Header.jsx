import React from 'react'
import { GoHome } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Header = ({title}) => {
    return (
        <>
            <header className="w-full h-[128px] md:h-[150px] lg:h-[180px] xl:h-[200px] 2xl:h-[200px]  relative flex justify-end items-center">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 z-20 w-full h-full bg-gradient"></div>

                {/* Breadcumbs */}
                <div className="absolute inset-0 z-30 flex px-8 xl:px-16 2xl:px-64">
                    <ol className="flex items-center text-xs leading-2xs lg:text-base text-white pt-[19px] h-2">
                        <li>
                            <a href="/"><GoHome size={12} /></a>
                        </li>
                        <li>
                            <a href="/"><MdOutlineKeyboardArrowRight size={12} /></a>
                        </li>

                        <li>
                            <a href="/">Activies</a>
                        </li>

                        <li>
                            <a href="/"><MdOutlineKeyboardArrowRight size={12} /></a>
                        </li>
                        <li>
                            <a href="/">News</a>
                        </li>
                    </ol>
                </div>

                {/* Title */}
                <div className="absolute inset-0 z-50 flex items-center px-8 xl:px-16 2xl:px-64">
                    <span className="text-base font-bold text-white md:text-2xl lg:text-4xl xl:text-7xl 2xl:text-7xl ">{title}</span>
                </div>

                {/* Background Image */}
                <div className="relative z-10 w-[50vw] h-full">
                    <img src="/images/header.png" alt="Header background" className="object-cover object-left w-full h-full lg:object-right-top" />
                </div>
            </header>
        </>
    )
}

export default Header
