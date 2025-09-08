import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Onboarding
      onDone={() => router.replace('/')}
      onSkip={() => router.replace('/')}
      pages={[
        { backgroundColor: '#fff', image: null, title: 'Welcome', subtitle: 'Find your perfect tutor' },
        { backgroundColor: '#f0f0f0', image: null, title: 'Learn Anywhere', subtitle: 'Study online or in-person' },
        { backgroundColor: '#ddd', image: null, title: 'Get Started', subtitle: 'Create your profile now' },
      ]}
    />
  );
}
