import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Пароль</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Руденко Олексій Іванович ІПЗ-22-2</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 20,
  },
});
