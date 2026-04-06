import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { readTextFile, saveTextFile } from '../utils/fileHelpers';

export default function EditorScreen({ route }) {
  const { fileUri } = route.params;

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadFile() {
      try {
        const text = await readTextFile(fileUri);
        setContent(text);
      } catch (error) {
        Alert.alert('Помилка', error.message || 'Не вдалося прочитати файл');
      } finally {
        setLoading(false);
      }
    }

    loadFile();
  }, [fileUri]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveTextFile(fileUri, content);
      Alert.alert('Успіх', 'Файл успішно збережено');
    } catch (error) {
      Alert.alert('Помилка', error.message || 'Не вдалося зберегти файл');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TextInput
          style={styles.editor}
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
          placeholder="Вміст файлу..."
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
            <Text style={styles.saveButtonText}>
              {saving ? 'Збереження...' : 'Зберегти зміни'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editor: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});