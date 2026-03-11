import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const images = [
  { id: "1", image: require("../../assets/images/image1.jpg") },
  { id: "2", image: require("../../assets/images/image2.jpg") },
  { id: "3", image: require("../../assets/images/image3.jpg") },
  { id: "4", image: require("../../assets/images/image4.jpg") },
  { id: "5", image: require("../../assets/images/image5.jpg") },
  { id: "6", image: require("../../assets/images/image6.jpg") },
  { id: "7", image: require("../../assets/images/image7.jpg") },
  { id: "8", image: require("../../assets/images/image8.jpg") },
];

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.footer}>Руденко Олексій Іванович ІПЗ-22-2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
  },
  image: {
    width: "48%",
    height: 140,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 4,
  },
});
