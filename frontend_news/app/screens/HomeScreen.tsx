// src/screens/HomeScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewsItem from '../components/NewsItem';
import useFetchNews from '../hooks/useFetchNews';
import useTimer from '../hooks/useTimer';
import { getStoredHeadlines } from '../services/localStorage';
import { fetchSources } from '../services/api';

const HomeScreen: React.FC = () => {
  const { headlines, setHeadlines, fetchAndStoreHeadlines } = useFetchNews();
  const [sources, setSources] = useState([]);
  const [pinned, setPinned] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSources = async () => {
      const fetchedSources = await fetchSources();
      setSources(fetchedSources);
    };

    loadSources();
    fetchAndStoreHeadlines();
  }, []);

  useEffect(() => {
    if (pinned) {
      setHeadlines((prev) => [pinned, ...prev.filter((item) => item.title !== pinned.title)]);
    }
  }, [pinned]);

  useTimer(() => {
    const fetchNewHeadlines = async () => {
      const newHeadlines = await getStoredHeadlines();
      setHeadlines((prev) => [
        ...newHeadlines.slice(0, 5).filter((item) => item.title !== pinned?.title),
        ...prev,
      ]);
    };
    fetchNewHeadlines();
  }, 10000);

  const handlePin = useCallback((item: any) => setPinned(item), []);
  const handleDelete = useCallback((item: any) => {
    setHeadlines((prev) => prev.filter((news) => news.title !== item.title));
  }, []);
  const handlePress = useCallback((item: any) => {
    navigation.navigate('NewsDetail', { item });
  }, [navigation]);

  const loadMoreHeadlines = async () => {
    if (loading) return;
    setLoading(true);
    const newHeadlines = await getStoredHeadlines();
    setHeadlines((prev) => [
      ...prev,
      ...newHeadlines.slice(prev.length, prev.length + 10).filter((item) => item.title !== pinned?.title),
    ]);
    setLoading(false);
  };

  // Generate a source logo URL if it's not directly available.
  const getSourceLogo = (sourceId: string) => {
    const source = sources.find((source: any) => source.id === sourceId);
    return source ? `${source.url}/favicon.ico` : ''; // This is a common convention, adjust as needed.
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={headlines}
        renderItem={({ item, index }) => (
          <NewsItem
            key={`${item.title}-${index}`}
            item={item}
            sourceLogo={getSourceLogo(item.source.id)}
            onPin={() => handlePin(item)}
            onDelete={() => handleDelete(item)}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        onEndReached={loadMoreHeadlines}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default HomeScreen;
