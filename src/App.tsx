import React from 'react';
import Router from './router';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CrimeReportProvider } from './context/CrimeReportContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CrimeReportProvider>
          <ChatProvider>
            <Router />
          </ChatProvider>
        </CrimeReportProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;