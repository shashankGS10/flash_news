import React , {memo} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useDispatch, useSelector } from 'react-redux';
import { pinNewsItem, unpinNewsItem, deleteNewsItem } from '../redux/actions/newsAction';

interface NewsItemProps {
  item: {
    title: string;
    description: string;
    urlToImage?: string;
    publishedAt: string;
    source: {
      id: string;
      name: string;
    };
    [key: string]: any;
  };
  onPress: () => void;
}

interface NewsState {
  headlines: NewsItem[];
  pinned: NewsItem[];
  logos: string[];
}

const initialState: NewsState = {
  headlines: [],
  pinned: [],
  logos: [],
};

const NewsItem: React.FC<NewsItemProps> = ({
  item,
  onPress,
}) => {
  
  const dispatch = useDispatch();
  const isPinned = useSelector((state) =>
    state.news.pinned.some((pinnedItem) => pinnedItem.title === item.title)
  );

  const handlePin = () => {
    dispatch(pinNewsItem(item));
  };

  const handleUnpin = () => {
    dispatch(unpinNewsItem(item));
  };

  const handleDelete = () => {
    dispatch(deleteNewsItem(item));
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    

    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.actionButton, styles.pinButton]}
          onPress={isPinned ? handleUnpin : handlePin}
        >
          <Text style={styles.actionText}>{isPinned ? 'Unpin' : 'Pin'}</Text>
        </RectButton>
        <RectButton style={styles.actionButton} onPress={handleDelete}>
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.sourceContainer}>
          {/* Fetch logo by the url provided using the above shared files */}
          {item.uri ? <Image source={{uri:`${item.url}/favicon.ico`}} style={styles.sourceLogo}/>:
          <Image source={require('../../assets/google-news-icon.png')} style={styles.sourceLogo}/>}
          {/* Scope of Using fetchLogo dynamically get the source logo, for key words you have author, source.name and url - Write a Scraper*/}
            <Text style={styles.sourceName}>{item.source.name}</Text>
          </View>
          <Text style={styles.timestamp}>{new Date(item.publishedAt).toLocaleTimeString()}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          {item.urlToImage ? (
            <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
          ) : (
            <Image source={require('../../assets/favicon.png')} style={styles.newsImage} />
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 8,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  sourceName: {
    fontSize: 14,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: '#AAA',
  },
  newsImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  actionButton: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  pinButton: {
    backgroundColor: '#ffd700',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default memo(NewsItem);