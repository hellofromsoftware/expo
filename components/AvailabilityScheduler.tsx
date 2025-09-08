import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function AvailabilityScheduler() {
  const [selected, setSelected] = useState<string>("");

  return (
    <View>
      <Text>Select your availability</Text>
      <Calendar onDayPress={day => setSelected(day.dateString)} />
      <Button title="Save Availability" onPress={() => console.log(selected)} />
    </View>
  );
}
