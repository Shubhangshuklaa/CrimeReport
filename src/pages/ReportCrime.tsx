import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import CrimeReportForm from '../components/crime/CrimeReportForm';
import { AlertTriangle } from 'lucide-react';

const ReportCrime: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Report a Crime
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Please provide accurate information about the incident you wish to report.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-600 dark:border-yellow-500 p-4 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">Important Notice</h3>
              <div className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  For emergencies or crimes in progress, please call your local emergency number immediately.
                  This platform is for non-emergency reporting only.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Crime Report Form
            </h2>
          </CardHeader>
          <CardContent>
            <CrimeReportForm />
          </CardContent>
        </Card>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">What happens after you report?</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li>Your report is submitted securely to our system</li>
            <li>Our AI system analyzes the report for verification</li>
            <li>Local authorities are notified about verified reports</li>
            <li>You receive updates as your report status changes</li>
            <li>You can check the status of your report in the "My Reports" section</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default ReportCrime;