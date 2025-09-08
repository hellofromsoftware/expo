import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function SubjectSelector() {
  const [subjects, setSubjects] = useState<string[]>([]);

  const addSubject = (subject: string) => {
    setSubjects(prev => [...prev, subject]);
  };

  return (
    <View>
      <Text>Subjects: {subjects.join(', ')}</Text>
      <Button title="Add Math" onPress={() => addSubject('Math')} />
      <Button title="Add Physics" onPress={() => addSubject('Physics')} />
    </View>
  );
}
