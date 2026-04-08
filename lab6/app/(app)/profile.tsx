import { useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const { user, loadProfile, saveProfile, logout, deleteAccount } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [passwordForDelete, setPasswordForDelete] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await loadProfile();
        setName(profile.name);
        setAge(profile.age);
        setCity(profile.city);
      } catch (error: any) {
        Alert.alert('Помилка', error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await saveProfile({ name, age, city });
      Alert.alert('Успіх', 'Профіль збережено');
    } catch (error: any) {
      Alert.alert('Помилка', error.message);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Видалення акаунта',
      'Ви впевнені, що хочете видалити акаунт?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!user?.email) {
                throw new Error('Email користувача не знайдено');
              }

              await deleteAccount(user.email, passwordForDelete);
            } catch (error: any) {
              Alert.alert('Помилка видалення', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: '700' }}>Профіль</Text>
      <Text>{user?.email}</Text>

      <TextInput
        placeholder="Ім'я"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Вік"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Button title="Зберегти профіль" onPress={handleSave} />
      <Button title="Вийти" onPress={logout} />

      <TextInput
        placeholder="Пароль для підтвердження видалення"
        value={passwordForDelete}
        onChangeText={setPasswordForDelete}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Button title="Видалити акаунт" onPress={handleDelete} />
    </View>
  );
}