import { getInitials } from '@/components/ui/utils'; // Assuming a utility file for this function
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// Define your types for User and ChatMessage
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'tutor' | 'student';
  avatar?: string;
  hourlyRate?: number;
}

interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

// Mock data for the current user and the matched user
const MOCK_CURRENT_USER: User = {
  id: 'current-user-123',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  userType: 'student',
};

const MOCK_MATCHED_USER: User = {
  id: 'matched-user-456',
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@example.com',
  userType: 'tutor',
  hourlyRate: 45,
};

export default function ChatScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const { profileId } = useLocalSearchParams();

  // State to hold messages and the new message text
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Use a mock user for now, you will need to load this from storage
  const currentUser = MOCK_CURRENT_USER;
  const matchedUser = MOCK_MATCHED_USER;

  // Initialize with some mock messages
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: '1',
        senderId: matchedUser.id,
        message: `Hi ${currentUser.name}! Thanks for connecting. I'd love to help you with your studies.`,
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: '2',
        senderId: currentUser.id,
        message: 'Hi! Thank you for reaching out. I\'m really looking forward to working with you.',
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      },
    ];
    setMessages(mockMessages);
  }, []);

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    // Timeout to ensure the list has rendered before we scroll
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        message: newMessage.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage('');

      // Simulate a response after a delay
      setTimeout(() => {
        const responses = [
          'That sounds great! When would be a good time for our first session?',
          'I\'d be happy to help with that. What specific areas are you struggling with?',
          'Perfect! I have some great resources that should help.',
          'Absolutely! I think we can definitely work on that together.',
          'Great question! Let me explain that concept in detail during our session.',
        ];

        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: matchedUser.id,
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, response]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return messageDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <View style={styles.avatar}>
            {matchedUser.avatar ? (
              <Image source={{ uri: matchedUser.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>
                  {getInitials(matchedUser.name)}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.name}>{matchedUser.name}</Text>
            <View style={styles.badgeContainer}>
              <View style={[styles.badge, matchedUser.userType === 'tutor' ? styles.badgeTutor : styles.badgeStudent]}>
                <Text style={styles.badgeText}>{matchedUser.userType === 'tutor' ? 'Tutor' : 'Student'}</Text>
              </View>
              {matchedUser.userType === 'tutor' && matchedUser.hourlyRate && (
                <Text style={styles.hourlyRateText}>£{matchedUser.hourlyRate}/hr</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="call-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="videocam-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Messages */}
      <ScrollView ref={scrollViewRef} style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === currentUser.id;
          const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

          return (
            <View key={message.id}>
              {showDate && (
                <View style={styles.dateBadgeContainer}>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateBadgeText}>{formatDate(message.timestamp)}</Text>
                  </View>
                </View>
              )}
              <View style={[styles.messageRow, isOwnMessage ? styles.messageRowRight : styles.messageRowLeft]}>
                <View style={[styles.messageBubbleContainer, isOwnMessage ? styles.bubbleRight : styles.bubbleLeft]}>
                  <View style={[styles.messageBubble, isOwnMessage ? styles.bubblePrimary : styles.bubbleSecondary]}>
                    <Text style={isOwnMessage ? styles.messageTextPrimary : styles.messageTextSecondary}>{message.message}</Text>
                  </View>
                  <Text style={[styles.messageTime, isOwnMessage ? styles.timeRight : styles.timeLeft]}>
                    {formatTime(message.timestamp)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSendMessage}
        />
        <Pressable
          style={[styles.sendButton, { opacity: newMessage.trim() ? 1 : 0.5 }]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Feather name="send" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 2,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeTutor: {
    backgroundColor: '#2563eb',
  },
  badgeStudent: {
    backgroundColor: '#e5e7eb',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  hourlyRateText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    padding: 5,
    marginLeft: 10,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateBadge: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateBadgeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
    maxWidth: '80%',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  messageBubbleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bubbleLeft: {
    alignItems: 'flex-start',
  },
  bubbleRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  bubblePrimary: {
    backgroundColor: '#4f46e5',
    borderTopRightRadius: 2,
  },
  bubbleSecondary: {
    backgroundColor: '#e5e7eb',
    borderTopLeftRadius: 2,
  },
  messageTextPrimary: {
    color: 'white',
  },
  messageTextSecondary: {
    color: 'black',
  },
  messageTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  timeRight: {
    textAlign: 'right',
  },
  timeLeft: {
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
