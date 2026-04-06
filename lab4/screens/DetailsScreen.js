import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getPathInfo } from '../utils/fileHelpers';
import { formatBytes, formatDate, getFileTypeLabel } from '../utils/formatters';

export default function DetailsScreen({ route }) {
  const { uri, name, isDirectory } = route.params;
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInfo() {
      try {
        const result = await getPathInfo(uri);
        setInfo(result);
      } catch (error) {
        Alert.alert('Помилка', error.message || 'Не вдалося отримати інформацію');
      } finally {
        setLoading(false);
      }
    }

    loadInfo();
  }, [uri]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Row label="Назва файлу" value={name} />
        <Row label="Тип" value={getFileTypeLabel(name, isDirectory)} />
        <Row label="Розмір" value={formatBytes(info?.size || 0)} />
        <Row label="Дата останньої модифікації" value={formatDate(info?.modificationTime)} />
        <Row label="URI" value={uri} />
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  row: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});