import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { title, description, image, id } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.id}>ID новини: {id}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.extraText}>
        На цей екран параметри були передані через navigation.navigate(..., params).
        Заголовок екрана також формується динамічно на основі title новини.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 14,
    marginBottom: 16,
  },
  id: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 14,
  },
  extraText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
});