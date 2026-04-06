export function formatBytes(bytes = 0) {
  if (!bytes || bytes < 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

export function formatDate(timestamp) {
  if (!timestamp) return '—';

  const value = timestamp < 1000000000000 ? timestamp * 1000 : timestamp;
  return new Date(value).toLocaleString('uk-UA');
}

export function getFileExtension(name = '') {
  const parts = name.split('.');
  if (parts.length < 2) return '';
  return parts[parts.length - 1].toLowerCase();
}

export function getFileTypeLabel(name = '', isDirectory = false) {
  if (isDirectory) return 'Папка';

  const ext = getFileExtension(name);
  if (!ext) return 'Файл без розширення';

  return `${ext.toUpperCase()} файл`;
}