import axios from "axios";

const url =
  "https://unfortunate-darlene-animekun-discord-bot-f0aebe99.koyeb.app/api/mantox/get/sections";

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
