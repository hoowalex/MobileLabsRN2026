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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { authStyles as s } from '../../src/styles/authStyles';

export default function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await resetPassword(email.trim());
      Alert.alert('Готово', 'Лист для відновлення пароля надіслано');
    } catch (error: any) {
      Alert.alert('Помилка', error.message);
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
            <Text style={s.title}>Відновлення пароля</Text>
            <Text style={s.subtitle}>Введи email, і ми надішлемо лист</Text>

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

            <Pressable style={s.primaryButton} onPress={handleReset}>
              <Text style={s.primaryButtonText}>Надіслати лист</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}