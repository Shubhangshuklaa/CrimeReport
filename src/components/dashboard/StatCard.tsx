import React from 'react';
import { Card, CardContent } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  className = '',
}) => {
  return (
    <Card className={`shadow-sm transition-all duration-200 hover:shadow-md ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{value}</p>
            
            {change && (
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs font-medium ${
                    change.isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {change.isPositive ? '+' : '-'}{Math.abs(change.value)}%
                </span>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">vs last period</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{description}</p>
            )}
          </div>
          
          <div className="p-3 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;