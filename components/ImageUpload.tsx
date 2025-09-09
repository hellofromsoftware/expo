import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function ImageUpload({ currentImage, onImageChange, userName }) {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Permission to access the media library is needed to upload an image.');
      return;
    }

    setUploading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // This can be useful for profile pictures
      aspect: [1, 1], // Enforce a square aspect ratio
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      // You can add validation here for file size if needed,
      // but Expo will handle basic checks.
      onImageChange(selectedImage.uri);
    }

    setUploading(false);
  };

  const handleRemoveImage = () => {
    onImageChange(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Picture</Text>

      <View style={styles.contentWrapper}>
        {/* Avatar Preview */}
        <View style={styles.avatarContainer}>
          {currentImage ? (
            <Image
              source={{ uri: currentImage }}
              style={styles.avatarImage}
            />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarText}>
                {getInitials(userName)}
              </Text>
            </View>
          )}

          {currentImage && (
            <TouchableOpacity style={styles.removeButton} onPress={handleRemoveImage}>
              <Text style={styles.removeButtonText}>x</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Upload Area */}
        <TouchableOpacity
          style={styles.uploadCard}
          onPress={pickImage}
          disabled={uploading}
        >
          <View style={styles.uploadContent}>
            <View style={styles.iconContainer}>
              {uploading ? (
                <ActivityIndicator size="large" color="#007bff" />
              ) : (
                <Text style={styles.iconText}>📷</Text>
              )}
            </View>

            <View style={styles.uploadTextContainer}>
              <Text style={styles.uploadTitle}>
                {uploading ? 'Uploading...' : 'Upload Profile Picture'}
              </Text>
              <Text style={styles.uploadSubtitle}>
                Tap to select
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={styles.descriptionText}>
        A clear profile picture helps {userName.split(' ')[0] || 'users'} recognize you and builds trust.
        Make sure your face is clearly visible and the image is well-lit.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatarText: {
    fontSize: 24,
    color: '#334155',
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#dc3545',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  uploadCard: {
    flex: 1,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  uploadContent: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  uploadTextContainer: {
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  uploadSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  descriptionText: {
    fontSize: 12,
    color: '#64748b',
  },
});
