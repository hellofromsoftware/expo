import React from 'react';
import { View } from 'react-native';
import SubjectSelector from '@/components/SubjectSelector';

export default function FiltersScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SubjectSelector />
    </View>
  );
}
