// src/components/NewsItem.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
  sourceLogo: string;
  onPress: () => void;
  onPin: () => void;
  onDelete: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, sourceLogo, onPress, onPin, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: sourceLogo }} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.timestamp}>{new Date(item.publishedAt).toLocaleTimeString()}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPin} style={styles.button}>
            <Text style={styles.buttonText}>Pin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : (
        <Image source={require('../../assets/favicon.png')} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default NewsItem;

// Start with fixing styling, 
// slider functions for pin and delete.
// sourceUri should hnot be empty handle this.