import { Stack, usePathname, router } from "expo-router";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function Header() {
  const pathname = usePathname();

  const getActiveRoute = () => {
    if (pathname.includes("gallery")) return "gallery";
    if (pathname.includes("profile")) return "profile";
    return "home";
  };

  const activeRoute = getActiveRoute();

  const menu = [
    {
      key: "home",
      title: "Головна",
      icon: "home",
      path: "/(tabs)",
    },
    {
      key: "gallery",
      title: "Фотогалерея",
      icon: "image",
      path: "/(tabs)/gallery",
    },
    {
      key: "profile",
      title: "Профіль",
      icon: "person",
      path: "/(tabs)/profile",
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/university-colored.png")}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>FirstMobileApp</Text>
      </View>

      <View style={styles.menu}>
        {menu.map((item) => {
          const active = activeRoute === item.key;

          return (
            <TouchableOpacity
              key={item.key}
              style={styles.menuItem}
              onPress={() => router.replace(item.path)}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={active ? "#007AFF" : "#999"}
              />
              <Text style={[styles.menuText, active && styles.menuTextActive]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <>
      <Header />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: {
    width: 135,
    height: 35,
    marginRight: 80,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f3f3f3",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
  },
  menuText: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  menuTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
});