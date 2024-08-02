import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, StatusBar, FlatList } from 'react-native';
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

  useEffect(() => {
    dispatch(fetchAndStoreHeadlines());
    dispatch({ type: 'LOAD_PINNED_NEWS' });
  }, [dispatch]);

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

  const renderItem = ({ item, index }) => (
    <NewsItem
      key={`${item.title}-${index}`}
      item={item}
      sourceName={item.source.name}
      sourceLogo={`${item.source.url}/favicon.ico`}
      onPin={() => handlePinToggle(item)}
      onUnpin={() => handlePinToggle(item)}
      onPress={() => handlePress(item)}
      isPinned={pinned.some((pinnedItem) => pinnedItem.title === item.title)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={headlines}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}-${index}`}
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