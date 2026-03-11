import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { initialNews, generateMoreNews } from '../data/newsData';

export default function MainScreen({ navigation }) {
  const [news, setNews] = useState(initialNews);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setNews(initialNews);
      setRefreshing(false);
    }, 1500);
  };

  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const moreNews = generateMoreNews(news.length + 1, 5);
      setNews((prev) => [...prev, ...moreNews]);
      setLoadingMore(false);
    }, 1500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetailsScreen', {
          id: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Стрічка новин</Text>
      <Text style={styles.headerSubtitle}>
        FlatList з Pull-to-Refresh, Infinite Scroll та оптимізацією
      </Text>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.footerContainer}>
      {loadingMore ? (
        <>
          <ActivityIndicator size="small" color="#2563eb" />
          <Text style={styles.footerText}>Завантаження новин...</Text>
        </>
      ) : (
        <Text style={styles.footerText}>Кінець списку</Text>
      )}
    </View>
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        ItemSeparatorComponent={Separator}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        windowSize={7}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#1e40af',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  separator: {
    height: 14,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
  },
});