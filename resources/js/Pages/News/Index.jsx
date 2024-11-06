import React, { useEffect, useState } from "react";
import CardNews from "./components/CardNews";
import Header from "./components/Header";
import YearFilter from "./components/YearFilter";
import Category from "./components/Category";
import InputSearch from "./components/InputSearch";
import Pagination from "./components/Pagination";
import Loader from "./common/Loader";
import { filterByCategory } from "./utils/filterCategory";
import { filterNews } from "./utils/filterNews";
import useFetchData from "./hooks/useFetchData";


export default function News() {
    const { data: news, loading: newsLoading } = useFetchData("/api/news");
    const { data: categories, loading: categoriesLoading } = useFetchData("/api/categories");

    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedYear, setSelectedYear] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setFilteredNews(filterNews(news, selectedYear, searchQuery));
    }, [selectedYear, searchQuery, news]);

    const handleFilterByCategory = (category) => {
        const { filteredNews, updatedCategories } = filterByCategory(news, selectedCategories, category);
        setFilteredNews(filteredNews);
        setSelectedCategories(updatedCategories);
    };

    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const currentNews = filteredNews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Header title="Berita SDGs" />
            <main className="pt-8 lg:pt-16 bg-backgroundPrimary lg:bg-white">
                <div className="flex gap-6 px-8 xl:px-16 2xl:px-64">
                    <section className="w-full">
                        <div className="flex flex-col gap-4 md:flex-row lg:flex-row md:justify-between lg:justify-between xl:justify-between">
                            <YearFilter setSelectedYear={setSelectedYear} />
                            <InputSearch setSearchQuery={setSearchQuery} />
                        </div>
                        <div className="mt-6 lg:mt-8">
                            {newsLoading || categoriesLoading ? (
                                <Loader />
                            ) : currentNews.length > 0 ? (
                                currentNews.map((item) => (
                                    <CardNews
                                        key={item.id}
                                        slug={item.slug}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                        image={item.image}
                                        date={item.created_at}
                                        categories={item.categories}
                                    />
                                ))
                            ) : (
                                <h1 className="text-tertiary">Data tidak ada</h1>
                            )}
                        </div>
                    </section>
                    <span className="xl:h-screen xl:w-1 xl:bg-slate-100"></span>
                    <Category
                        categories={categories}
                        handleFilterByCategory={handleFilterByCategory}
                    />
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={setCurrentPage}
                />
            </main>
        </>
    );
}