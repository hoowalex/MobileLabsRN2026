import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const placeholderImage = require("../../assets/images/image-placeholder.jpg");

const news = [
  {
    id: "1",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "2",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "3",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "4",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "5",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "6",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "7",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "8",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "9",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "10",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
  {
    id: "11",
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини",
    image: placeholderImage,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Новини</Text>

      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={item.image} style={styles.newsImage} />

            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.footer}>Руденко Олексій Іванович ІПЗ-22-2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
  },
  newsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  newsImage: {
    width: 62,
    height: 62,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  newsDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  newsText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 8,
    marginBottom: 8,
    color: "#444",
  },
});
