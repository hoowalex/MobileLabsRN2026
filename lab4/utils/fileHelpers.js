import * as FileSystem from 'expo-file-system/legacy';

export const ROOT_DIR = FileSystem.documentDirectory + 'file-manager/';

export async function ensureRootDirectory() {
  const info = await FileSystem.getInfoAsync(ROOT_DIR);

  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
  }
}

export function getRelativePath(path) {
  if (path === ROOT_DIR) return 'file-manager/';
  return path.replace(ROOT_DIR, 'file-manager/');
}

export function getParentPath(path) {
  if (path === ROOT_DIR) return ROOT_DIR;

  const normalized = path.endsWith('/') ? path.slice(0, -1) : path;
  const lastSlashIndex = normalized.lastIndexOf('/');
  const parent = normalized.slice(0, lastSlashIndex + 1);

  if (parent.length < ROOT_DIR.length) {
    return ROOT_DIR;
  }

  return parent;
}

export async function loadDirectoryItems(path) {
  const names = await FileSystem.readDirectoryAsync(path);

  const items = await Promise.all(
    names.map(async (name) => {
      const rawUri = path + name;
      const info = await FileSystem.getInfoAsync(rawUri);

      return {
        name,
        uri: info.isDirectory ? `${rawUri}/` : rawUri,
        isDirectory: Boolean(info.isDirectory),
        size: info.size || 0,
        modificationTime: info.modificationTime || null,
      };
    })
  );

  return items.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? -1 : 1;
    }

    return a.name.localeCompare(b.name, 'uk');
  });
}

export async function createFolder(currentPath, folderName) {
  const trimmed = folderName.trim();
  if (!trimmed) {
    throw new Error('Вкажи назву папки');
  }

  const uri = `${currentPath}${trimmed}/`;
  const info = await FileSystem.getInfoAsync(uri);

  if (info.exists) {
    throw new Error('Папка з такою назвою вже існує');
  }

  await FileSystem.makeDirectoryAsync(uri, { intermediates: false });
}

export async function createTextFile(currentPath, fileName, content = '') {
  const trimmed = fileName.trim();
  if (!trimmed) {
    throw new Error('Вкажи назву файлу');
  }

  const finalName = trimmed.toLowerCase().endsWith('.txt') ? trimmed : `${trimmed}.txt`;
  const uri = `${currentPath}${finalName}`;

  const info = await FileSystem.getInfoAsync(uri);
  if (info.exists) {
    throw new Error('Файл з такою назвою вже існує');
  }

  await FileSystem.writeAsStringAsync(uri, content);
}

export async function readTextFile(uri) {
  return FileSystem.readAsStringAsync(uri);
}

export async function saveTextFile(uri, content) {
  await FileSystem.writeAsStringAsync(uri, content);
}

export async function deletePath(uri) {
  await FileSystem.deleteAsync(uri, { idempotent: true });
}

export async function getPathInfo(uri) {
  return FileSystem.getInfoAsync(uri);
}

export async function getStorageStats() {
  const total = await FileSystem.getTotalDiskCapacityAsync();
  const free = await FileSystem.getFreeDiskStorageAsync();
  const used = Math.max(total - free, 0);

  return { total, free, used };
}