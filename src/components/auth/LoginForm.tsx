import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin' | 'police'>('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, role);
      // Redirect after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      let errorMessage = 'Failed to login. Please check your credentials.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, auto-fill credentials based on role
  const fillDemoCredentials = (selectedRole: 'user' | 'admin' | 'police') => {
    setRole(selectedRole);
    
    if (selectedRole === 'user') {
      setEmail('user@example.com');
    } else if (selectedRole === 'admin') {
      setEmail('admin@example.com');
    } else {
      setEmail('police@example.com');
    }
    setPassword('password');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Account Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              role === 'user'
                ? 'bg-blue-800 text-white dark:bg-blue-700'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => fillDemoCredentials('user')}
          >
            User
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              role === 'admin'
                ? 'bg-blue-800 text-white dark:bg-blue-700'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => fillDemoCredentials('admin')}
          >
            Admin
          </button>
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              role === 'police'
                ? 'bg-blue-800 text-white dark:bg-blue-700'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => fillDemoCredentials('police')}
          >
            Police
          </button>
        </div>
      </div>
      
      <Input
        label="Email"
        type="email"
        icon={<Mail size={18} />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.email@example.com"
        required
      />
      
      <Input
        label="Password"
        type="password"
        icon={<Lock size={18} />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-800 rounded border-gray-300 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </div>
        
        <a
          href="#"
          className="text-sm font-medium text-blue-800 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
        >
          Forgot password?
        </a>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
      >
        Sign in
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
        <a
          href="/register"
          className="font-medium text-blue-800 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
        >
          Sign up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;