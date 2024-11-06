// a custom hook that fetches data from the API 
// and returns the data and loading state.

import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error("Data Error: " + error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading };
};

export default useFetchData;