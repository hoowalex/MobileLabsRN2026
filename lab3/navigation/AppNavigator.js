import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useThemeContext } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function AppNavigator(props) {
  const { theme, isDark } = useThemeContext();

  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
          sceneStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName = 'ellipse';

            if (route.name === 'Гра') iconName = 'game-controller';
            if (route.name === 'Завдання') iconName = 'checkmark-done';
            if (route.name === 'Налаштування') iconName = 'settings';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Гра">
          {() => <HomeScreen {...props} />}
        </Tab.Screen>

        <Tab.Screen name="Завдання">
          {() => <ChallengesScreen {...props} />}
        </Tab.Screen>

        <Tab.Screen name="Налаштування">
          {() => <SettingsScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}