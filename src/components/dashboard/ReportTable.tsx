import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MoreHorizontal, Check, X, ClipboardList } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { CrimeReport } from '../../types';

interface ReportTableProps {
  reports: CrimeReport[];
  isAdmin?: boolean;
}

const ReportTable: React.FC<ReportTableProps> = ({ reports, isAdmin = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof CrimeReport>('reportedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  // Filter reports based on search term
  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortField === 'reportedAt') {
      return sortDirection === 'asc'
        ? new Date(a.reportedAt).getTime() - new Date(b.reportedAt).getTime()
        : new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
    }
    
    // For other fields (assuming string values)
    const aValue = a[sortField] as unknown as string;
    const bValue = b[sortField] as unknown as string;
    
    return sortDirection === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
  
  const handleSort = (field: keyof CrimeReport) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to desc
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const renderSortIcon = (field: keyof CrimeReport) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
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
        return 'bg-gray-100 text-gray-500 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  // Get verification status badge color
  const getVerificationColor = (status?: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'fake':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };
  
  // Get type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theft':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'assault':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'burglary':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'vandalism':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'fraud':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'harassment':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-full max-w-xs">
          <Input
            placeholder="Search reports..."
            icon={<Search size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          {isAdmin && (
            <Button variant="outline" size="sm">
              Export
            </Button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto relative shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs bg-gray-50 dark:bg-gray-800 uppercase">
            <tr>
              <th className="px-6 py-3">
                <button
                  onClick={() => handleSort('title')}
                  className="font-medium text-gray-600 dark:text-gray-300 flex items-center"
                >
                  Title {renderSortIcon('title')}
                </button>
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => handleSort('type')}
                  className="font-medium text-gray-600 dark:text-gray-300 flex items-center"
                >
                  Type {renderSortIcon('type')}
                </button>
              </th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">
                <button
                  onClick={() => handleSort('reportedAt')}
                  className="font-medium text-gray-600 dark:text-gray-300 flex items-center"
                >
                  Date {renderSortIcon('reportedAt')}
                </button>
              </th>
              <th className="px-6 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="font-medium text-gray-600 dark:text-gray-300 flex items-center"
                >
                  Status {renderSortIcon('status')}
                </button>
              </th>
              {isAdmin && (
                <th className="px-6 py-3">
                  <button
                    onClick={() => handleSort('verificationStatus')}
                    className="font-medium text-gray-600 dark:text-gray-300 flex items-center"
                  >
                    Verification {renderSortIcon('verificationStatus')}
                  </button>
                </th>
              )}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.length > 0 ? (
              sortedReports.map((report) => (
                <>
                  <tr 
                    key={report.id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                  >
                    <td className="px-6 py-4 font-medium">
                      {report.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate">
                      {report.location.address}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(report.reportedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full capitalize ${getVerificationColor(report.verificationStatus)}`}>
                          {report.verificationStatus || 'pending'}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            // View details logic
                          }}
                        >
                          <ClipboardList className="w-4 h-4 text-blue-800 dark:text-blue-500" />
                        </button>
                        {isAdmin && (
                          <>
                            <button 
                              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Verify report logic
                              }}
                            >
                              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </button>
                            <button 
                              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Mark as fake logic
                              }}
                            >
                              <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </>
                        )}
                        <button 
                          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            // More options logic
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Details row */}
                  {selectedReport === report.id && (
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <td colSpan={isAdmin ? 7 : 6} className="px-6 py-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium">Description</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {report.description}
                            </p>
                          </div>
                          
                          {report.images && report.images.length > 0 && (
                            <div>
                              <h4 className="font-medium">Images</h4>
                              <div className="flex mt-2 space-x-2">
                                {report.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Evidence ${index + 1}`}
                                    className="h-20 w-20 object-cover rounded-md"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {isAdmin && report.verificationStatus === 'verified' && report.verificationReason && (
                            <div>
                              <h4 className="font-medium">Verification Reason</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {report.verificationReason}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-end space-x-2 pt-2">
                            {isAdmin ? (
                              <>
                                <Button size="sm" variant="outline">
                                  Assign to Officer
                                </Button>
                                <Button size="sm">
                                  Update Status
                                </Button>
                              </>
                            ) : (
                              <Button size="sm">
                                View Full Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No reports found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedReports.length} of {reports.length} reports
        </p>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled={true}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={true}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;