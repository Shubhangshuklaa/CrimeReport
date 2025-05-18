import React from 'react';
import Layout from '../components/layout/Layout';
import ReportTable from '../components/dashboard/ReportTable';
import { useCrimeReports } from '../context/CrimeReportContext';
import { useAuth } from '../context/AuthContext';

const MyReports: React.FC = () => {
  const { reports } = useCrimeReports();
  const { user } = useAuth();

  // Filter reports for the current user
  const userReports = reports.filter(report => report.reportedBy === user?.id);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage all your submitted crime reports.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {userReports.length > 0 ? (
            <ReportTable reports={userReports} />
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No reports found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't submitted any crime reports yet.
              </p>
              <a
                href="/report"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Report a Crime
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyReports;