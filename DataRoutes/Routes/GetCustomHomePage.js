import axios from "axios";
import MineConfig from "@/mine.config.js";

const url = `${MineConfig.homePageFetchUrl}`;

export const getCustomHomePage = async () => {
    try {
        const response = await axios.get(url);
        return {
            manto: true,
            data: response.data
        };
    } catch (error) {
        // Handling errors
        console.error("Error fetching data:", error.message);
        return {
            manto: false,
            error: error.message
        };
    }
};
