import React from 'react'

const CardOtherNews = ({ title, slug }) => {
    return (
        <div>
            <a href={`/news/${slug}`}>
                <div className='flex flex-col gap-2 px-8 pt-4 pb-8 xl:px-16 bg-backgroundPrimary'>
                    <p className='text-[8px] xl:text-[10px] leading-4 text-darkGrey'>News</p>
                    <h2 className='hover:text-tertiary text-[14px] xl:text-[16px] leading-6 text-darkGrey font-light'>
                        {title}
                    </h2>
                </div>
            </a>
        </div>
    )
}

export default CardOtherNews
