import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { authStyles as s } from '../../src/styles/authStyles';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(email.trim(), password);
      Alert.alert('Успіх', 'Користувача зареєстровано');
    } catch (error: any) {
      Alert.alert('Помилка реєстрації', error.message);
    }
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView
        style={s.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={s.card}>
            <Text style={s.title}>Реєстрація</Text>
            <Text style={s.subtitle}>Створи новий акаунт</Text>

            <View>
              <Text style={s.label}>Email</Text>
              <TextInput
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={s.input}
              />
            </View>

            <View>
              <Text style={s.label}>Пароль</Text>
              <TextInput
                placeholder="Створи пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={s.input}
              />
            </View>

            <Pressable style={s.primaryButton} onPress={handleRegister}>
              <Text style={s.primaryButtonText}>Зареєструватися</Text>
            </Pressable>

            <Link href="/(auth)/login" style={s.linkText}>
              Назад до входу
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}