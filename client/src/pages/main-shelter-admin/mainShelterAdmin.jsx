import React, { useState, useEffect } from 'react';
import { Search, LogOut, Check, X } from 'lucide-react';
import ApplicationDetails from '@/components/main-adoption-form-card/MainAdoptionFormCard';

const MainAdminPanel = () => {
 const [applications, setApplications] = useState(null);
   const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shelterAdmin/applications'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const applicationfetched = await response.json();
        setApplications(applicationfetched); 
          
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData(); 

  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!applications) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

//   const applications = [
//     {
//       id: '1234567890',
//       pet: 'Teddy',
//       age: '1 yr',
//       type: 'bird - finch',
//       location: 'chandigarh',
//       requestedBy: 'Jasmine'
//     },
//     {
//       id: '1234567890',
//       pet: 'Teddy',
//       age: '1 yr',
//       type: 'bird - finch',
//       location: 'chandigarh',
//       requestedBy: 'Jasmine'
//     },
//     {
//       id: '1234567890',
//       pet: 'Teddy',
//       age: '1 yr',
//       type: 'bird - finch',
//       location: 'chandigarh',
//       requestedBy: 'Jasmine'
//     },
//     {
//       id: '1234567890',
//       pet: 'Teddy',
//       age: '1 yr',
//       type: 'bird - finch',
//       location: 'chandigarh',
//       requestedBy: 'Jasmine'
//     }
//   ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-indigo-600">Admin Panel</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded transition-colors duration-200">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r pt-16">
        <div className="px-4 py-2">
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded bg-indigo-50 text-indigo-600 font-medium transition-colors duration-200">
              Dashboard
            </button>
            <button className="w-full text-left px-4 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors duration-200">
              Products
            </button>
            <button className="w-full text-left px-4 py-2 rounded text-gray-600 hover:bg-gray-50 transition-colors duration-200">
              Orders
            </button>
          </div>
        </div>
      </div>
      
      <div className="ml-64 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Applications :</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {applications.map((app, index) => (
    <div 
      key={index} 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
    >
      {/* Render the ApplicationDetails component for each application */}
      <ApplicationDetails app={app} />

      <div className="flex space-x-5 mt-4">
        <button 
          className="flex-1 py-2 rounded bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
        >
          <Check className="w-5 h-5" />
        </button>
        <button 
          className="flex-1 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  ))}
</div>
        {/* <pre>{JSON.stringify(applications, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default MainAdminPanel;