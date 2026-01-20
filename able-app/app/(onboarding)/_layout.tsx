import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '../../constants/colors';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="segmentation" />
      <Stack.Screen name="questionnaire/[step]" />
      <Stack.Screen name="generating" />
      <Stack.Screen name="results/assessment" />
      <Stack.Screen name="results/strengths" />
      <Stack.Screen name="results/action-plan" />
      <Stack.Screen name="upload-report" />
      <Stack.Screen name="support-options" />
    </Stack>
  );
}
