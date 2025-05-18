import React, { createContext, useContext, useState } from 'react';
import { ChatMessage } from '../types';

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock initial messages
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    content: 'Hello! I\'m your CrimeGuard assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date().toISOString(),
  },
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      sender,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMessage]);

    // If user sends a message, simulate a bot response
    if (sender === 'user') {
      setTimeout(() => {
        const botResponses = [
          "I understand you want to report a crime. You can use our 'Report Crime' feature from the main dashboard.",
          "To check the status of your report, visit the 'My Reports' section in your profile.",
          "For emergencies, please call your local emergency number immediately instead of using this platform.",
          "You can upload photo evidence when reporting a crime to help with verification.",
          "Our AI system will analyze your report to verify its accuracy based on similar reports and patterns.",
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        addMessage(randomResponse, 'bot');
      }, 1500);
    }
  };

  const clearMessages = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};