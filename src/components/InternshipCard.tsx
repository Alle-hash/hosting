import { useState } from 'react';
import type { Internship } from '../types';
import toast from 'react-hot-toast';

interface Props {
  internship: Internship;
}

export default function InternshipCard({ internship }: Props) {
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    setApplying(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Application sent successfully!');
    setApplying(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
          <p className="text-gray-600">{internship.company}</p>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {internship.compatibilityScore}% Match
        </div>
      </div>
      
      <p className="mt-2 text-gray-700">{internship.description}</p>
      
      <div className="mt-4">
        <h4 className="font-semibold text-gray-900">Requirements:</h4>
        <ul className="list-disc list-inside text-gray-700">
          {internship.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-600">{internship.location}</span>
        <button
          onClick={handleApply}
          disabled={applying}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {applying ? 'Sending...' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}