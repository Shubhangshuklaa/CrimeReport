import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReportCrime from './pages/ReportCrime';
import CrimeMapPage from './pages/CrimeMapPage';
import ChatAssistant from './pages/ChatAssistant';
import MyReports from './pages/MyReports';
import { useAuth } from './context/AuthContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Show loading state
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: '/report',
      element: (
        <ProtectedRoute>
          <ReportCrime />
        </ProtectedRoute>
      ),
    },
    {
      path: '/map',
      element: (
        <ProtectedRoute>
          <CrimeMapPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/chat',
      element: (
        <ProtectedRoute>
          <ChatAssistant />
        </ProtectedRoute>
      ),
    },
    {
      path: '/my-reports',
      element: (
        <ProtectedRoute>
          <MyReports />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;