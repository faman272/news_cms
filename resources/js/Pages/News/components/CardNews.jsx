import React from 'react'
import formatDate from '../utils/formatDate'

const CardNews = ({ title, subtitle, image, date, categories, slug }) => {

    const imagePath = image.startsWith('images/news/') ? `/storage/${image}` : image;


    const takeFirstWord = (string) => {
        return string.split(' ')[0];
    }

    return (
        <div className="px-3 py-2 mb-2 lg:px-8 lg:py-4 bg-backgroundPrimary rounded-2xl">
            <a href={`/news/${slug}`}>
                <div className="flex gap-8 ">

                    <div className='xl:min-w-[194px] xl:min-h-[146px] min-w-[133px] min-h-[100px] max-w-[194px]'>
                        <img
                            src={imagePath}
                            alt="News Image"
                            className="object-cover w-full h-full rounded-base"
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <div className="flex w-full gap-2">

                            {/* Badge kategori */}
                            {
                                categories.map((category, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="hidden px-2 py-1 font-bold text-white md:block lg:block text-2xs lg:text-xs bg-primary rounded-xl">
                                                <span>{category.name}</span>
                                            </div>

                                            <div className="block px-2 font-bold text-white md:hidden lg:hidden text-2xs lg:text-xs bg-primary rounded-xl">
                                                <span>{takeFirstWord(category.name)}</span>
                                            </div>
                                        </div>


                                    )
                                })
                            }

                        </div>

                        {/* Title */}
                        <div className='hover:text-tertiary'>
                            <h1 className="text-base font-semibold truncate-title lg:text-xl">
                                {title}
                            </h1>
                        </div>


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
