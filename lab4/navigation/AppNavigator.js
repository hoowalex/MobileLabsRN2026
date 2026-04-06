import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import EditorScreen from '../screens/EditorScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Файловий менеджер' }}
        />

        <Stack.Screen
          name="Editor"
          component={EditorScreen}
          options={({ route }) => ({
            title: route.params?.fileName || 'Редактор',
          })}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params?.name || 'Деталі',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}