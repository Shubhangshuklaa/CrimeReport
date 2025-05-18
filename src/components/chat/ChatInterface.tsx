import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import Button from '../ui/Button';

const ChatInterface: React.FC = () => {
  const { messages, addMessage } = useChat();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(message.trim(), 'user');
      setMessage('');
      // Focus input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md h-[500px] overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Bot className="w-6 h-6 text-blue-800 dark:text-blue-600 mr-2" />
        <div>
          <h3 className="font-medium text-gray-800 dark:text-white">CrimeGuard Assistant</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">AI-powered help for crime reporting</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-800 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-white'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <div
                className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <Button type="submit" disabled={!message.trim()}>
            <Send size={18} />
          </Button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Type your questions about crime reporting or using CrimeGuard.
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;