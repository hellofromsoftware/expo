import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Define the types needed for the mock data and component props
interface User {
  id: string;
  name: string;
  userType: 'tutor' | 'student';
  location: string;
  avatar?: string;
  hourlyRate?: number;
  subjects?: string[];
  preferredSubjects?: string[];
}

interface Match {
  id: string;
  user: User;
  timestamp: Date;
  lastMessage?: string;
  unreadCount?: number;
}

// Mock data for demonstration purposes
const mockMatches: Match[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Jane Doe',
      userType: 'tutor',
      location: 'London',
      avatar: 'https://i.pravatar.cc/150?img=3',
      hourlyRate: 35,
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    },
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    lastMessage: 'I am available on Thursday evening.',
    unreadCount: 2,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'John Smith',
      userType: 'student',
      location: 'Manchester',
      preferredSubjects: ['Computer Science', 'History'],
    },
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    lastMessage: 'Sounds good, what time works for you?',
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Emily Chen',
      userType: 'tutor',
      location: 'Birmingham',
      hourlyRate: 40,
      subjects: ['English', 'French'],
    },
    timestamp: new Date(Date.now() - 604800000), // 7 days ago
      lastMessage: 'Hi there, are you still looking for an English tutor?',
      unreadCount: 1,
  },
];

export default function MatchesScreen() {
  const router = useRouter();
  const matches = mockMatches;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTitle}>Matches</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent}>
        {matches.length === 0 ? (
          <View style={styles.noMatchesContainer}>
            <Feather name="message-circle" size={64} color="#d1d5db" style={styles.icon} />
            <Text style={styles.noMatchesTitle}>No matches yet</Text>
            <Text style={styles.noMatchesText}>
              Start browsing profiles to find your perfect tutoring match!
            </Text>
            <Pressable
              onPress={() => router.back()}
              style={[styles.button, styles.primaryButton]}
            >
              <Text style={styles.buttonText}>Start Browsing</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <View style={styles.introSection}>
              <Text style={styles.introTitle}>
                Your Matches ({matches.length})
              </Text>
              <Text style={styles.introText}>
                These are people who have shown mutual interest in connecting with you.
              </Text>
            </View>
            {matches.map((match) => (
              <Pressable
                key={match.id}
                onPress={() => router.push({ pathname: '/chat', params: { matchId: match.id } })}
                style={styles.card}
              >
                <View style={styles.cardContent}>
                  <View style={styles.profileRow}>
                    <View style={styles.avatar}>
                      {match.user.avatar ? (
                        <Image source={{ uri: match.user.avatar }} style={styles.avatarImage} />
                      ) : (
                        <View style={styles.avatarFallback}>
                          <Text style={styles.avatarFallbackText}>
                            {getInitials(match.user.name)}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.detailsColumn}>
                      <View style={styles.nameRow}>
                        <Text style={styles.nameText}>{match.user.name}</Text>
                        <View style={styles.timestampRow}>
                          <Feather name="clock" size={12} color="#6b7280" />
                          <Text style={styles.timestampText}>{formatTime(match.timestamp)}</Text>
                        </View>
                      </View>

                      <View style={styles.badgeRow}>
                        <View style={[styles.badge, match.user.userType === 'tutor' ? styles.tutorBadge : styles.studentBadge]}>
                          <Text style={styles.badgeText}>
                            {match.user.userType === 'tutor' ? 'Tutor' : 'Student'}
                          </Text>
                        </View>
                        <Text style={styles.locationText}>{match.user.location}</Text>
                      </View>

                      {match.user.userType === 'tutor' && (
                        <View style={styles.infoRow}>
                          <Text style={styles.rateText}>£{match.user.hourlyRate}/hour</Text>
                          {match.user.subjects && match.user.subjects.length > 0 && (
                            <Text style={styles.subjectText}>
                              • {match.user.subjects.slice(0, 2).join(', ')}
                              {match.user.subjects.length > 2 && ` +${match.user.subjects.length - 2} more`}
                            </Text>
                          )}
                        </View>
                      )}

                      {match.user.userType === 'student' && match.user.preferredSubjects && (
                        <Text style={styles.subjectText}>
                          Needs help with: {match.user.preferredSubjects.slice(0, 2).join(', ')}
                          {match.user.preferredSubjects.length > 2 && ` +${match.user.preferredSubjects.length - 2} more`}
                        </Text>
                      )}

                      <Text style={styles.lastMessageText} numberOfLines={1}>
                        {match.lastMessage ? match.lastMessage : 'Start a conversation...'}
                      </Text>
                    </View>

                    <View style={styles.unreadColumn}>
                      <Feather name="message-circle" size={20} color="#6b7280" />
                      {match.unreadCount && match.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{match.unreadCount}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
            <View style={styles.noMoreMatchesContainer}>
              <Text style={styles.noMoreMatchesText}>
                That's all your matches for now!
              </Text>
              <Pressable
                onPress={() => router.back()}
                style={[styles.button, styles.outlineButton]}
              >
                <Text style={styles.outlineButtonText}>Find More Matches</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
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
  scrollContent: {
    padding: 16,
  },
  noMatchesContainer: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  icon: {
    marginBottom: 16,
  },
  noMatchesTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  noMatchesText: {
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  introSection: {
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  introText: {
    color: '#6b7280',
    fontSize: 14,
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
  cardContent: {
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  detailsColumn: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    flexShrink: 1,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestampText: {
    fontSize: 12,
    color: '#6b7280',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
  },
  tutorBadge: {
    backgroundColor: '#4f46e5',
  },
  studentBadge: {
    backgroundColor: '#6b7280',
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  rateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16a34a',
  },
  subjectText: {
    fontSize: 14,
    color: '#6b7280',
  },
  lastMessageText: {
    fontSize: 14,
    color: '#6b7280',
  },
  unreadColumn: {
    alignItems: 'flex-end',
    gap: 8,
  },
  unreadBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  unreadBadgeText: {
    fontSize: 12,
    color: 'white',
  },
  noMoreMatchesContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noMoreMatchesText: {
    color: '#6b7280',
    fontSize: 14,
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  outlineButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  outlineButtonText: {
    color: 'black',
  }
});
