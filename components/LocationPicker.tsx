import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as Location from 'expo-location';

export default function LocationPicker() {
  const [location, setLocation] = useState<any>(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  };

  return (
    <View>
      <Button title="Pick Location" onPress={getLocation} />
      {location && <Text>Lat: {location.coords.latitude}, Lng: {location.coords.longitude}</Text>}
    </View>
  );
}
