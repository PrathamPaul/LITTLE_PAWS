import React from 'react';
import { Heart, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const PetPage = () => {
  const petInfo = {
    name: "Twixy",
    location: "Manikonda2",
    description: "She is a very active, healthy & alert puppy looking for a loving home. If you looking to adopt her, then you can visit Blue Cross of Hyderabad Shelter and take her home on the last Sunday of the month (24th Aug 2023).",
    details: {
      type: "Puppy ~0 to 5month~",
      gender: "Female",
      breed: "Indie",
      neutered: "Yes",
      age: "3",
      shelter: "Blue Cross Of Hyderabad",
      deworming: "First deworming completed"
    },
    relatedPets: [
      { name: "Lilly", location: "Manikonda1", type: "Puppy ~0 to 5month~" },
      { name: "Lara", location: "Amaravathi5", type: "Puppy ~0 to 5month~" },
      { name: "Rini", location: "Amaravathi5", type: "Puppy ~0 to 5month~" }
    ]
  };

  return (
    <div>
        <nav className="bg-indigo-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">🐾 LilPaws</Link>
          <div className="flex items-center gap-6">
          <Link to="/search" className="hover:text-gray-200 font-semibold">Continue Search</Link>
            <Heart className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
            <User className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
          </div>
        </div>
      </nav>
    
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        
      <img 
        src="/api/placeholder/400/300"
        alt="Pet for adoption"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      
      <h1 className="text-2xl font-bold mb-1">
        {petInfo.name} <span className="text-indigo-400">({petInfo.location})</span>
      </h1>
      
      <p className="text-gray-700 mb-6">{petInfo.description}</p>
      
      <div className="space-y-3 mb-8">
        {Object.entries(petInfo.details).map(([key, value]) => (
          <div key={key} className="flex border-b border-gray-200 pb-2">
            <span className="w-32 font-medium text-indigo-400 capitalize">
              {key}:
            </span>
            <span className="text-gray-700">{value}</span>
          </div>
        ))}
      </div>

      <div class="flex items-center justify-center w-full">
        <button className="bg-indigo-900 text-white px-8 py-3 rounded-full hover:bg-indigo-500 font-semibold transition-colors">
        <Link to="/form" className="text-xl font-semibold">ADOPT ME !!</Link>
        </button>
        </div>

      
      <div>
        <h2 className="text-xl font-bold mb-4 text-indigo-400">Related Pets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {petInfo.relatedPets.map((pet, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <img 
                src="/api/placeholder/200/150"
                alt={`Related pet ${pet.name}`}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="font-medium">{pet.name} ({pet.location})</h3>
              <p className="text-sm text-gray-600">{pet.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PetPage;