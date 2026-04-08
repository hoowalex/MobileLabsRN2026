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

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email.trim(), password);
    } catch (error: any) {
      Alert.alert('Помилка входу', error.message);
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
            <Text style={s.title}>Вхід</Text>
            <Text style={s.subtitle}>Увійди у свій акаунт</Text>

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
                placeholder="Введи пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={s.input}
              />
            </View>

            <Pressable style={s.primaryButton} onPress={handleLogin}>
              <Text style={s.primaryButtonText}>Увійти</Text>
            </Pressable>

            <Link href="/(auth)/register" style={s.linkText}>
              Перейти до реєстрації
            </Link>

            <Link href="/(auth)/reset-password" style={s.linkText}>
              Забули пароль?
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}