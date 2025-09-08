import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useState, useCallback } from 'react';

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);

  const onSend = useCallback((newMessages = []) => {
    setMessages(prev => GiftedChat.append(prev, newMessages));
  }, []);

  return <GiftedChat messages={messages} onSend={onSend} user={{ _id: 1 }} />;
}
