import React from 'react';
import Main from './layouts/Main';
import { RxPencil2 } from "react-icons/rx";
import { BiSolidNews } from 'react-icons/bi';
import { CiCircleAlert } from "react-icons/ci";
import formatDate from '../News/utils/formatDate';

const Dashboard = (props) => {


    return (
        <Main>
            <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

            <div className="mt-4">
                <div className="-mx-6 lg:grid xl:flex xl:flex-wrap">

                    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                            <div className="p-3 text-white bg-opacity-75 rounded-full bg-primary">
                                <CiCircleAlert size={32} />
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">Welcome</h4>
                                <div className="text-gray-500">{props.auth.user.name}</div>
                            </div>
                        </div>
                    </div>


                    <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                        <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                            <div className="p-3 text-white bg-orange-600 bg-opacity-75 rounded-full">
                                <BiSolidNews size={32} />
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">{props.newsCount}</h4>
                                <div className="text-gray-500">Posts</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                        <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                            <div className="p-3 text-white bg-indigo-600 bg-opacity-75 rounded-full">
                                <RxPencil2 size={32} />
                            </div>

                            <div className="mx-5">
                                <h4 className="text-2xl font-semibold text-gray-700">{props.authorsCount}</h4>
                                <div className="text-gray-500">Authors</div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-3xl font-medium text-gray-700">Latest News</h3>
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        No.
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Image
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Title
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Categories
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Author
                                    </th>
                                    <th className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Published Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.news.map((item, index) => {
                                    const imagePath = item.image.startsWith('images/news/') ? `/storage/${item.image}` : `/${item.image}`;

                                    return (
                                        <tr key={item.id}>
                                            <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                                {index + 1}
                                            </td>
                                            <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                                <img
                                                    src={imagePath}
                                                    alt="News"
                                                />
                                            </td>
                                            <td className="py-5 text-lg font-medium bg-white border-b border-gray-200 truncate-titlepx-5">
                                                {item.title}
                                            </td>
                                            <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                                <div className='flex flex-col gap-2 text-nowrap'>
                                                    {item.categories.map((category, index) => (
                                                        <span key={index} className='px-2 py-1 text-sm text-center rounded-md bg-primary30 text-primary'>
                                                            {category.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                                {item.author.name}
                                            </td>
                                            <td className="px-5 py-5 text-lg bg-white border-b border-gray-200">
                                                {formatDate(item.created_at)}
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                    </ div>
                </div>
            </div>
        </Main>
    );
};

export default Dashboard;
