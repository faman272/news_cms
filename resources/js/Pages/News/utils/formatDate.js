// Format Date to Indonesian
/**
 * Formats a given date into a string with a long weekday, numeric year, long month, and numeric day.
 * The formatted date string is in Indonesian locale.
 *
 * @param {string|Date} date - The date to format. Can be a date string or a Date object.
 * @returns {string} The formatted date string.
 */
export default function formatDate(date) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return new Date(date).toLocaleDateString("id-ID", options);
}