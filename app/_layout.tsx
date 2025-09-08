import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Replace with AsyncStorage for real persistence
    setTimeout(() => setIsFirstLaunch(true), 500);
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="onboarding" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
      <Stack.Screen name="filters" />
      <Stack.Screen name="profile/setup" />
      <Stack.Screen name="profile/detail" />
    </Stack>
  );
}
