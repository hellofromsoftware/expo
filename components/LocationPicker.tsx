import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SUGGESTIONS = [
  {
    display_name: "London, Greater London, England, United Kingdom",
    lat: "51.5074",
    lon: "-0.1278",
    place_id: "1"
  },
  {
    display_name: "Manchester, Greater Manchester, England, United Kingdom",
    lat: "53.4808",
    lon: "-2.2426",
    place_id: "2"
  },
  {
    display_name: "Birmingham, West Midlands, England, United Kingdom",
    lat: "52.4862",
    lon: "-1.8904",
    place_id: "3"
  },
  {
    display_name: "Edinburgh, Scotland, United Kingdom",
    lat: "55.9533",
    lon: "-3.1883",
    place_id: "4"
  },
  {
    display_name: "Cardiff, Wales, United Kingdom",
    lat: "51.4816",
    lon: "-3.1791",
    place_id: "5"
  },
  {
    display_name: "Liverpool, Merseyside, England, United Kingdom",
    lat: "53.4084",
    lon: "-2.9916",
    place_id: "6"
  },
  {
    display_name: "Bristol, England, United Kingdom",
    lat: "51.4545",
    lon: "-2.5879",
    place_id: "7"
  },
  {
    display_name: "Leeds, West Yorkshire, England, United Kingdom",
    lat: "53.8008",
    lon: "-1.5491",
    place_id: "8"
  }
];

const getLocationDisplayName = (fullName) => {
  const parts = fullName.split(', ');
  if (parts.length >= 2) {
    return `${parts[0]}, ${parts[parts.length - 1]}`;
  }
  return fullName;
};

export default function LocationPicker({ location, onLocationChange }) {
  const [searchInput, setSearchInput] = useState(location || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);

  useEffect(() => {
    setSearchInput(location || '');
  }, [location]);

  const searchLocations = (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestionsModal(false);
      return;
    }

    setIsSearching(true);
    
    const filtered = SUGGESTIONS.filter(suggestion =>
      suggestion.display_name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Simulate API delay
    setTimeout(() => {
      setSuggestions(filtered);
      setShowSuggestionsModal(true);
      setIsSearching(false);
    }, 300);
  };

  const handleInputChange = (value) => {
    setSearchInput(value);
    searchLocations(value);
  };

  const selectLocation = (suggestion) => {
    const coords = {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon)
    };
    
    onLocationChange(suggestion.display_name, coords);
    setSearchInput(suggestion.display_name);
    setShowSuggestionsModal(false);
    setSuggestions([]);
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access location is needed to use this feature.');
      return;
    }

    try {
      let loc = await Location.getCurrentPositionAsync({});
      const coords = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      };
      
      // Note: In a real app, you would use a reverse geocoding service here
      // to get a human-readable address from the coordinates.
      const mockAddress = "Current Location (Approximate)";
      onLocationChange(mockAddress, coords);
      setSearchInput(mockAddress);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your current location. Please enter it manually.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search for your location..."
            value={searchInput}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity 
            style={styles.currentLocationButton} 
            onPress={getCurrentLocation}
          >
            <Text style={styles.currentLocationButtonText}>📍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Suggestions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuggestionsModal}
        onRequestClose={() => setShowSuggestionsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {isSearching && searchInput.length >= 3 && (
              <View style={styles.messageBox}>
                <ActivityIndicator size="small" color="#007bff" />
                <Text style={styles.messageText}>Searching...</Text>
              </View>
            )}
            {!isSearching && suggestions.length === 0 && searchInput.length >= 3 && (
              <View style={styles.messageBox}>
                <Text style={styles.messageText}>No locations found for "{searchInput}"</Text>
              </View>
            )}
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => selectLocation(item)}
                >
                  <Text style={styles.suggestionTitle}>{getLocationDisplayName(item.display_name)}</Text>
                  <Text style={styles.suggestionSubtitle}>{item.display_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Selected Location Display */}
      {location && (
        <View style={styles.selectedLocationContainer}>
          <Text style={styles.selectedLocationIcon}>📌</Text>
          <View>
            <Text style={styles.selectedLocationText}>{getLocationDisplayName(location)}</Text>
            <Text style={styles.selectedLocationSubtitle}>Selected location</Text>
          </View>
        </View>
      )}

      <Text style={styles.descriptionText}>
        Your location helps students find tutors in their area. You can also enable online tutoring to teach students anywhere.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 48,
    paddingLeft: 12,
    paddingRight: 40,
    fontSize: 16,
  },
  currentLocationButton: {
    position: 'absolute',
    right: 0,
    height: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  currentLocationButtonText: {
    fontSize: 20,
  },
  selectedLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedLocationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  selectedLocationText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedLocationSubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
  descriptionText: {
    fontSize: 12,
    color: '#6c757d',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  messageText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 8,
  },
  suggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  suggestionTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  suggestionSubtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
});
