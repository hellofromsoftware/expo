import React from 'react';
import { ScrollView } from 'react-native';
import ImageUpload from '@/components/ImageUpload';
import AvailabilityScheduler from '@/components/AvailabilityScheduler';
import EducationManager from '@/components/EducationManager';

export default function ProfileSetupScreen() {
  return (
    <ScrollView>
      <ImageUpload />
      <AvailabilityScheduler />
      <EducationManager />
    </ScrollView>
  );
}
