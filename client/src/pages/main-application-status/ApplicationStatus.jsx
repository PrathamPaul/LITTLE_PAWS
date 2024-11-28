import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import axios from "axios";

const ApplicationStatus = () => {
  const [adoptionStatus, setAdoptionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptionStatus = async () => {
      try {
        
        const response = await axios.get("http://localhost:5000/api/user/adoption-status", {
            withCredentials: true, // Ensures cookies are sent with the request
          });
        // setAdoptionStatus(response?.data?.applications[0]?.status);
        setAdoptionStatus(response?.data?.applications[0]?.status);
        //console.log(response);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
      }
    };
    

    fetchAdoptionStatus();
    
  }, []);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500 w-12 h-12" />;
      case 'approved':
        return <CheckCircle className="text-green-500 w-12 h-12" />;
      case 'rejected':
        return <AlertCircle className="text-red-500 w-12 h-12" />;
      default:
        return null;
    }
  };

  const statusMessages = {
    pending: "Your adoption application is currently under review.",
    approved: "Congratulations! Your adoption application has been approved.",
    rejected: "We're sorry, but your adoption application was not approved at this time."
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }
  const statusConfigs = {
    pending: {
      icon: <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-6" />,
      bgClass: 'bg-yellow-50 border-yellow-200',
      textClass: 'text-yellow-800',
      title: 'Pending Review',
      message: 'We appreciate your patience. Our team is carefully reviewing your application.',
    },
    approved: {
      icon: <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />,
      bgClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-800',
      title: 'Application Approved',
      message: 'Congratulations! Your adoption application has been approved.',
    },
    rejected: {
      icon: <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />,
      bgClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-800',
      title: 'Application Rejected',
      message: 'We regret to inform you that your application was not approved at this time.',
    }
  };
  const config = statusConfigs[adoptionStatus] || statusConfigs.pending;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className={`
        w-full max-w-lg mx-auto 
        rounded-2xl shadow-2xl overflow-hidden
        transform transition-all duration-300 hover:scale-105
        ${config.bgClass} border-2
      `}>
        <div className="p-8 text-center">
          {config.icon}
          
          <h1 className={`
            text-4xl font-extrabold mb-6 
            ${config.textClass} tracking-tight
          `}>
            {config.title}
          </h1>
          
          <p className={`
            text-xl mb-8 
            ${config.textClass} opacity-80
          `}>
            {config.message}
          </p>
          
          {adoptionStatus === 'pending' && (
            <div className="bg-white/70 rounded-xl p-6 shadow-inner">
              <p className="text-gray-700 italic">
                Our team is working diligently to process your application. 
                We'll update you as soon as possible.
              </p>
            </div>
          )}
          
          {adoptionStatus === 'approved' && (
            <div className="bg-white/70 rounded-xl p-6 shadow-inner">
              <p className="text-gray-700">
                Get ready to welcome your new family member! 
                Our team will contact you with next steps shortly.
              </p>
            </div>
          )}
          
          {adoptionStatus === 'rejected' && (
            <div className="bg-white/70 rounded-xl p-6 shadow-inner">
              <p className="text-gray-700">
                We understand this may be disappointing. 
                Our team is available to provide further guidance.
              </p>
            </div>
          )}
          
          {/* Optional: Debug information */}
          {/* <div className="mt-6 text-sm text-gray-500 opacity-50">
            <pre className="bg-white/30 rounded p-2 text-xs overflow-x-auto">
              {JSON.stringify(adoptionStatus, null, 2)}
            </pre>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;