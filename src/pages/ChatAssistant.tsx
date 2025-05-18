import React from 'react';
import Layout from '../components/layout/Layout';
import ChatInterface from '../components/chat/ChatInterface';
import { Card, CardContent } from '../components/ui/Card';

const ChatAssistant: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ask questions and get help with crime reporting and safety information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Suggested Questions
                </h2>
                <ul className="space-y-3">
                  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    How do I report a theft?
                  </li>
                  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    What information should I include in my report?
                  </li>
                  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    How does the verification process work?
                  </li>
                  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    Can I report anonymously?
                  </li>
                  <li className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
                    How long does it take for my report to be reviewed?
                  </li>
                </ul>
                
                <h2 className="text-lg font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
                  About the Assistant
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our AI assistant is powered by advanced language models and trained on crime reporting best practices. 
                  It can help you navigate the platform, provide guidance on reporting different types of crimes, 
                  and answer general safety questions.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  The assistant does not have access to your personal information or specific case details 
                  unless you explicitly share them in the conversation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatAssistant;