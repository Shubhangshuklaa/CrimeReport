import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin' | 'police'>('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      await register(name, email, password, role);
      // Redirect after successful registration
      window.location.href = '/dashboard';
    } catch (error) {
      let errorMessage = 'Failed to register. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md text-sm dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      <Input
        label="Full Name"
        type="text"
        icon={<User size={18} />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        required
      />
      
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
        placeholder="Create a password"
        required
      />
      
      <Input
        label="Confirm Password"
        type="password"
        icon={<Lock size={18} />}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
      />
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Register as
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              role === 'user'
                ? 'bg-blue-800 text-white dark:bg-blue-700'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setRole('user')}
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
            onClick={() => setRole('admin')}
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
            onClick={() => setRole('police')}
          >
            Police
          </button>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-blue-800 rounded border-gray-300 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          I agree to the{' '}
          <a
            href="#"
            className="font-medium text-blue-800 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="font-medium text-blue-800 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Privacy Policy
          </a>
        </label>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
      >
        Create Account
      </Button>
      
      <div className="text-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
        <a
          href="/login"
          className="font-medium text-blue-800 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
        >
          Sign in
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;