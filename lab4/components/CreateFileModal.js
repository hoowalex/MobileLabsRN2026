import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CreateFileModal({ visible, onClose, onSubmit }) {
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!visible) {
      setFileName('');
      setContent('');
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Новий .txt файл</Text>

          <TextInput
            style={styles.input}
            placeholder="Назва файлу"
            value={fileName}
            onChangeText={setFileName}
          />

          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Початковий вміст"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={onClose}>
              <Text style={styles.secondaryText}>Скасувати</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => onSubmit({ name: fileName, content })}
            >
              <Text style={styles.primaryText}>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  textarea: {
    minHeight: 120,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  secondaryText: {
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
});