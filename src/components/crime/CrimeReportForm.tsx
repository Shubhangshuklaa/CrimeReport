import React, { useState } from 'react';
import { MapPin, Camera, FileText, AlertTriangle } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useCrimeReports } from '../../context/CrimeReportContext';
import { CrimeType } from '../../types';

const crimeTypes: { value: CrimeType; label: string }[] = [
  { value: 'theft', label: 'Theft' },
  { value: 'assault', label: 'Assault' },
  { value: 'burglary', label: 'Burglary' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'other', label: 'Other' },
];

const CrimeReportForm: React.FC = () => {
  const { addReport } = useCrimeReports();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<CrimeType>('theft');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, we would use geocoding here to get lat/lng from address
      const mockLocation = {
        address,
        latitude: 40.7128, // Example coordinates (New York)
        longitude: -74.0060,
      };

      await addReport({
        title,
        description,
        type,
        location: mockLocation,
        images,
        reportedBy: '1', // In a real app, this would be the current user's ID
      });

      // Reset form
      setTitle('');
      setDescription('');
      setType('theft');
      setAddress('');
      setImages([]);
      setIsSuccess(true);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      // In a real app, we would upload the file to a server
      // For demo purposes, we'll just add a placeholder URL
      const mockImageUrls = [
        'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
        'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
        'https://images.pexels.com/photos/33870/pexels-photo.jpg',
      ];
      const randomIndex = Math.floor(Math.random() * mockImageUrls.length);
      setImages([...images, mockImageUrls[randomIndex]]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSuccess && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md text-sm dark:bg-green-900/20 dark:text-green-400">
          Your report has been submitted successfully. Our team will review it soon.
        </div>
      )}

      <Input
        label="Report Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Brief title of the incident"
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Crime Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as CrimeType)}
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 
            text-gray-900 focus:border-blue-500 focus:outline-none 
            focus:ring-1 focus:ring-blue-500 sm:text-sm
            dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          required
        >
          {crimeTypes.map((crimeType) => (
            <option key={crimeType.value} value={crimeType.value}>
              {crimeType.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 
            text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none 
            focus:ring-1 focus:ring-blue-500 sm:text-sm
            dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          placeholder="Provide detailed information about what happened"
          required
        />
      </div>

      <Input
        label="Location"
        icon={<MapPin size={18} />}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter the address where the incident occurred"
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Evidence Photos
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`Evidence ${index + 1}`} 
                className="h-24 w-24 object-cover rounded-md" 
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          <label className="h-24 w-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer dark:border-gray-600 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-500">
            <Camera size={20} />
            <span className="mt-1 text-xs">Add Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Upload photos of the incident (if available). Max 5MB per image.
        </p>
      </div>

      <div className="bg-yellow-50 p-4 rounded-md flex space-x-3 dark:bg-yellow-900/20">
        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
        <div className="text-sm text-yellow-700 dark:text-yellow-400">
          <p className="font-medium">Important Notice</p>
          <p className="mt-1">
            Filing a false report is a serious offense. Please ensure that all information provided is accurate and truthful.
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="confirm"
          name="confirm"
          type="checkbox"
          className="h-4 w-4 text-blue-800 rounded border-gray-300 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-800"
          required
        />
        <label htmlFor="confirm" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          I confirm that the information provided is true and accurate to the best of my knowledge.
        </label>
      </div>

      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          fullWidth
        >
          Cancel
        </Button>
        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
        >
          Submit Report
        </Button>
      </div>
    </form>
  );
};

export default CrimeReportForm;