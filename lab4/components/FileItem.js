import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatBytes, formatDate, getFileTypeLabel } from '../utils/formatters';

export default function FileItem({ item, onOpen, onInfo, onDelete }) {
  const icon = item.isDirectory ? '📁' : '📄';

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.infoBlock} onPress={onOpen}>
        <Text style={styles.name}>
          {icon} {item.name}
        </Text>

        <Text style={styles.meta}>
          {getFileTypeLabel(item.name, item.isDirectory)}
          {!item.isDirectory ? ` • ${formatBytes(item.size)}` : ''}
        </Text>

        <Text style={styles.meta}>
          Змінено: {formatDate(item.modificationTime)}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={onOpen}>
          <Text style={styles.actionText}>
            {item.isDirectory ? 'Увійти' : 'Відкрити'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onInfo}>
          <Text style={styles.actionText}>Інфо</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={onDelete}>
          <Text style={[styles.actionText, styles.deleteText]}>Видалити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  infoBlock: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  meta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionBtn: {
    backgroundColor: '#eef2ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginTop: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f3c88',
  },
  deleteBtn: {
    backgroundColor: '#ffe8e8',
  },
  deleteText: {
    color: '#b42318',
  },
});