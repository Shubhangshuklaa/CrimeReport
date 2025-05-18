import React, { useState, useEffect } from 'react';
import { Map as MapIcon, Filter, List, Search } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCrimeReports } from '../../context/CrimeReportContext';
import { CrimeReport, CrimeType, ReportStatus } from '../../types';

interface FilterOptions {
  types: CrimeType[];
  statuses: ReportStatus[];
  timeRange: 'all' | 'day' | 'week' | 'month';
}

const CrimeMap: React.FC = () => {
  const { reports } = useCrimeReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState<CrimeReport | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    types: [],
    statuses: [],
    timeRange: 'all',
  });
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    // Search query filter
    if (
      searchQuery &&
      !report.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !report.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !report.location.address.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(report.type)) {
      return false;
    }

    // Status filter
    if (filters.statuses.length > 0 && !filters.statuses.includes(report.status)) {
      return false;
    }

    // Time range filter
    if (filters.timeRange !== 'all') {
      const reportDate = new Date(report.reportedAt);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));

      if (filters.timeRange === 'day' && daysDiff > 1) return false;
      if (filters.timeRange === 'week' && daysDiff > 7) return false;
      if (filters.timeRange === 'month' && daysDiff > 30) return false;
    }

    return true;
  });

  // Sort reports by date, newest first
  const sortedReports = [...filteredReports].sort(
    (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
  );

  const handleToggleFilter = (type: CrimeType) => {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleToggleStatus = (status: ReportStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  };

  const handleTimeRangeChange = (timeRange: FilterOptions['timeRange']) => {
    setFilters((prev) => ({
      ...prev,
      timeRange,
    }));
  };

  // Placeholder for map/location display
  const MapPlaceholder = () => (
    <div className="relative w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 h-[500px] flex items-center justify-center">
      <div className="text-center p-4">
        <MapIcon className="h-10 w-10 text-gray-500 dark:text-gray-400 mx-auto mb-2" />
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Interactive Crime Map</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Map API would display crime incidents here
        </p>
        {selectedReport && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-4/5 max-w-md">
            <h4 className="font-bold truncate">{selectedReport.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{selectedReport.location.address}</p>
            <div className="flex justify-between mt-2">
              <span className={`px-2 py-1 text-xs rounded-full capitalize ${getCrimeTypeBadgeColor(selectedReport.type)}`}>
                {selectedReport.type}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadgeColor(selectedReport.status)}`}>
                {selectedReport.status}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Pins on the map */}
      {sortedReports.map((report, index) => {
        // Generate random positions for demo purposes
        const left = 20 + (index * 50) % 60;
        const top = 30 + (index * 30) % 40;
        
        return (
          <div 
            key={report.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:z-10"
            style={{ left: `${left}%`, top: `${top}%` }}
            onClick={() => setSelectedReport(report)}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPinColor(report)}`}>
              <span className="animate-ping absolute w-6 h-6 rounded-full opacity-75 bg-red-500"></span>
              <span className="relative text-xs font-bold text-white">{index + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Helper function to determine pin color based on crime type and status
  const getPinColor = (report: CrimeReport) => {
    if (report.status === 'resolved') return 'bg-green-600';
    if (report.status === 'dismissed') return 'bg-gray-600';
    
    switch (report.type) {
      case 'assault':
        return 'bg-red-600';
      case 'theft':
        return 'bg-orange-600';
      case 'burglary':
        return 'bg-yellow-600';
      case 'vandalism':
        return 'bg-blue-600';
      case 'fraud':
        return 'bg-purple-600';
      case 'harassment':
        return 'bg-pink-600';
      default:
        return 'bg-gray-600';
    }
  };

  // Helper function to get badge color for crime type
  const getCrimeTypeBadgeColor = (type: CrimeType) => {
    switch (type) {
      case 'assault':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'theft':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'burglary':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'vandalism':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'fraud':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'harassment':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Helper function to get badge color for status
  const getStatusBadgeColor = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search by title, description, or location..."
            icon={<Search size={18} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            Filters
          </Button>
          
          <div className="flex rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 ${
                viewMode === 'map'
                  ? 'bg-blue-800 text-white dark:bg-blue-700'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <MapIcon size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 ${
                viewMode === 'list'
                  ? 'bg-blue-800 text-white dark:bg-blue-700'
                  : 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium mb-2">Crime Type</h3>
                <div className="space-y-1">
                  {crimeTypes.map((crimeType) => (
                    <label key={crimeType.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(crimeType.value)}
                        onChange={() => handleToggleFilter(crimeType.value)}
                        className="mr-2 h-4 w-4 text-blue-800 rounded border-gray-300 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="text-sm">{crimeType.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Status</h3>
                <div className="space-y-1">
                  {(['pending', 'investigating', 'resolved', 'dismissed'] as ReportStatus[]).map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.statuses.includes(status)}
                        onChange={() => handleToggleStatus(status)}
                        className="mr-2 h-4 w-4 text-blue-800 rounded border-gray-300 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="text-sm capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Time Range</h3>
                <div className="space-y-1">
                  {[
                    { value: 'all', label: 'All Time' },
                    { value: 'day', label: 'Past 24 Hours' },
                    { value: 'week', label: 'Past Week' },
                    { value: 'month', label: 'Past Month' },
                  ].map((timeRange) => (
                    <label key={timeRange.value} className="flex items-center">
                      <input
                        type="radio"
                        checked={filters.timeRange === timeRange.value}
                        onChange={() => handleTimeRangeChange(timeRange.value as any)}
                        className="mr-2 h-4 w-4 text-blue-800 border-gray-300 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800"
                      />
                      <span className="text-sm">{timeRange.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setFilters({ types: [], statuses: [], timeRange: 'all' })}
                className="mr-2"
              >
                Reset
              </Button>
              <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {viewMode === 'map' ? (
        <MapPlaceholder />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedReports.length > 0 ? (
            sortedReports.map((report) => (
              <Card key={report.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {report.images.length > 0 && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={report.images[0]}
                      alt={report.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg truncate">{report.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{report.location.address}</p>
                  <p className="text-sm line-clamp-2 mb-3">{report.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getCrimeTypeBadgeColor(report.type)}`}>
                      {report.type}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadgeColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Reported {new Date(report.reportedAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
              No crime reports found matching your filters
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrimeMap;