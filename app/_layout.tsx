import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';

// WARNING: Hardcoding Firebase configuration is not a secure practice.
// This is for demonstration purposes only. For a production app,
// use environment variables to protect your API keys.
const firebaseConfig = {
  apiKey: "AIzaSyBfbXUUnTZHgPHzPeCURQIANDvXoPWnltQ",
  authDomain: "tutorconnect-6aa67.firebaseapp.com",
  projectId: "tutorconnect-6aa67",
  storageBucket: "tutorconnect-6aa67.firebasestorage.app",
  messagingSenderId: "1091712360728",
  appId: "1:1091712360728:web:aca649f2265162c5cafe6d",
  measurementId: "G-2DQY99NG9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // This listener is crucial for managing the user's state. It fires
    // whenever the user signs in or out, and on app startup.
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // Update our user state with the authenticated user object.
      setUser(authUser);
      // Mark the app as ready to render the main navigation.
      setIsReady(true);
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // We'll sign in anonymously only once, right after the component mounts.
    // The onAuthStateChanged listener above will handle state changes after this.
    if (!user) {
      signInAnonymously(auth).catch(error => {
        console.error("Failed to sign in anonymously:", error);
      });
    }
  }, [user]);

  // Show a loading screen while we wait for the auth state to be checked.
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Once ready, use the user state to decide which screen to show.
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // If a user object exists, they are logged in.
        <Stack.Screen name="(tabs)" />
      ) : (
        // If no user object, they are not logged in.
        <Stack.Screen name="onboarding" />
      )}
      
      {/* Screens that are part of the main app flow but not in the tab bar */}
      <Stack.Screen name="profile/setup" />
      <Stack.Screen name="profile/detail" />
      <Stack.Screen name="connect" />
      <Stack.Screen name="filters" />
    </Stack>
  );
}
