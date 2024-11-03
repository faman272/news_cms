import React from 'react'
import formatDate from '../utils/formatDate'

const CardNews = ({ title, subtitle, image, date, categories, slug}) => {


    return (
        <div className="px-3 py-2 mb-2 lg:px-8 lg:py-4 bg-backgroundPrimary rounded-2xl">
            <a href={`/news/${slug}`}>
                <div className="flex gap-8 ">
                    <div className='h-[100px] w-[133px] lg:w-[194px] lg:h-[145px] xl:w-[194px] xl:h-[145px]'>
                        <img src={image} alt="" className="object-cover w-full h-full rounded-base" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex w-full gap-2">

                            {/* Badge kategori */}
                            {
                                categories.map((category, index) => (
                                    <div key={index} className="px-2 py-1 font-bold text-white text-2xs lg:text-xs bg-primary rounded-xl">
                                        <span className="hidden md:block lg:block">{category.name}</span>
                                    </div>
                                ))
                            }

                        </div>

                        {/* Title */}
                        <a href={`/news/${slug}`} className='hover:text-tertiary'>
                            <h1 className="text-base font-semibold truncate-title lg:text-xl">
                                {title}
                            </h1>
                        </a>

                        {/* SubTitle */}
                        <div className='hidden md:block lg:block'>
                            <h3 className="text-lg text-gray-400 truncate-subtitle">
                                {subtitle}
                            </h3>
                        </div>

                        {/* Date */}
                        <p className="font-medium text-gray-400 text-2xs lg:text-sm">
                            {formatDate(date)}
                        </p>
                    </div>
                </div>
            </a>

        </div>
    )
}

export default CardNews
