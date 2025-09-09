import { Feather } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

// Define the Filters type
interface Filters {
  subjects: string[];
  location: string;
  feeRange: [number, number];
  mode: 'online' | 'offline' | 'both';
  rating: number;
}

// Mock onFiltersChange and initialFilters for demonstration
const mockOnFiltersChange = (filters: Filters) => {
  console.log('Filters applied:', filters);
};

const initialFilters: Filters = {
  subjects: [],
  location: '',
  feeRange: [0, 100],
  mode: 'both',
  rating: 0,
};

export default function FiltersScreen() {
  const router = useRouter();
  const [localFilters, setLocalFilters] = useState<Filters>(initialFilters);
  const [newSubject, setNewSubject] = useState('');

  const commonSubjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
    'Geography', 'Computer Science', 'French', 'Spanish', 'Art', 'Music',
    'Economics', 'Psychology', 'Philosophy', 'Business Studies'
  ];

  const handleLocalFilterChange = (field: keyof Filters, value: any) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const addSubject = (subject: string) => {
    if (subject.trim() && !localFilters.subjects.includes(subject.trim())) {
      handleLocalFilterChange('subjects', [...localFilters.subjects, subject.trim()]);
    }
  };

  const removeSubject = (subject: string) => {
    handleLocalFilterChange('subjects', localFilters.subjects.filter(s => s !== subject));
  };

  const toggleSubject = (subject: string) => {
    if (localFilters.subjects.includes(subject)) {
      removeSubject(subject);
    } else {
      addSubject(subject);
    }
  };

  const handleApplyFilters = () => {
    mockOnFiltersChange(localFilters);
    router.back();
  };

  const handleResetFilters = () => {
    const resetFilters: Filters = {
      subjects: [],
      location: '',
      feeRange: [0, 100],
      mode: 'both',
      rating: 0,
    };
    setLocalFilters(resetFilters);
  };

  const handleRadioPress = (value: string) => {
    handleLocalFilterChange('mode', value as 'online' | 'offline' | 'both');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Filters</Text>
        <Pressable onPress={handleResetFilters} style={styles.headerButton}>
          <Text style={styles.resetText}>Reset</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Subjects */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Subjects</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.subjectInputRow}>
              <TextInput
                style={styles.input}
                placeholder="Add custom subject"
                value={newSubject}
                onChangeText={setNewSubject}
                onSubmitEditing={() => {
                  addSubject(newSubject);
                  setNewSubject('');
                }}
              />
              <Pressable
                onPress={() => {
                  addSubject(newSubject);
                  setNewSubject('');
                }}
                disabled={!newSubject.trim()}
                style={styles.plusButton}
              >
                <Feather name="plus" size={20} color="white" />
              </Pressable>
            </View>

            <View style={styles.subjectBadgesContainer}>
              {commonSubjects.map(subject => (
                <Pressable
                  key={subject}
                  onPress={() => toggleSubject(subject)}
                  style={[
                    styles.subjectButton,
                    localFilters.subjects.includes(subject) ? styles.subjectButtonSelected : styles.subjectButtonOutline,
                  ]}
                >
                  <Text style={[
                    styles.subjectButtonText,
                    localFilters.subjects.includes(subject) ? styles.subjectButtonTextSelected : styles.subjectButtonTextOutline,
                  ]}>
                    {subject}
                  </Text>
                </Pressable>
              ))}
            </View>

            {localFilters.subjects.length > 0 && (
              <View style={styles.selectedSubjectsSection}>
                <Text style={styles.label}>Selected subjects:</Text>
                <View style={styles.selectedSubjectsContainer}>
                  {localFilters.subjects.map(subject => (
                    <View key={subject} style={styles.selectedSubjectBadge}>
                      <Text style={styles.selectedSubjectText}>{subject}</Text>
                      <Pressable onPress={() => removeSubject(subject)} style={styles.removeSubjectButton}>
                        <Feather name="x" size={14} color="white" />
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Location */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Location</Text>
          </View>
          <View style={styles.cardContent}>
            <TextInput
              style={styles.input}
              placeholder="e.g., London, Manchester, Birmingham"
              value={localFilters.location}
              onChangeText={(text) => handleLocalFilterChange('location', text)}
            />
          </View>
        </View>

        {/* Fee Range */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Hourly Rate Range</Text>
          </View>
          <View style={styles.cardContent}>
            <Slider
              style={styles.slider}
              value={localFilters.feeRange[0]}
              minimumValue={0}
              maximumValue={200}
              step={5}
              onSlidingComplete={(value) => handleLocalFilterChange('feeRange', [value, localFilters.feeRange[1]])}
              minimumTrackTintColor="#4f46e5"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#4f46e5"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderText}>£0</Text>
              <Text style={styles.sliderTextBold}>
                £{localFilters.feeRange[0]} - £{localFilters.feeRange[1]}/hour
              </Text>
              <Text style={styles.sliderText}>£200+</Text>
            </View>
          </View>
        </View>

        {/* Learning Mode */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Learning Mode</Text>
          </View>
          <View style={styles.cardContent}>
            <RadioGroup
              radioButtons={[
                { id: 'both', label: 'Both Online & In-Person', value: 'both' },
                { id: 'online', label: 'Online Only', value: 'online' },
                { id: 'offline', label: 'In-Person Only', value: 'offline' },
              ]}
              selectedId={localFilters.mode}
              onPress={handleRadioPress}
              layout="column"
              containerStyle={styles.radioGroupContainer}
              labelStyle={styles.radioLabel}
            />
          </View>
        </View>

        {/* Minimum Rating */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Minimum Rating</Text>
          </View>
          <View style={styles.cardContent}>
            <Slider
              style={styles.slider}
              value={localFilters.rating}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
              onSlidingComplete={(value) => handleLocalFilterChange('rating', value)}
              minimumTrackTintColor="#4f46e5"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#4f46e5"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderText}>Any rating</Text>
              <Text style={styles.sliderTextBold}>
                {localFilters.rating === 0 ? 'Any rating' : `${localFilters.rating}+ stars`}
              </Text>
              <Text style={styles.sliderText}>5 stars</Text>
            </View>
          </View>
        </View>

        {/* Apply Button */}
        <View style={styles.buttonRow}>
          <Pressable onPress={() => router.back()} style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable onPress={handleApplyFilters} style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </Pressable>
        </View>

        {/* Active Filters Summary */}
        {(localFilters.subjects.length > 0 ||
          localFilters.location ||
          localFilters.rating > 0 ||
          localFilters.mode !== 'both') && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Active Filters</Text>
              </View>
              <View style={styles.cardContent}>
                {localFilters.subjects.length > 0 && (
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Subjects:</Text>
                    <Text style={styles.summaryText}>{localFilters.subjects.join(', ')}</Text>
                  </View>
                )}
                {localFilters.location && (
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Location:</Text>
                    <Text style={styles.summaryText}>{localFilters.location}</Text>
                  </View>
                )}
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Fee Range:</Text>
                  <Text style={styles.summaryText}>£{localFilters.feeRange[0]} - £{localFilters.feeRange[1]}/hour</Text>
                </View>
                {localFilters.mode !== 'both' && (
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Mode:</Text>
                    <Text style={styles.summaryText}>
                      {localFilters.mode === 'online' ? 'Online Only' : 'In-Person Only'}
                    </Text>
                  </View>
                )}
                {localFilters.rating > 0 && (
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Minimum Rating:</Text>
                    <Text style={styles.summaryText}>{localFilters.rating}+ stars</Text>
                  </View>
                )}
              </View>
            </View>
          )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  resetText: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  subjectInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  plusButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    padding: 10,
  },
  subjectBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  subjectButton: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  subjectButtonSelected: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  subjectButtonOutline: {
    backgroundColor: 'white',
  },
  subjectButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  subjectButtonTextSelected: {
    color: 'white',
  },
  subjectButtonTextOutline: {
    color: 'black',
  },
  selectedSubjectsSection: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
  },
  selectedSubjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  selectedSubjectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSubjectText: {
    fontSize: 12,
    color: 'white',
    marginRight: 4,
  },
  removeSubjectButton: {
    padding: 2,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderText: {
    fontSize: 12,
    color: '#6b7280',
  },
  sliderTextBold: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  radioGroupContainer: {
    alignItems: 'flex-start',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonPrimary: {
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  summaryItem: {
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  summaryText: {
    fontSize: 14,
    color: '#6b7280',
  },
});
