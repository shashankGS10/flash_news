import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NewsItem from './NewsItem';
import { useDispatch } from 'react-redux';
import { pinNewsItem, unpinNewsItem, deleteNewsItem } from '../redux/actions/newsAction';

const PinnedList: React.FC<{ pinned: NewsItem[], handlePress: (item: any) => void }> = ({ pinned, handlePress }) => {
  const dispatch = useDispatch();

  const handlePinToggle = (item: any) => {
    if (pinned.some((pinnedItem) => pinnedItem.title === item.title)) {
      dispatch(unpinNewsItem(item));
    } else {
      dispatch(pinNewsItem(item));
    }
  };

  const handleDelete = (item: any) => {
    dispatch(deleteNewsItem(item));
  };

  const renderItem = ({ item }: { item: NewsItem }) => (
    <NewsItem
      key={item.url}
      item={item}
      onPin={() => handlePinToggle(item)}
      onUnpin={() => handlePinToggle(item)}
      onPress={() => handlePress(item)}
      onDelete={() => handleDelete(item)}
      isPinned={true}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pinned}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
});

export default PinnedList;