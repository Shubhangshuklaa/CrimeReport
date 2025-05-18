import React, { createContext, useContext, useState } from 'react';
import { CrimeReport, CrimeType, Location, ReportStatus, VerificationStatus } from '../types';

interface CrimeReportContextType {
  reports: CrimeReport[];
  addReport: (report: Omit<CrimeReport, 'id' | 'reportedAt' | 'status'>) => void;
  updateReportStatus: (id: string, status: ReportStatus) => void;
  updateVerificationStatus: (id: string, status: VerificationStatus, reason?: string) => void;
  getReportById: (id: string) => CrimeReport | undefined;
}

const CrimeReportContext = createContext<CrimeReportContextType | undefined>(undefined);

// Mock initial data
const INITIAL_REPORTS: CrimeReport[] = [
  {
    id: '1',
    title: 'Smartphone theft at Central Park',
    description: 'My phone was stolen while I was jogging in Central Park around 8 AM.',
    location: {
      address: 'Central Park, New York, NY',
      latitude: 40.785091,
      longitude: -73.968285,
    },
    type: 'theft',
    status: 'investigating',
    images: ['https://images.pexels.com/photos/1493102/pexels-photo-1493102.jpeg'],
    reportedBy: '1',
    reportedAt: '2025-01-15T08:30:00Z',
    verificationStatus: 'verified',
    verificationReason: 'Multiple similar reports in the area',
  },
  {
    id: '2',
    title: 'Vandalism at Main Street',
    description: 'A group of teenagers were seen vandalizing the storefront at 123 Main St.',
    location: {
      address: '123 Main St, Boston, MA',
      latitude: 42.361145,
      longitude: -71.057083,
    },
    type: 'vandalism',
    status: 'pending',
    images: ['https://images.pexels.com/photos/9533519/pexels-photo-9533519.jpeg'],
    reportedBy: '1',
    reportedAt: '2025-01-16T15:45:00Z',
    verificationStatus: 'pending',
  },
  {
    id: '3',
    title: 'Car break-in on Washington Ave',
    description: 'My car window was smashed and some items were stolen from inside.',
    location: {
      address: '456 Washington Ave, Seattle, WA',
      latitude: 47.608013,
      longitude: -122.335167,
    },
    type: 'burglary',
    status: 'investigating',
    images: ['https://images.pexels.com/photos/5598283/pexels-photo-5598283.jpeg'],
    reportedBy: '1',
    reportedAt: '2025-01-14T22:10:00Z',
    verificationStatus: 'verified',
    verificationReason: 'Security camera footage confirms the incident',
  },
  {
    id: '4',
    title: 'Online fraud attempt',
    description: 'I received an email claiming to be from my bank but it was a phishing attempt.',
    location: {
      address: 'Online',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    type: 'fraud',
    status: 'pending',
    images: ['https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg'],
    reportedBy: '1',
    reportedAt: '2025-01-17T09:20:00Z',
    verificationStatus: 'pending',
  },
];

export const CrimeReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<CrimeReport[]>(INITIAL_REPORTS);

  const addReport = (report: Omit<CrimeReport, 'id' | 'reportedAt' | 'status'>) => {
    const newReport: CrimeReport = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      reportedAt: new Date().toISOString(),
      status: 'pending',
    };
    
    setReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (id: string, status: ReportStatus) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id ? { ...report, status } : report
      )
    );
  };

  const updateVerificationStatus = (id: string, status: VerificationStatus, reason?: string) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id ? { 
          ...report, 
          verificationStatus: status,
          verificationReason: reason || report.verificationReason
        } : report
      )
    );
  };

  const getReportById = (id: string) => {
    return reports.find(report => report.id === id);
  };

  return (
    <CrimeReportContext.Provider
      value={{
        reports,
        addReport,
        updateReportStatus,
        updateVerificationStatus,
        getReportById,
      }}
    >
      {children}
    </CrimeReportContext.Provider>
  );
};

export const useCrimeReports = () => {
  const context = useContext(CrimeReportContext);
  if (context === undefined) {
    throw new Error('useCrimeReports must be used within a CrimeReportProvider');
  }
  return context;
};