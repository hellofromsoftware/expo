import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'tutor' | 'student';
  bio: string;
  location: string;
}

const USER_STORAGE_KEY = '@user_info';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleUserTypeSelection = async (userType: 'tutor' | 'student') => {
    // For this example, we'll create a simple mock user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: `New ${userType}`,
      email: `${userType}@example.com`,
      userType: userType,
      bio: '',
      location: '',
    };
    
    // Save user data to AsyncStorage
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      // Navigate to the profile setup screen
      router.replace('/profile/setup');
    } catch (e) {
      console.error('Failed to save user to storage', e);
      // Fallback navigation in case of error
      router.replace('/profile/setup');
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="school-outline" size={80} color="#4f46e5" />
      <Text style={styles.title}>Welcome to TutorConnect</Text>
      <Text style={styles.subtitle}>
        Are you here to learn or to teach?
      </Text>
      
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => handleUserTypeSelection('student')}
        >
          <Text style={styles.buttonText}>I am a Student</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => handleUserTypeSelection('tutor')}
        >
          <Text style={styles.buttonText}>I am a Tutor</Text>
        </Pressable>
      </View>
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
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4f46e5',
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
