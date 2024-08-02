import axios from 'axios';

const API_KEY = 'e6f79fdf004e4dd185ac480397e92d1e';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?country=in&page=${page}&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};