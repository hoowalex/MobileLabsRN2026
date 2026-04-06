import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import FileItem from '../components/FileItem';
import StorageCard from '../components/StorageCard';
import CreateFolderModal from '../components/CreateFolderModal';
import CreateFileModal from '../components/CreateFileModal';

import {
  ROOT_DIR,
  ensureRootDirectory,
  loadDirectoryItems,
  getParentPath,
  getRelativePath,
  createFolder,
  createTextFile,
  deletePath,
  getStorageStats,
} from '../utils/fileHelpers';

export default function HomeScreen({ navigation }) {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const [items, setItems] = useState([]);
  const [storage, setStorage] = useState({
    total: 0,
    free: 0,
    used: 0,
  });
  const [loading, setLoading] = useState(true);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);

  const loadAll = useCallback(async (path) => {
    try {
      setLoading(true);
      await ensureRootDirectory();

      const [directoryItems, storageStats] = await Promise.all([
        loadDirectoryItems(path),
        getStorageStats(),
      ]);

      setItems(directoryItems);
      setStorage(storageStats);
    } catch (error) {
      Alert.alert('Помилка', error.message || 'Не вдалося завантажити директорію');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAll(currentPath);
    }, [currentPath, loadAll])
  );

  const handleOpen = (item) => {
    if (item.isDirectory) {
      setCurrentPath(item.uri);
      return;
    }

    if (item.name.toLowerCase().endsWith('.txt')) {
      navigation.navigate('Editor', {
        fileUri: item.uri,
        fileName: item.name,
      });
      return;
    }

    navigation.navigate('Details', {
      uri: item.uri,
      name: item.name,
      isDirectory: false,
    });
  };

  const handleInfo = (item) => {
    navigation.navigate('Details', {
      uri: item.uri,
      name: item.name,
      isDirectory: item.isDirectory,
    });
  };

  const handleDelete = (item) => {
    Alert.alert(
      'Підтвердження',
      `Видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePath(item.uri);
              await loadAll(currentPath);
            } catch (error) {
              Alert.alert('Помилка', error.message || 'Не вдалося видалити об’єкт');
            }
          },
        },
      ]
    );
  };

  const handleCreateFolder = async (name) => {
    try {
      await createFolder(currentPath, name);
      setFolderModalVisible(false);
      await loadAll(currentPath);
    } catch (error) {
      Alert.alert('Помилка', error.message || 'Не вдалося створити папку');
    }
  };

  const handleCreateFile = async ({ name, content }) => {
    try {
      await createTextFile(currentPath, name, content);
      setFileModalVisible(false);
      await loadAll(currentPath);
    } catch (error) {
      Alert.alert('Помилка', error.message || 'Не вдалося створити файл');
    }
  };

  const handleGoUp = () => {
    if (currentPath === ROOT_DIR) return;
    setCurrentPath(getParentPath(currentPath));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <StorageCard
              total={storage.total}
              free={storage.free}
              used={storage.used}
            />

            <View style={styles.pathCard}>
              <Text style={styles.pathLabel}>Поточний шлях</Text>
              <Text style={styles.pathValue}>{getRelativePath(currentPath)}</Text>
            </View>

            <View style={styles.topActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  currentPath === ROOT_DIR && styles.disabledButton,
                ]}
                onPress={handleGoUp}
                disabled={currentPath === ROOT_DIR}
              >
                <Text style={styles.actionButtonText}>Вгору</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => loadAll(currentPath)}
              >
                <Text style={styles.actionButtonText}>Оновити</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.topActions}>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => setFolderModalVisible(true)}
              >
                <Text style={styles.createButtonText}>+ Папка</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.createButton}
                onPress={() => setFileModalVisible(true)}
              >
                <Text style={styles.createButtonText}>+ TXT файл</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Вміст директорії</Text>
          </>
        }
        renderItem={({ item }) => (
          <FileItem
            item={item}
            onOpen={() => handleOpen(item)}
            onInfo={() => handleInfo(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 30 }} />
          ) : (
            <Text style={styles.emptyText}>Директорія порожня</Text>
          )
        }
      />

      <CreateFolderModal
        visible={folderModalVisible}
        onClose={() => setFolderModalVisible(false)}
        onSubmit={handleCreateFolder}
      />

      <CreateFileModal
        visible={fileModalVisible}
        onClose={() => setFileModalVisible(false)}
        onSubmit={handleCreateFile}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  pathCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  pathLabel: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 6,
  },
  pathValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  topActions: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1d4ed8',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#0f766e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#667085',
  },
});