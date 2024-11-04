import React, { useEffect, useState } from 'react'
import formatDate from '../utils/formatDate';
import CardOtherNews from '../components/CardOtherNews';
import ShareButton from '../components/ShareButton';
import Breadcrumbs from '../components/Breadcrumbs';

const DetailNews = ({ news, author, otherNews }) => {

    console.log(otherNews)

    return (
        <div className='py-28 font-body'>

            {/* Breadcumbs */}
            <Breadcrumbs 
                title={news.title}
            />

            <section className='p-8 xl:p-16 bg-backgroundPrimary '>
                <div className='flex flex-col gap-8 md:flex-row md:justify-between md:items-center 2xl:justify-center'>
                    <div className='flex flex-col gap-4'>
                        <div className='w-[250px] md:w-full 2xl:w-[800px]'>
                            <h1 className='text-3xl font-semibold leading-6 text-tertiary xl:text-4xl'>
                                {news.title}
                            </h1>
                        </div>

                        <div className='flex gap-6 '>
                            <div className='flex flex-col gap-2'>
                                <p className='text-darkGrey text-2xs xl:text-sm leading-4xs'>Dipublish oleh</p>
                                <h4 className='text-xs font-semibold text-darkGrey xl:text-base leading-4xs'>
                                    {author}
                                </h4>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <p className='text-darkGrey text-2xs xl:text-sm leading-4xs'>Dipublish pada</p>
                                <h4 className='text-xs font-semibold text-darkGrey xl:text-base leading-4xs'>
                                    {formatDate(news.created_at)}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-[311px] h-[180px] xl:w-[500px] xl:h-[300px] 2xl:w-[700px] 2xl:h-[350px]'>
                            <img src={`/${news.image}`} alt="" className='object-cover w-full h-full rounded-[8px]' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='pt-2 pb-16 md:flex xl:flex xl:justify-center xl:gap-4'>

                {/* Share Button */}
                <ShareButton
                    title={news.title}
                    url={window.location.href}
                />


                <div className='px-8'>
                    <div className='py-6 border-b-2 md:pr-6 xl:w-[645px]'>

                        <h2 className='font-light text-justify text-[16px] xl:text-[20px] leading-6 xl:leading-8 text-tertiary'>
                            {news.subtitle}
                        </h2>
                        <br />

                        <div
                            className='text-justify'
                            dangerouslySetInnerHTML={{ __html: news.content }} // Use dangerouslySetInnerHTML here
                        />


                    </div>

                    {/* Badge Kategori */}
                    <div className='pt-6'>

                        {
                            news.categories.map((category) => {
                                return (
                                    <a href='' className='mr-2 font-semibold bg-primary30 text-primary text-xs xl:text-sm p-1.5 rounded-[6px]'>
                                        {category.name}
                                    </a>
                                )
                            })
                        }

                    </div>

                </div>
            </section>

            {/* Find Other News */}
            <section>
                <div className='flex flex-col gap-8 bg-backgroundPrimary'>
                    <div className='flex items-center justify-center py-4'>
                        <h2 className='font-semibold text-[8px] xl:text-[10px] xl:leading-3 text-darkGrey'>Find Other News</h2>
                    </div>
                </div>

                {/* Card other News */}
                <div className='grid grid-cols-1 xl:grid-cols-3'>

                    {
                        otherNews.map((item) => (
                            <CardOtherNews
                                key={item.id}
                                slug={item.slug}
                                title={item.title}
                            />
                        ))
                    }

                </div>
            </section>




        </div>
    )
}

export default DetailNews
