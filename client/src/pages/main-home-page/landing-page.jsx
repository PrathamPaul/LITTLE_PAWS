import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, HandHeart, Users ,User, UserCog, LogOut, HandHelping, CheckCircle2, Share2 } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import PetCard from '@/components/main-search/PetCard';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Landingpage = () => {
  const [pets, setPet] = useState(null);
  const [error, setError] = useState(null);
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth);
  const linkPath = user?.role === 'seller' ? "/admin/products" : "/shop/home";
  const [activeSection, setActiveSection] = useState('mission');
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://little-paws-api2.vercel.app/api/pets/'); 
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

const handleLogout = async () => {
  try {
    const { data } = await axios.post("https://little-paws-api.vercel.app/api/auth/logout", {}, { withCredentials: true });

    alert(data.message); // "Logged out successfully!"
    // Redirect user to login page or clear user state
    window.location.href = "/";
  } catch (error) {
    console.error("Error logging out:", error);
    alert(error.response?.data?.message || "An error occurred. Please try again.");
  }
};


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
          <Link to="/" className="text-white hover:text-indigo-400 transition-colors">Home</Link>
          <Link to="/search" className="text-white hover:text-indigo-400 transition-colors">Pets</Link>
          <Link to={linkPath} className="text-white hover:text-indigo-400 transition-colors">
          Ecommerce
          </Link>
          <Link to="/reportStray" className="text-white hover:text-indigo-400 transition-colors">Report Stray</Link>
          <Link to="/aboutUs" className="text-white hover:text-indigo-400 transition-colors">About Us</Link>
          {/* <Link to="/auth/login" className="text-white hover:text-indigo-400 transition-colors">Login</Link> */}
          {isAuthenticated ? (
  <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-indigo-900 mt-[-9px] ml-[9px]">
          <AvatarFallback className="bg-indigo-900 text-white font-extrabold">
            {user?.userName[0].toUpperCase()} 
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === "shelterAdmin" ? (
          <DropdownMenuItem onClick={() => navigate("/admin/panel")}>
            <UserCog className="mr-2 h-4 w-4" />
            <Link to="/shelterAdmin">Admin Panel</Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => navigate("/applicationStatus")}>
            <UserCog className="mr-2 h-4 w-4" />
            <Link to="/applicationStatus">Application Status</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
) : (
  <div>
    <a href="/auth/login" className="mr-4 text-white hover:text-indigo-400 transition-colors">
      Login
    </a>
    <a href="/auth/register" className="text-white hover:text-indigo-400 transition-colors">
      Register
    </a>
  </div>
)}

          
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
          <Link to="/search" className="text-white hover:text-indigo-400 transition-colors">
          <button className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-full transition-colors mb-16">
            Let's Adopt
          </button>
          </Link>
          </div>

          {/* Action Cards */}
          <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/search">
            <div className="m-5 p-16 bg-white rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="p-3 bg-indigo-300 rounded-full text-indigo-900 mb-4">
                <Heart className="w-16 h-16" />
              </div>
              <p className="font-medium text-indigo-900">Adopt a pet</p>
            </div>
            </Link>
            <Link to="/aboutUs">
            <div className="m-5 p-16 bg-white rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="p-3 bg-indigo-300 rounded-full text-indigo-900 mb-4">
                <Users className="w-16 h-16" />
              </div>
              <p className="font-medium text-indigo-900">About us</p>
            </div>
            </Link>

            <div className="m-5 p-16 bg-white rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="p-3 bg-indigo-300 rounded-full text-indigo-900 mb-4">
                <HandHeart className="w-16 h-16" />
              </div>
              <p className="font-medium text-indigo-900">Donate for them</p>
            </div>
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
            {pets.map((pet, index) => (
              // <div
              //   key={pet._id}
              //   className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              // >
              //   <div className="aspect-[3/2] overflow-hidden">
              //     <img
              //       src={""}
              //       alt={pet.name}
              //       className="w-full h-full object-cover"
              //     />
              //   </div>
              //   <div className="p-4">
              //     <h3 className="text-gray-800 text-center font-medium">
              //       {pet.name}
              //     </h3>
              //   </div>
              // </div>
              <PetCard key={index} pet={pet} />
            ))}
          </div>
          
      </div>
      

      <section className="max-w-7xl mx-auto relative z-20 bg-white rounded-xl shadow-lg p-12 mt-60">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8 space-x-4">
              {['mission', 'values', 'approach'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-6 py-3 rounded-full transition ${
                    activeSection === section 
                      ? 'bg-indigo-700 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            {activeSection === 'mission' && (
              <div className="text-center">
                <HandHelping className="mx-auto text-red-500 mb-6" size={64} />
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl text-gray-700">
                  To rescue, rehabilitate, and rehome stray and abandoned animals, ensuring they receive the love and care they deserve. We simplify the adoption process while promoting responsible pet ownership.
                </p>
              </div>
            )}

            {activeSection === 'values' && (
              <div className="text-center">
                <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
                <h3 className="text-3xl font-bold mb-6">Our Core Values</h3>
                <ul className="text-xl text-gray-700 space-y-4">
                  <li>Compassion for all living beings</li>
                  <li>Commitment to animal welfare</li>
                  <li>Transparency in our operations</li>
                  <li>Community engagement and education</li>
                </ul>
              </div>
            )}

            {activeSection === 'approach' && (
              <div className="text-center">
                <Share2 className="mx-auto text-blue-500 mb-6" size={64} />
                <h3 className="text-3xl font-bold mb-6">Our Approach</h3>
                <p className="text-xl text-gray-700">
                  We collaborate with shelters, foster homes, and animal welfare organizations to find the perfect match between pets and adopters. Our comprehensive support ensures successful, lifelong connections.
                </p>
              </div>
            )}
          </div>
        </section>
      
        <div className="relative z-20 text-white py-16 text-center mt-40">
        <h2 className="text-4xl font-bold mb-6">Make a Difference Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Whether you adopt, volunteer, or donate, your support creates lasting change in an animal's life.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-indigo-800 hover:bg-gray-100 font-bold py-3 px-8 rounded-full">
            Adopt Now
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-red-500 font-bold py-3 px-8 rounded-full">
            Support Us
          </button>
        </div>
      </div>

      












      <div className="relative z-10" >
      <div className="bg-indigo-700 h-20 z-10 mt-40" ></div>
      <footer className="bg-indigo-900 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Little Paws Section */}
          <div>
            <h3 className="text-indigo-200 font-semibold text-lg mb-4">Little Paws</h3>
            <ul className="space-y-2">
              <li>Home</li>
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-indigo-200 font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Grooming</li>
              <li>Publishing</li>
              <li>Solutions</li>
            </ul>
          </div>

          {/* Events Section */}
          <div>
            <h3 className="text-indigo-200 font-semibold text-lg mb-4">Events</h3>
            <ul className="space-y-2">
              <li>CNW</li>
              <li>Game Jams</li>
            </ul>
          </div>

          {/* Follow Section */}
          <div>
            <h3 className="text-indigo-300 font-semibold text-lg mb-4 ">Follow</h3>
            <ul className="space-y-2">
              <li>🐦 Twitter</li>
              <li>📘 Facebook</li>
              <li>📸 Instagram</li>
              <li>🔗 LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-600 mt-8 pt-4 text-center text-sm">
          <p className="mb-2">Terms & Conditions | Privacy Policy | Sitemap</p>
          <p>© 2024 Little Paws. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
    </div>
    </div>
  );
};

export default Landingpage;