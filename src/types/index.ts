// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'police';
  image?: string;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Crime report types
export interface CrimeReport {
  id: string;
  title: string;
  description: string;
  location: Location;
  type: CrimeType;
  status: ReportStatus;
  images: string[];
  reportedBy: string;
  reportedAt: string;
  verificationStatus?: VerificationStatus;
  verificationReason?: string;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
}

export type CrimeType = 
  | 'theft' 
  | 'assault' 
  | 'burglary' 
  | 'vandalism' 
  | 'fraud' 
  | 'harassment' 
  | 'other';

export type ReportStatus = 
  | 'pending' 
  | 'investigating' 
  | 'resolved' 
  | 'dismissed';

export type VerificationStatus = 
  | 'pending' 
  | 'verified' 
  | 'fake';

// Chat types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}