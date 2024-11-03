import React, { useEffect, useState } from "react";
import CardNews from "../components/CardNews";
import Header from "../components/Header";
import YearFilter from "../components/YearFilter";
import CategorySection from "../components/CategorySection";
import axios from "axios";
import InputSearch from "../components/InputSearch";

export default function ListNews() {

    // Fetch data from API
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedYear, setSelectedYear] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

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


    const [categories, setCategories] = useState([])

    useEffect(() => {
        try {
            axios.get("/api/categories").then((response) => {
                setCategories(response.data)
            })
        } catch (error) {
            console.error("Data Error" + error)
        } finally {
            console.log("Category Data Fetched")
        }
    }, [])

    // Filter by checkbox categories
    const handleFilterByCategory = (category) => {
        const filtered = news.filter((item) =>
            item.categories.some((item) => item.name === category)
        );
        setFilteredNews(filtered);
    };



    return (
        <div className="font-body">


            {/* Header */}
            <Header
                title="Berita SDGs"
            />


            <main className="pt-8 lg:pt-16 bg-backgroundPrimary lg:bg-white ">

                <div className="flex gap-16 px-8 xl:px-16 2xl:px-64">

                    <section className="w-full">
                        <div className="flex justify-between">
                            {/* Year Filter */}
                            <YearFilter
                                setSelectedYear={setSelectedYear}
                            />
                            {/* Search Input */}
                            <InputSearch
                                setSearchQuery={setSearchQuery}
                            />
                        </div>

                        {/* List Card News */}
                        <div className="mt-6 lg:mt-8">
                            {
                                filteredNews.length > 0 ? filteredNews.map((item) => (
                                    <CardNews
                                        key={item.id}
                                        slug={item.slug}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                        image={item.image}
                                        date={item.created_at}
                                        categories={item.categories}
                                    />
                                )) : <h1 className="text-tertiary">Data tidak ada</h1>
                            }

                        </div>
                    </section>

                    {/* Categorie Section */}
                    <CategorySection
                        categories={categories}
                        handleFilterByCategory={handleFilterByCategory}
                    />
                </div>
            </main >





        </div >
    );
}
