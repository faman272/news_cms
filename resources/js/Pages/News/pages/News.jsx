import React, { useEffect, useState } from "react";
import CardNews from "../components/CardNews";
import Header from "../components/Header";
import YearFilter from "../components/YearFilter";
import CategorySection from "../components/CategorySection";
import axios from "axios";
import InputSearch from "../components/InputSearch";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function ListNews() {
    // Fetch data from API
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedYear, setSelectedYear] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set the number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/news");
                setNews(response.data);
            } catch (error) {
                console.error("Data Error: " + error);
            } finally {
                console.log("Data Fetched");
            }
        };

        fetchData();
    }, []);

    // Filter by Year
    useEffect(() => {
        if (selectedYear === "Semua") {
            setFilteredNews(news);
        } else {
            const filtered = news.filter(
                (item) => new Date(item.created_at).getFullYear() === parseInt(selectedYear)
            );
            setFilteredNews(filtered);
        }
    }, [selectedYear, news]);

    // Filter by Search Query
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredNews(news);
        } else {
            const filtered = news.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredNews(filtered);
        }
    }, [searchQuery, news]);

    const [categories, setCategories] = useState([]);

    // Fetch categories data
    useEffect(() => {
        try {
            axios.get("/api/categories").then((response) => {
                setCategories(response.data);
            });
        } catch (error) {
            console.error("Data Error" + error);
        } finally {
            console.log("Category Data Fetched");
        }
    }, []);

    // Filter by checkbox categories
    const handleFilterByCategory = (category) => {
        const filtered = news.filter((item) =>
            item.categories.some((item) => item.name === category)
        );
        setFilteredNews(filtered);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="font-body">
            {/* Header */}
            <Header title="Berita SDGs" />

            <main className="pt-8 lg:pt-16 bg-backgroundPrimary lg:bg-white ">
                <div className="flex gap-6 px-8 xl:px-16 2xl:px-64">
                    <section className="w-full">
                        <div className="flex flex-col gap-4 md:flex-row lg:flex-row xl:justify-between ">
                            {/* Year Filter */}
                            <YearFilter setSelectedYear={setSelectedYear} />
                            {/* Search Input */}
                            <InputSearch setSearchQuery={setSearchQuery} />
                        </div>

                        {/* List Card News */}
                        <div className="mt-6 lg:mt-8">
                            {currentNews.length > 0 ? (
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

                    {/* Divider */}
                    <div className="xl:h-screen xl:w-1 xl:bg-slate-100"></div>
                    
                    
                    {/* Categorie Section */}
                    <CategorySection
                        categories={categories}
                        handleFilterByCategory={handleFilterByCategory}
                    />
                </div>

                {/* Pagination */}
                <div className="flex justify-center py-5 space-x-1 xl:py-10">
                    <button
                        className="px-3 py-2 ml-2 text-sm text-center transition-all border rounded-sm shadow-sm border-slate-300 hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <MdOutlineKeyboardArrowLeft size={20} />
                    </button>
                    {Array(totalPages)
                        .fill(0)
                        .map((_, index) => (
                            <button
                                key={index + 1}
                                className={`min-w-9 rounded-sm ${currentPage === index + 1
                                        ? "bg-primary text-white"
                                        : "border border-slate-300 text-darkGrey hover:text-white hover:bg-primary"
                                    } py-2 px-3.5 text-center text-sm transition-all shadow-sm hover:shadow-lg focus:bg-secondary focus:shadow-none active:bg-primary hover:bg-tertiary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    <button
                        className="px-3 py-2 ml-2 text-sm text-center transition-all border rounded-sm shadow-sm border-slate-300 hover:shadow-lg text-darkGrey hover:text-white hover:bg-primary hover:border-prbg-primary focus:text-white focus:bg-primary focus:border-prbg-primary active:border-prbg-primary active:text-white active:bg-primary disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <MdOutlineKeyboardArrowRight size={20} />
                    </button>
                </div>
            </main>
        </div>
    );
}