import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { products } from '../../../data/products';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Товар не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} грн</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 20, fontWeight: '700' },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  price: { fontSize: 20, color: '#2563eb', fontWeight: '700', marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 24, color: '#374151' },
});