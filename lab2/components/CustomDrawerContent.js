import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://i.pravatar.cc/200?img=12',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Руденко Олексій</Text>
        <Text style={styles.group}>Група: ІПЗ-22-2</Text>
      </View>

      <View style={styles.menuContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  group: {
    fontSize: 15,
    color: '#dbeafe',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
});