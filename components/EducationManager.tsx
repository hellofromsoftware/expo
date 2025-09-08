import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function EducationManager() {
  const [education, setEducation] = useState('');

  return (
    <View>
      <Text>Add Education</Text>
      <TextInput
        placeholder="Enter education detail"
        value={education}
        onChangeText={setEducation}
      />
      <Button title="Save" onPress={() => console.log(education)} />
    </View>
  );
}
