import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function ProviderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="students" />
      <Stack.Screen name="student/[id]" />
      <Stack.Screen name="schedule" />
      <Stack.Screen name="earnings" />
    </Stack>
  );
}
