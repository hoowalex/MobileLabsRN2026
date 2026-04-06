import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatBytes } from '../utils/formatters';

export default function StorageCard({ total, free, used }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Статистика пам’яті</Text>
      <Text style={styles.text}>Загальний обсяг: {formatBytes(total)}</Text>
      <Text style={styles.text}>Вільно: {formatBytes(free)}</Text>
      <Text style={styles.text}>Зайнято: {formatBytes(used)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
});