import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const NewsDetailScreen: React.FC = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : null}
      <Text style={styles.content}>{item.description}</Text>
      <Text style={styles.source}>{item.source.name}</Text>
      <Text style={styles.publishedAt}>{item.publishedAt}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
  },
  source: {
    fontSize: 14,
    color: '#888',
  },
  publishedAt: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default NewsDetailScreen;
