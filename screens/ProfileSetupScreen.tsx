import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Key for AsyncStorage to save user data
const USER_STORAGE_KEY = '@user_info';

// Define the User type to match what HomeScreen expects
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'tutor' | 'student';
  bio: string;
  location: string;
  subjects?: string[];
  hourlyRate?: number;
  educations?: any[];
  teachingExperience?: string;
  yearsOfExperience?: number;
  rating?: number;
  reviewCount?: number;
  availability?: any[];
  isOnline?: boolean;
  avatar?: string;
  grade?: string;
  learningGoals?: string;
  preferredSubjects?: string[];
}

export default function ProfileSetupScreen() {
  const router = useRouter();

  const handleComplete = async () => {
    // In a real app, this data would come from form inputs.
    // For now, we'll create a mock user and save it.
    const mockUser: User = {
      id: 'mock-user-123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      userType: 'student', // Default user type for demonstration
      bio: 'A student interested in learning math and science.',
      location: 'London, UK',
      preferredSubjects: ['Mathematics', 'Science'],
    };

    try {
      // Save the mock user data to AsyncStorage
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      console.log('User data saved to AsyncStorage.');

      // Navigate to the main tabs after saving the profile
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save user data:', error);
      // Even if saving fails, navigate to the main tabs to continue the flow
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>
        This is a placeholder for your profile setup form.
      </Text>
      <Pressable style={styles.button} onPress={handleComplete}>
        <Text style={styles.buttonText}>Save and Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4f46e5',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
