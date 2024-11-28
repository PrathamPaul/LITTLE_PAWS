import React, { useState, useEffect } from 'react';
import { Search, LogOut, Check, X } from 'lucide-react';
import ApplicationDetails from '@/components/main-adoption-form-card/MainAdoptionFormCard';
import axios from 'axios';

const MainAdminPanel = () => {
 const [applications, setApplications] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
    const fetchData = async () => {
      try {
        // Set the cookie manually (if needed)
        document.cookie = "myCookieName=myCookieValue; Path=/;";
  
        const response = await axios.get('http://localhost:5000/api/shelterAdmin/applications', {
          withCredentials: true, // Include cookies and credentials in the request
        });
  
        setApplications(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
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
  const handleLogout = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
  
      alert(data.message); // "Logged out successfully!"
      // Redirect user to login page or clear user state
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };


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
            <button 
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {/* <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r pt-16">
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
      </div> */}
      
      <div className="ml-64 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Applications :</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* {applications.map((app, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
            >
              
              <ApplicationDetails app={app} />

            </div>
          ))} */}
          {applications.applications && applications.applications.length > 0 ? (
            applications.applications
              .filter(app => app.status === "pending") // Filter for "pending" applications
              .map((app, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
                >
                  <ApplicationDetails app={app} />
                </div>
              ))
          ) : (
            <p className="text-gray-500">No applications available.</p>
          )}


        </div>
        {/* <pre>{JSON.stringify(applications, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default MainAdminPanel;