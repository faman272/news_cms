/**
 * Filters news data by selected categories.
 *
 * @param {Array} data - The array of news items.
 * @param {Array} selectedCategories - The array of currently selected categories.
 * @param {string} category - The category to add or remove from the selected categories.
 * @returns {Object} An object containing the filtered news items and the updated list of selected categories.
 * @returns {Array} return.filteredNews - The filtered news items.
 * @returns {Array} return.updatedCategories - The updated list of selected categories.
 */

export const filterByCategory = (data, selectedCategories, category) => {
    let updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
        updatedCategories = updatedCategories.filter(cat => cat !== category);
    } else {
        updatedCategories.push(category);
    }

    if (updatedCategories.length === 0) {
        return { filteredNews: data, updatedCategories };
    } else {
        const filteredNews = data.filter((item) =>
            item.categories.some((cat) => updatedCategories.includes(cat.name))
        );
        return { filteredNews, updatedCategories };
    }
};