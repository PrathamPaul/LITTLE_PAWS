import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, HandHeart, Users } from 'lucide-react';
import axios from 'axios';

const Landingpage = () => {
  const [pets, setPet] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pets/'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedPets = await response.json();
        const shuffledPets = fetchedPets.sort(() => 0.5 - Math.random()).slice(0, 6);
        setPet(shuffledPets); 
          
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData(); 

  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!pets) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="relative h-auto bg-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.pinimg.com/564x/ec/2c/3b/ec2c3b671df9dd4a28513f823b71333f.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 pt-20">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-16">
          <Link to="/" className="text-white text-2xl font-bold">🐾 LilPaws</Link>
          <div className="flex gap-6">
          <Link to="/main" className="text-white hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/search" className="text-white hover:text-yellow-400 transition-colors">Pets</Link>
          <Link to="/ecommerce" className="text-white hover:text-yellow-400 transition-colors">Ecommerce</Link>
          <Link to="/reportStray" className="text-white hover:text-yellow-400 transition-colors">Report Stray</Link>
          <Link to="/help" className="text-white hover:text-yellow-400 transition-colors">Help</Link>
          <Link to="/about" className="text-white hover:text-yellow-400 transition-colors">About Us</Link>
          <Link to="/contact" className="text-white hover:text-yellow-400 transition-colors">Contact</Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
            Find your pet
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            In our shelter there are several pets who wait only for you. They need a loving family and a real home. Come and meet your future friend - maybe they already love you!In our shelter there are several pets who wait only for you. They need a loving family and a real home. Come and meet your future friend - maybe they already love you!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors mb-16">
            Let's Adopt
          </button>
          </div>

          {/* Action Cards */}
          <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="w-16 h-16" />, text: "Adopt a pet" },
              { icon: <Users className="w-16 h-16" />, text: "Be a volunteer" },
              { icon: <HandHeart className="w-16 h-16 " />, text: "Donate for them" }
            ].map((card, index) => (
              <div 
                key={index}
                className="m-5 p-16 bg-white rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <div className="p-3 bg-red-100 rounded-full text-red-600 mb-4">
                  {card.icon}
                </div>
                <p className="font-medium text-gray-800">{card.text}</p>
                
              </div>
              
            ))}
          </div>
          <div className="text-center mt-[20vh] mb-[15vh]">
            <h2 className="text-6xl font-semibold text-white mb-4">
              Who are waiting for You?
            </h2>
            <p className="text-3xl text-white mb-12">
              If you want to know more about a pet, just click on its box.
            </p>
          </div>

          {/* Pet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-[7.5vh] mb-8">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={""}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 text-center font-medium">
                    {pet.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        
      </div>
      
    </div>
  );
};

export default Landingpage;