import React from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import ReportTable from '../components/dashboard/ReportTable';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { 
  BarChart4, 
  FileText, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { useCrimeReports } from '../context/CrimeReportContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { reports } = useCrimeReports();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'police';

  // Getting stats
  const totalReports = reports.length;
  const pendingReports = reports.filter(r => r.status === 'pending').length;
  const resolvedReports = reports.filter(r => r.status === 'resolved').length;
  const verifiedReports = reports.filter(r => r.verificationStatus === 'verified').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          <Button
            onClick={() => window.location.href = '/report'}
            leftIcon={<AlertTriangle size={16} />}
          >
            Report Crime
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Reports"
            value={totalReports}
            icon={<FileText size={20} />}
            change={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pending Reports"
            value={pendingReports}
            icon={<Clock size={20} />}
            change={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Resolved"
            value={resolvedReports}
            icon={<CheckCircle size={20} />}
            change={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Verified Reports"
            value={verifiedReports}
            icon={<BarChart4 size={20} />}
            change={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Reports
                  </h2>
                  <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16} />}>
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ReportTable 
                  reports={reports.slice(0, 5)} 
                  isAdmin={isAdmin} 
                />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader className="pb-0">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Crime Hotspots
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Downtown</span>
                      <span className="text-sm font-medium">32 reports</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-800 dark:bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">West Side</span>
                      <span className="text-sm font-medium">24 reports</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-800 dark:bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Central Park</span>
                      <span className="text-sm font-medium">18 reports</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-800 dark:bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">East End</span>
                      <span className="text-sm font-medium">12 reports</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-blue-800 dark:bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => window.location.href = '/map'}
                  >
                    View Full Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;