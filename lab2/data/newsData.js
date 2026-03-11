export const initialNews = [
  {
    id: '1',
    title: 'React Native 2026',
    description:
      'React Native продовжує активно розвиватися та пропонує зручні інструменти для створення кросплатформних мобільних застосунків.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Expo спрощує розробку',
    description:
      'Expo допомагає швидко запускати проєкти, тестувати застосунок на реальному пристрої та спрощує роботу з багатьма API.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Навігація в мобільних застосунках',
    description:
      'React Navigation дозволяє будувати Stack, Drawer та Tab навігацію, а також комбінувати їх між собою.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'FlatList для великих списків',
    description:
      'FlatList оптимізує відображення великих обсягів даних завдяки механізму віртуалізації елементів списку.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'SectionList для групування',
    description:
      'SectionList зручно використовувати, коли елементи потрібно згрупувати за категоріями, літерами або іншими ознаками.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
];

export const generateMoreNews = (startId, count = 5) => {
  const items = [];

  for (let i = 0; i < count; i++) {
    const currentId = startId + i;
    items.push({
      id: String(currentId),
      title: `Додаткова новина ${currentId}`,
      description: `Це опис для додаткової новини ${currentId}. Вона була завантажена через Infinite Scroll у FlatList.`,
      image: `https://picsum.photos/seed/news${currentId}/800/400`,
    });
  }

  return items;
};