// Filter news based on selected year and search query
/**
 * Filters the news articles based on the selected year and search query.
 *
 * @param {Array} news - The array of news articles to filter.
 * @param {string} selectedYear - The year to filter the news articles by. If "Semua", no year filtering is applied.
 * @param {string} searchQuery - The search query to filter the news articles by title. If empty, no search filtering is applied.
 * @returns {Array} - The filtered array of news articles.
 */
export const filterNews = (news, selectedYear, searchQuery) => {
    let filtered = news;

    if (selectedYear !== "Semua") {
        filtered = filtered.filter(
            (item) => new Date(item.created_at).getFullYear() === parseInt(selectedYear)
        );
    }

    if (searchQuery) {
        filtered = filtered.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return filtered;
};