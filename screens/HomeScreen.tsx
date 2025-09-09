import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Define your types for User and Filters
interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  field?: string;
}

interface Availability {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'tutor' | 'student';
  bio: string;
  location: string;
  subjects?: string[];
  hourlyRate?: number;
  educations?: Education[];
  teachingExperience?: string;
  yearsOfExperience?: number;
  rating?: number;
  reviewCount?: number;
  availability?: Availability[];
  isOnline?: boolean;
  avatar?: string;
  grade?: string;
  learningGoals?: string;
  preferredSubjects?: string[];
}

const USER_STORAGE_KEY = '@user_info';

// A simple mock component for the AdvertisementBanner
const AdvertisementBanner = ({ style }: any) => {
  return (
    <View style={[styles.adBanner, style]}>
      <Text style={styles.adText}>Advertisement Banner</Text>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile management state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<User[]>([]);

  useEffect(() => {
    // Load user data on component mount
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const user: User = JSON.parse(storedUser);
          setCurrentUser(user);
          // Generate profiles based on the user's type
          const mockProfiles: User[] = user.userType === 'student'
            ? generateMockTutors()
            : generateMockStudents();
          setProfiles(mockProfiles);
        }
      } catch (e) {
        console.error('Failed to load user from storage', e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const generateMockTutors = (): User[] => [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah@example.com',
      userType: 'tutor',
      bio: 'PhD in Mathematics with 8 years of teaching experience. I specialize in making complex concepts easy to understand.',
      location: 'London, UK',
      subjects: ['Mathematics', 'Physics'],
      hourlyRate: 45,
      educations: [
        { id: '1', degree: 'PhD Mathematics', institution: 'University of Cambridge', year: '2015', field: 'Pure Mathematics' },
        { id: '2', degree: 'PGCE', institution: 'Institute of Education', year: '2016' }
      ],
      yearsOfExperience: 8,
      rating: 4.9,
      reviewCount: 32,
      availability: [
        { id: '1', dayOfWeek: 'Monday', startTime: '18:00', endTime: '21:00' },
        { id: '2', dayOfWeek: 'Tuesday', startTime: '18:00', endTime: '21:00' }
      ],
      isOnline: true
    },
    {
      id: '2',
      name: 'James Wilson',
      email: 'james@example.com',
      userType: 'tutor',
      bio: 'Former software engineer turned computer science tutor. Love helping students discover the joy of coding!',
      location: 'Manchester, UK',
      subjects: ['Computer Science', 'Mathematics'],
      hourlyRate: 35,
      educations: [
        { id: '3', degree: 'BSc Computer Science', institution: 'University of Manchester', year: '2018' },
        { id: '4', degree: 'AWS Certification', institution: 'Amazon Web Services', year: '2020' }
      ],
      yearsOfExperience: 3,
      rating: 4.7,
      reviewCount: 18,
      availability: [
        { id: '3', dayOfWeek: 'Saturday', startTime: '09:00', endTime: '12:00' },
        { id: '4', dayOfWeek: 'Sunday', startTime: '09:00', endTime: '12:00' }
      ],
      isOnline: true
    },
  ];

  const generateMockStudents = (): User[] => [
    {
      id: '4',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      userType: 'student',
      bio: 'Year 12 student preparing for A-Level Mathematics. Looking for help with calculus and statistics.',
      location: 'London, UK',
      grade: 'A-Level',
      learningGoals: 'Improve understanding of calculus and achieve grade A in A-Level Mathematics',
      preferredSubjects: ['Mathematics']
    },
  ];
  
  const currentProfile = profiles[currentIndex];

  const handleConnect = () => {
    if (currentProfile) {
      router.push({ pathname: '/connect', params: { profileId: currentProfile.id } });
    }
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to start for demo
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  if (!currentUser) {
    // This case should ideally not be reached due to the root layout's logic
    return (
      <View style={styles.container}>
        <Text>User not found. Please restart the app.</Text>
      </View>
    );
  }

  // If the current user is a student, we show a list of tutors
  if (currentUser.userType === 'student') {
    if (!currentProfile) {
      return (
        <View style={styles.container}>
          <View style={styles.noProfilesText}>
            <Text style={styles.noProfilesTitle}>No more tutors</Text>
            <Text style={styles.noProfilesSubtitle}>Check back later for new matches!</Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TutorConnect</Text>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.push('/filters')}>
              <Ionicons name="filter" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => router.push('/chat')}>
              <Ionicons name="chatbubbles" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Advertisement Banner */}
        <View style={styles.adWrapper}>
          <AdvertisementBanner style={styles.adBannerMargin} />
        </View>

        {/* Profile Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              {currentProfile.avatar ? (
                <Image source={{ uri: currentProfile.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>
                    {getInitials(currentProfile.name)}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.contentSection}>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText}>{currentProfile.name}</Text>
                  {currentProfile.userType === 'tutor' && currentProfile.rating && (
                    <View style={styles.ratingRow}>
                      <Entypo name="star" size={16} color="gold" />
                      <Text style={styles.ratingText}>{currentProfile.rating}</Text>
                      <Text style={styles.reviewText}>
                        ({currentProfile.reviewCount})
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={16} color="gray" />
                  <Text style={styles.locationText}>{currentProfile.location}</Text>
                  {currentProfile.userType === 'tutor' && currentProfile.isOnline && (
                    <>
                      <Ionicons name="globe-outline" size={16} color="gray" />
                      <Text style={styles.locationText}>Online</Text>
                    </>
                  )}
                </View>

                {currentProfile.userType === 'tutor' && (
                  <View style={styles.rateRow}>
                    <Text style={styles.rateText}>
                      £{currentProfile.hourlyRate}/hour
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.bioText}>{currentProfile.bio}</Text>

              {/* Subjects */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {currentProfile.userType === 'tutor' ? 'Subjects' : 'Learning Goals'}
                </Text>
                <View style={styles.badgeContainer}>
                  {(currentProfile.subjects || currentProfile.preferredSubjects || []).map(subject => (
                    <View key={subject} style={styles.badge}>
                      <Text style={styles.badgeText}>{subject}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Tutor specific info */}
              {currentProfile.userType === 'tutor' && (
                <>
                  {currentProfile.educations && currentProfile.educations.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Education</Text>
                      <View style={styles.educationList}>
                        {currentProfile.educations.slice(0, 2).map(education => (
                          <Text key={education.id} style={styles.educationText}>
                            {education.degree} - {education.institution}
                          </Text>
                        ))}
                        {currentProfile.educations.length > 2 && (
                          <Text style={styles.educationText}>
                            +{currentProfile.educations.length - 2} more
                          </Text>
                        )}
                      </View>
                    </View>
                  )}

                  {currentProfile.yearsOfExperience && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Experience</Text>
                      <View style={styles.badgeOutline}>
                        <Text style={styles.badgeOutlineText}>
                          {currentProfile.yearsOfExperience} {currentProfile.yearsOfExperience === 1 ? 'year' : 'years'}
                        </Text>
                      </View>
                    </View>
                  )}

                  {currentProfile.availability && currentProfile.availability.length > 0 && (
                    <View style={styles.section}>
                      <View style={styles.sectionTitleRow}>
                        <Ionicons name="time-outline" size={16} color="black" />
                        <Text style={styles.sectionTitleWithIcon}>Availability</Text>
                      </View>
                      <View style={styles.badgeContainer}>
                        {currentProfile.availability.slice(0, 2).map(slot => (
                          <View key={slot.id} style={styles.badgeOutline}>
                            <Text style={styles.badgeOutlineText}>
                              {slot.dayOfWeek}
                            </Text>
                          </View>
                        ))}
                        {currentProfile.availability.length > 2 && (
                          <View style={styles.badgeOutline}>
                            <Text style={styles.badgeOutlineText}>
                              +{currentProfile.availability.length - 2} more
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </>
              )}

              {/* Student specific info */}
              {currentProfile.userType === 'student' && currentProfile.grade && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Grade Level</Text>
                  <View style={styles.badgeSecondary}>
                    <Text style={styles.badgeSecondaryText}>{currentProfile.grade}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.passButton} onPress={handlePass}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>

            <Pressable
              style={styles.detailsButton}
              onPress={() => router.push({ pathname: '/profile/detail', params: { profileId: currentProfile.id } })}
            >
              <MaterialCommunityIcons name="eye" size={24} color="black" />
            </Pressable>

            <Pressable style={styles.connectButton} onPress={handleConnect}>
              <Ionicons name="heart" size={24} color="white" />
            </Pressable>
          </View>

          {/* Button Labels */}
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Pass</Text>
            <Text style={styles.labelText}>Details</Text>
            <Text style={styles.labelText}>Connect</Text>
          </View>

          <Text style={styles.profileCountText}>
            Profile {currentIndex + 1} of {profiles.length}
          </Text>
        </View>
      </ScrollView>
    );
  }

  // If the current user is a tutor, we show a list of students
  if (currentUser.userType === 'tutor') {
    if (!currentProfile) {
      return (
        <View style={styles.container}>
          <View style={styles.noProfilesText}>
            <Text style={styles.noProfilesTitle}>No more students</Text>
            <Text style={styles.noProfilesSubtitle}>Check back later for new matches!</Text>
          </View>
        </View>
      );
    }
    // Return a similar UI for tutors matching with students
    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TutorConnect</Text>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.push('/filters')}>
              <Ionicons name="filter" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => router.push('/chat')}>
              <Ionicons name="chatbubbles" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Advertisement Banner */}
        <View style={styles.adWrapper}>
          <AdvertisementBanner style={styles.adBannerMargin} />
        </View>

        {/* Profile Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              {currentProfile.avatar ? (
                <Image source={{ uri: currentProfile.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>
                    {getInitials(currentProfile.name)}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.contentSection}>
                <View style={styles.nameRow}>
                  <Text style={styles.nameText}>{currentProfile.name}</Text>
                  {/* Tutors won't have ratings for students on their card */}
                </View>
                
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={16} color="gray" />
                  <Text style={styles.locationText}>{currentProfile.location}</Text>
                </View>
              </View>

              <Text style={styles.bioText}>{currentProfile.bio}</Text>

              {/* Student specific info */}
              {currentProfile.grade && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Grade Level</Text>
                  <View style={styles.badgeSecondary}>
                    <Text style={styles.badgeSecondaryText}>{currentProfile.grade}</Text>
                  </View>
                </View>
              )}
              
              {currentProfile.preferredSubjects && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Subjects I'm Learning</Text>
                  <View style={styles.badgeContainer}>
                    {currentProfile.preferredSubjects.map(subject => (
                      <View key={subject} style={styles.badge}>
                        <Text style={styles.badgeText}>{subject}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.passButton} onPress={handlePass}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>

            <Pressable
              style={styles.detailsButton}
              onPress={() => router.push({ pathname: '/profile/detail', params: { profileId: currentProfile.id } })}
            >
              <MaterialCommunityIcons name="eye" size={24} color="black" />
            </Pressable>

            <Pressable style={styles.connectButton} onPress={handleConnect}>
              <Ionicons name="heart" size={24} color="white" />
            </Pressable>
          </View>

          {/* Button Labels */}
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Pass</Text>
            <Text style={styles.labelText}>Details</Text>
            <Text style={styles.labelText}>Connect</Text>
          </View>

          <Text style={styles.profileCountText}>
            Profile {currentIndex + 1} of {profiles.length}
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Something went wrong. Please restart the app.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  adWrapper: {
    padding: 16,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  adBanner: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adText: {
    fontSize: 16,
    color: '#6b7280',
  },
  adBannerMargin: {
    marginBottom: 16,
  },
  cardWrapper: {
    padding: 16,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    height: 256,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  avatarFallback: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 24,
  },
  contentSection: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reviewText: {
    fontSize: 14,
    color: '#6b7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color: '#6b7280',
    marginBottom: 12,
  },
  locationText: {
    color: '#6b7280',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  rateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#16a34a',
  },
  bioText: {
    color: '#6b7280',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '500',
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionTitleWithIcon: {
    fontWeight: '500',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
  },
  badgeOutline: {
    borderColor: '#e5e7eb',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeOutlineText: {
    fontSize: 12,
  },
  badgeSecondary: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeSecondaryText: {
    fontSize: 12,
  },
  educationList: {
    gap: 4,
  },
  educationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
  },
  passButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    color: '#6b7280',
    width: 64,
    textAlign: 'center',
  },
  profileCountText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
  },
  noProfilesText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfilesTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  noProfilesSubtitle: {
    color: '#6b7280',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
