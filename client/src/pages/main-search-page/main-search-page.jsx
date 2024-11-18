import React from 'react';
import { Heart, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PetCard from '@/components/main-search/PetCard';

const MainSearchPage = () => {
  const pets = [
    { name: 'Sugar', type: 'Kitten', breed: 'American Shorthair', distance: '7 miles away', image: '/api/placeholder/300/300' },
    { name: 'Saffron', type: 'Kitten', breed: 'American Shorthair', distance: '7 miles away', image: '/api/placeholder/300/300' },
    { name: 'Autumn', type: 'Kitten', breed: 'American Shorthair', distance: '7 miles away', image: '/api/placeholder/300/300' },
    { name: 'Blossom', type: 'Kitten', breed: 'American Shorthair', distance: '7 miles away', image: '/api/placeholder/300/300' },
  ];

  const filters = [
    { name: 'BREED', options: ['Any'] },
    { name: 'AGE', options: ['Any'] },
    { name: 'SIZE', options: ['Any'] },
    { name: 'GENDER', options: ['Any'] },
    { name: 'GOOD WITH', options: ['Any'] },
  ];
  const Animals = [
    'Dog',
    'Cat',
    'Bird',
    'Rodents',
    'Rabbits',
    'Miscellaneous',
  ];
  const City = [
    'Chandigarh',
    'Mohali',
    'Panchkula',
  ];
  

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-indigo-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🐾 LilPaws</Link>
          <div className="flex items-center gap-6">
            <button className="hover:text-gray-200 font-semibold">ALL ABOUT PETS</button>
            <Heart className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
            <User className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="bg-indigo-800 text-white p-6 shadow-md">
        <div className="container mx-auto flex items-center gap-6">
          
            <select className=" p-3 font-bold rounded bg-indigo-800 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors">
              {Animals.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            
          
            <select className="p-3 font-bold rounded bg-indigo-800 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors">
              {City.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          
          <button className="ml-auto bg-white text-indigo-900 px-6 py-2 rounded-full hover:bg-indigo-100 font-semibold transition-colors">
            SAVE SEARCH
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-64 bg-white p-4 rounded-lg shadow-md">
            {filters.map((filter) => (
              <div key={filter.name} className="mb-6">
                <h3 className="text-sm font-bold text-indigo-900 mb-2">{filter.name}</h3>
                <div className="relative">
                  <select className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors">
                    {filter.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
                </div>
              </div>
            ))}
          </div>



          {/* Pet Grid */}
          <div className="flex-1">
            <div className="flex justify-end mb-6">
              <div className="relative w-48">
                <select className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors">
                  <option>Nearest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet, index) => (
              <PetCard key={index} pet={pet} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSearchPage;