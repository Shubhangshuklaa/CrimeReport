import React from 'react';
import Layout from '../components/layout/Layout';
import CrimeMap from '../components/map/CrimeMap';

const CrimeMapPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Crime Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive map showing reported crime incidents in your area.
          </p>
        </div>
        
        <CrimeMap />
      </div>
    </Layout>
  );
};

export default CrimeMapPage;