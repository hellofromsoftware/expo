import React from 'react';
import { ScrollView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import AdvertisementBanner from '@/components/AdvertisementBanner';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView>
      <AdvertisementBanner />
      <Button title="Filters" onPress={() => router.push('/filters')} />
      <Button title="Setup Profile" onPress={() => router.push('/profile/setup')} />
      <Button title="Profile Detail" onPress={() => router.push('/profile/detail')} />
    </ScrollView>
  );
}
