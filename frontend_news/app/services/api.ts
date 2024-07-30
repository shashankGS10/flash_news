import axios from 'axios';

const API_KEY = 'e6f79fdf004e4dd185ac480397e92d1e';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?country=us&apiKey=${API_KEY}`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};


export const fetchSources = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sources?apiKey=${API_KEY}`);
    const data = await response.json();
    return data.sources;
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
};
