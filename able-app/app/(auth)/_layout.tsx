import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="language" />
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
