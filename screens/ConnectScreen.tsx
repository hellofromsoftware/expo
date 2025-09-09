import { getInitials } from '@/components/ui/utils'; // Assuming this utility function exists
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'tutor' | 'student';
  avatar?: string;
  location?: string;
  rating?: number;
  reviewCount?: number;
  subjects?: string[];
  phone?: string;
}

// Mock data for the current user and the profile to connect with
const MOCK_CURRENT_USER: User = {
  id: 'current-user-123',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  userType: 'student',
  phone: '555-123-4567',
};

const MOCK_PROFILE: User = {
  id: 'profile-user-456',
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@example.com',
  userType: 'tutor',
  avatar: 'https://placehold.co/100x100/A020F0/white?text=SC',
  location: 'Manchester, UK',
  rating: 4.8,
  reviewCount: 75,
  subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
};

export default function ConnectScreen() {
  const router = useRouter();
  const { profileId } = useLocalSearchParams();

  const [message, setMessage] = useState('');
  const [shareContactInfo, setShareContactInfo] = useState(false);
  const [connectionSent, setConnectionSent] = useState(false);

  // In a real app, you would fetch these from an API or global state
  const currentUser = MOCK_CURRENT_USER;
  const profile = MOCK_PROFILE;

  const handleConnect = () => {
    console.log('Connecting with:', profile.name);
    console.log('Message:', message);
    console.log('Share contact info:', shareContactInfo);

    // Assume onMatch is a function passed down or available from a context
    // onMatch(profile);
    setConnectionSent(true);

    setTimeout(() => {
      router.back();
    }, 2000);
  };

  // Conditionally render the success screen
  if (connectionSent) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Feather name="check-circle" size={64} color="#22c55e" style={styles.successIcon} />
            <Text style={styles.successTitle}>Connection Request Sent!</Text>
            <Text style={styles.successText}>
              Your connection request has been sent to {profile.name}. You'll be notified when they respond.
            </Text>
            <Pressable style={styles.continueButton} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Continue Browsing</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Connect with {profile.name}</Text>
      </View>

      {/* Profile Summary */}
      <View style={styles.card}>
        <View style={styles.profileSummaryContent}>
          <View style={styles.avatarContainer}>
            {profile.avatar ? (
              <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>{getInitials(profile.name)}</Text>
              </View>
            )}
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <View style={[styles.badge, profile.userType === 'tutor' ? styles.badgeTutor : styles.badgeStudent]}>
                <Text style={styles.badgeText}>{profile.userType}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Feather name="map-pin" size={16} color="#6b7280" />
                <Text style={styles.infoText}>{profile.location}</Text>
              </View>
              {profile.rating && (
                <View style={styles.infoItem}>
                  <AntDesign name="star" size={16} color="#facc15" />
                  <Text style={styles.infoText}>{profile.rating} ({profile.reviewCount} reviews)</Text>
                </View>
              )}
            </View>
            {profile.subjects && profile.subjects.length > 0 && (
              <View style={styles.subjectsContainer}>
                {profile.subjects.slice(0, 4).map((subject) => (
                  <View key={subject} style={styles.subjectBadge}>
                    <Text style={styles.subjectText}>{subject}</Text>
                  </View>
                ))}
                {profile.subjects.length > 4 && (
                  <View style={styles.subjectBadge}>
                    <Text style={styles.subjectText}>+{profile.subjects.length - 4} more</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Connection Form */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderTitle}>
            <AntDesign name="hearto" size={20} color="#ef4444" />
            <Text style={styles.titleText}>Send Connection Request</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.section}>
            <Text style={styles.label}>Personal Message (Optional)</Text>
            <TextInput
              style={styles.textarea}
              placeholder={`Hi ${profile.name}, I'd love to ${currentUser.userType === 'tutor' ? 'help you with your studies' : 'learn from you'}. I'm particularly interested in ${profile.subjects?.[0] || 'your expertise'}...`}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
            <Text style={styles.helpText}>A personal message increases your chances of getting a positive response.</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Your Contact Information</Text>
            <View style={styles.contactInfoContainer}>
              <View style={styles.contactRow}>
                <View style={styles.contactLeft}>
                  <MaterialCommunityIcons name="email-outline" size={18} color="#6b7280" />
                  <Text style={styles.contactText}>Email: {currentUser.email}</Text>
                </View>
                <View style={styles.contactRight}>
                  <Text style={styles.contactHelpText}>Always shared</Text>
                </View>
              </View>
              {currentUser.phone && (
                <View style={styles.contactRow}>
                  <View style={styles.contactLeft}>
                    <Feather name="phone" size={18} color="#6b7280" />
                    <Text style={styles.contactText}>Phone: {currentUser.phone}</Text>
                  </View>
                  <View style={styles.contactRight}>
                    <Switch
                      value={shareContactInfo}
                      onValueChange={setShareContactInfo}
                      thumbColor={shareContactInfo ? '#4f46e5' : '#f4f3f4'}
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                    <Text style={styles.contactHelpText}>Share</Text>
                  </View>
                </View>
              )}
            </View>
            <Text style={styles.helpText}>Your contact information will only be shared if your connection request is accepted.</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.buttonTextOutline}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.connectButton} onPress={handleConnect}>
          <Feather name="send" size={16} color="white" />
          <Text style={styles.buttonText}>Send Connection Request</Text>
        </Pressable>
      </View>

      <Pressable style={styles.linkButton} onPress={() => router.push('profile-detail')}>
        <Text style={styles.linkText}>View Full Profile Instead</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    paddingRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  profileSummaryContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginRight: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
  },
  avatarFallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  profileDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeTutor: {
    backgroundColor: '#4f46e5',
  },
  badgeStudent: {
    backgroundColor: '#e5e7eb',
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  subjectText: {
    fontSize: 12,
    color: '#374151',
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cardHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textarea: {
    height: 100,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  helpText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  contactInfoContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    marginLeft: 12,
  },
  contactRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactHelpText: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginRight: 8,
  },
  connectButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#ef4444',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  buttonTextOutline: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  linkButton: {
    alignSelf: 'center',
    padding: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#6b7280',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  successIcon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
});
