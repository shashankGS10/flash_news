import { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';
import { storeHeadlines, getStoredHeadlines, clearHeadlines } from '../services/localStorage';

const useFetchNews = () => {
  const [headlines, setHeadlines] = useState<any[]>([]);

  useEffect(() => {
    const loadHeadlines = async () => {
      try {
        const storedHeadlines = await getStoredHeadlines();
        if (storedHeadlines.length === 0) {
          const fetchedHeadlines = await fetchNews();
          await storeHeadlines(fetchedHeadlines);
          setHeadlines(fetchedHeadlines.slice(0, 10));
        } else {
          setHeadlines(storedHeadlines.slice(0, 10));
        }
      } catch (error) {
        console.error('Error loading headlines:', error);
      }
    };

    loadHeadlines();
  }, []);

  const fetchAndStoreHeadlines = async () => {
    try {
      await clearHeadlines();
      const fetchedHeadlines = await fetchNews();
      await storeHeadlines(fetchedHeadlines);
      setHeadlines(fetchedHeadlines.slice(0, 10));
    } catch (error) {
      console.error('Error fetching and storing headlines:', error);
    }
  };

  return { headlines, setHeadlines, fetchAndStoreHeadlines };
};


export default useFetchNews;
