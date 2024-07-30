import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADLINES_KEY = 'headlines';

export const storeHeadlines = async (headlines: any[]) => {
  try {
    await AsyncStorage.setItem(HEADLINES_KEY, JSON.stringify(headlines));
  } catch (error) {
    console.error('Error storing headlines:', error);
  }
};

export const getStoredHeadlines = async () => {
  try {
    const storedHeadlines = await AsyncStorage.getItem(HEADLINES_KEY);
    return storedHeadlines ? JSON.parse(storedHeadlines) : [];
  } catch (error) {
    console.error('Error getting stored headlines:', error);
    return [];
  }
};

export const clearHeadlines = async () => {
  try {
    await AsyncStorage.removeItem(HEADLINES_KEY);
  } catch (error) {
    console.error('Error clearing headlines:', error);
  }
};