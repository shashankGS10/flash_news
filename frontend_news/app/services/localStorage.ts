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

const PINNED_NEWS_KEY = 'pinnedNews';

// Function to get all pinned news items
export const getPinnedNews = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PINNED_NEWS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch pinned news', e);
    return [];
  }
};

// Function to save a news item as pinned
export const pinNewsItem = async (item) => {
  try {
    const currentPinned = await getPinnedNews();
    const updatedPinned = [...currentPinned, item];
    const jsonValue = JSON.stringify(updatedPinned);
    await AsyncStorage.setItem(PINNED_NEWS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to pin news item', e);
  }
};

// Function to unpin a news item
export const unpinNewsItem = async (item) => {
  try {
    const currentPinned = await getPinnedNews();
    const updatedPinned = currentPinned.filter(
      (pinnedItem) => pinnedItem.title !== item.title
    );
    const jsonValue = JSON.stringify(updatedPinned);
    await AsyncStorage.setItem(PINNED_NEWS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to unpin news item', e);
  }
};