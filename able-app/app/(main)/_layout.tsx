import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="therapists/index" />
      <Stack.Screen name="therapists/[id]" />
      <Stack.Screen name="booking/select-time" />
      <Stack.Screen name="booking/payment" />
      <Stack.Screen name="booking/confirmation" />
      <Stack.Screen name="sessions/index" />
      <Stack.Screen name="sessions/[id]" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="documents" />
      <Stack.Screen name="progress" />
    </Stack>
  );
}
