import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

// Mock advertisements - in a real app, these would come from an ad service
const MOCK_ADS = [
  {
    id: '1',
    title: 'Master Any Subject with Premium Tutors',
    description: 'Get personalized 1-on-1 lessons with our top-rated tutors. First lesson free!',
    imageUrl: 'https://images.unsplash.com/photo-1641683521844-700c456379bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc1NjgxOTU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    actionText: 'Start Learning',
    actionUrl: '#',
    sponsor: 'TutorConnect Premium',
    type: 'premium',
    backgroundColor: '#3b82f6', // Corresponds to blue-500
  },
  {
    id: '2',
    title: 'Learn Piano Online - 50% Off',
    description: 'Professional piano lessons with certified instructors. All skill levels welcome.',
    imageUrl: 'https://images.unsplash.com/photo-1575314113965-c6672a42b99c?crop=entropy&cs=tinysrgb&fit=max&fm-jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWFubyUyMG11c2ljJTIwbGVzc29ucyUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzU2ODM2MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    actionText: 'Claim Offer',
    actionUrl: '#',
    sponsor: 'MusicMaster Academy',
    type: 'standard'
  },
  {
    id: '3',
    title: 'Boost Your GCSE Scores',
    description: 'Expert tutoring for GCSE Maths, English, and Sciences. Proven results guaranteed.',
    imageUrl: 'https://images.unsplash.com/photo-1731983568664-9c1d8a87e7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGV4YW0lMjBwcmVwYXJhdGlvbiUyMHN0dWR5fGVufDF8fHx8MTc1NjgzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    actionText: 'Get Started',
    actionUrl: '#',
    sponsor: 'ExamSuccess Tutoring',
    type: 'standard'
  },
  {
    id: '4',
    title: 'Language Learning Revolution',
    description: 'Speak fluently in 3 months with our AI-powered language tutoring platform.',
    imageUrl: 'https://images.unsplash.com/photo-1570616969692-54d6ba3d0397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsYW5ndWFnZSUyMGxlYXJuaW5nJTIwY29udmVyc2F0aW9ufGVufDF8fHx8MTc1Njc5MTEwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    actionText: 'Try Free',
    actionUrl: '#',
    sponsor: 'LinguaAI',
    type: 'premium',
    backgroundColor: '#10b981', // Corresponds to green-500
  },
];

export default function AdvertisementBanner() {
  const [currentAd, setCurrentAd] = useState(MOCK_ADS[0]);
  const [isVisible, setIsVisible] = useState(true);

  // Rotate ads every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd(prev => {
        const currentIndex = MOCK_ADS.findIndex(ad => ad.id === prev.id);
        const nextIndex = (currentIndex + 1) % MOCK_ADS.length;
        return MOCK_ADS[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAdClick = () => {
    // In a real app, this would track ad clicks and redirect
    console.log('Ad clicked:', currentAd.title);
    Linking.openURL(currentAd.actionUrl);
  };

  const handleCloseAd = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: currentAd.backgroundColor || '#2563eb' }]}
      onPress={handleAdClick}
      activeOpacity={0.8}
    >
      <View style={styles.contentContainer}>
        {/* Close button */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseAd}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        {/* Premium badge */}
        {currentAd.type === 'premium' && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>⭐ Premium</Text>
          </View>
        )}

        <View style={styles.innerContent}>
          {/* Ad Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: currentAd.imageUrl }}
              style={styles.adImage}
              resizeMode="cover"
            />
          </View>

          {/* Ad Content */}
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.titleText}>
              {currentAd.title}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
              {currentAd.description}
            </Text>
            <View style={styles.callToActionContainer}>
              <Text style={styles.sponsorText}>
                {currentAd.sponsor}
              </Text>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleAdClick}
              >
                <Text style={styles.actionButtonText}>
                  {currentAd.actionText} 🔗
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sponsored label */}
        <View style={styles.sponsoredLabel}>
          <Text style={styles.sponsoredLabelText}>Sponsored</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 32, // Adjust width based on screen size for padding
    minHeight: 120,
    borderRadius: 12,
    marginVertical: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 1,
    backgroundColor: '#f59e0b',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  premiumBadgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  callToActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sponsorText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  sponsoredLabel: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sponsoredLabelText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
});
