import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Platform, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NewsItem from '../components/NewsItem';
import { fetchAndStoreHeadlines, pinNewsItem, unpinNewsItem } from '../redux/actions/newsAction';
import { RootState } from '../redux/reducers';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const headlines = useSelector((state: RootState) => state.news.headlines);
  const pinned = useSelector((state: RootState) => state.news.pinned);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAndStoreHeadlines(page));
    dispatch({ type: 'LOAD_PINNED_NEWS' });
  }, [dispatch, page]);

  const handlePinToggle = (item: any) => {
    if (pinned.some((pinnedItem) => pinnedItem.title === item.title)) {
      dispatch(unpinNewsItem(item));
    } else {
      dispatch(pinNewsItem(item));
    }
  };

  const handlePress = (item: any) => {
    navigation.navigate('NewsDetail', { item });
  };

  const renderItem =  useCallback(
    ({ item, index }) => (
      <NewsItem
        key={`${item.url}-${index}`}
        item={item}
        onPin={() => handlePinToggle(item)}
        onUnpin={() => handlePinToggle(item)}
        onPress={() => handlePress(item)}
        isPinned={pinned.some((pinnedItem) => pinnedItem.title === item.title)}
      />
    ),
    [pinned]
  );

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  const handleKeyExtractor =  (item: NewsItem, index: number) => `${item.url}-${index}`;

  return (
    <View style={styles.container}>
     <FlatList
        data={headlines}
        renderItem={renderItem}
        keyExtractor={handleKeyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        initialNumToRender={10}
        windowSize={21}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
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