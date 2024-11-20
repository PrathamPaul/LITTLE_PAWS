// import React from 'react';
// import { Heart, User, ChevronDown } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const PetPage = () => {
//   const petInfo = {
//     name: "Twixy",
//     location: "Manikonda2",
//     description: "She is a very active, healthy & alert puppy looking for a loving home. If you looking to adopt her, then you can visit Blue Cross of Hyderabad Shelter and take her home on the last Sunday of the month (24th Aug 2023).",
//     details: {
//       type: "Dog",
//       gender: "Female",
//       breed: "Indie",
//       age: "3",
//       shelter: "Blue Cross Of Hyderabad",
//     },
//     relatedPets: [
//       { name: "Lilly", location: "Manikonda1", type: "Puppy ~0 to 5month~" },
//       { name: "Lara", location: "Amaravathi5", type: "Puppy ~0 to 5month~" },
//       { name: "Rini", location: "Amaravathi5", type: "Puppy ~0 to 5month~" }
//     ]
//   };

//   return (
//     <div>
//         <nav className="bg-indigo-900 text-white p-4 shadow-lg">
//         <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">🐾 LilPaws</Link>
//           <div className="flex items-center gap-6">
//           <Link to="/search" className="hover:text-gray-200 font-semibold">Continue Search</Link>
//             <Heart className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
//             <User className="w-6 h-6 hover:text-indigo-200 cursor-pointer" />
//           </div>
//         </div>
//       </nav>
    
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        
//       <img 
//         src="/api/placeholder/400/300"
//         alt="Pet for adoption"
//         className="w-full h-64 object-cover rounded-lg mb-4"
//       />
      
//       <h1 className="text-2xl font-bold mb-1">
//         {petInfo.name} <span className="text-indigo-400">({petInfo.location})</span>
//       </h1>
      
//       <p className="text-gray-700 mb-6">{petInfo.description}</p>
      
//       <div className="space-y-3 mb-8">
//         {Object.entries(petInfo.details).map(([key, value]) => (
//           <div key={key} className="flex border-b border-gray-200 pb-2">
//             <span className="w-32 font-medium text-indigo-400 capitalize">
//               {key}:
//             </span>
//             <span className="text-gray-700">{value}</span>
//           </div>
//         ))}
//       </div>

//       <div class="flex items-center justify-center w-full">
//         <button className="bg-indigo-900 text-white px-8 py-3 rounded-full hover:bg-indigo-500 font-semibold transition-colors">
//         <Link to="/form" className="text-xl font-semibold">ADOPT ME !!</Link>
//         </button>
//         </div>

      
//       <div>
//         <h2 className="text-xl font-bold mb-4 text-indigo-400">Related Pets</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {petInfo.relatedPets.map((pet, index) => (
//             <div key={index} className="p-4 border rounded-lg">
//               <img 
//                 src="/api/placeholder/200/150"
//                 alt={`Related pet ${pet.name}`}
//                 className="w-full h-32 object-cover rounded mb-2"
//               />
//               <h3 className="font-medium">{pet.name} ({pet.location})</h3>
//               <p className="text-sm text-gray-600">{pet.type}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default PetPage;
import React, { useEffect, useState } from 'react';
import { Heart, User, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const PetPage = () => {
  
  const [petInfo, setPetInfo] = useState(null);
  const { petId } = useParams(); // Retrieve the petId from the URL params

  useEffect(() => {
    // Fetch pet data using the petId from the URL
    const fetchPetData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${petId}`); // Assuming your backend is set up with the appropriate route
        setPetInfo(response.data); // Set pet data into state
      } catch (error) {
        console.error('Error fetching pet data:', error);
      }
    };

    fetchPetData();
  }, [petId]);

  const [pets, setPet] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [count, setCount] = useState(3);
  const [isInitialFetch, setIsInitialFetch] = useState(true); 

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pets/'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const pets = await response.json();
        if (isInitialFetch) {
          const shuffledPets = pets.sort(() => 0.5 - Math.random()).slice(0, count);
          setPet(shuffledPets); 
          setIsInitialFetch(false); 
        } else {
          const nextPets = pets.slice(0, count);
          setPet(nextPets); // Set the pets based on count
        }
        
      } catch (error) {
        setError(error); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); // Call the fetch function
    // const slicedPets = pets.slice(0, count);
    // setPet(slicedPets);

  }, [count,isInitialFetch]);

  // useEffect(() => {
  //   const slicedPets = pets.slice(0, count);
  //   setPet(slicedPets); 
  // }, [count, pets]); // Trigger when count or pets changes
  

  if (!petInfo) {
    return <div>Loading...</div>; // Display a loading message until petInfo is fetched
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }
  
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
      {/* <pre>{JSON.stringify(petInfo, null, 2)}</pre> */}

    
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        <img 
          src={petInfo.pictures[0]} // Updated to use the first image in the pictures array
          alt="Pet for adoption"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <h1 className="text-2xl font-bold mb-1">
          {petInfo.name} <span className="text-indigo-400">({petInfo.region})</span>
        </h1>
        
        <p className="text-gray-700 mb-6">{petInfo.description}</p>
        
        <div className="space-y-3 mb-8">
          <div className="flex border-b border-gray-200 pb-2">
            <span className="w-32 font-medium text-indigo-400 capitalize">
              Type:
            </span>
            <span className="text-gray-700">{petInfo.type}</span>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <span className="w-32 font-medium text-indigo-400 capitalize">
              Breed:
            </span>
            <span className="text-gray-700">{petInfo.breed}</span>
          </div>
          <div className="flex border-b border-gray-200 pb-2">
            <span className="w-32 font-medium text-indigo-400 capitalize">
              Age:
            </span>
            <span className="text-gray-700">{petInfo.age}</span>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <button className="bg-indigo-900 text-white px-8 py-3 rounded-full hover:bg-indigo-500 font-semibold transition-colors">
            <Link to="/form" className="text-xl font-semibold">ADOPT ME !!</Link>
          </button>
        </div>
        {/* <pre>{JSON.stringify(pets, null, 2)}</pre> */}

        <div>
          <h2 className="text-xl font-bold mb-4 text-indigo-400">Related Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(pets) && pets.length > 0 ? (
            pets.map((pet, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <img 
                  src= {pet.pictures?.[0] ||'/api/placeholder/200/150'}
                  alt={`${pet.name}`}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-medium">{pet.name} ({pet.region})</h3>
                <p className="text-sm text-gray-600">{pet.type}</p>
              </div>
            ))
          ) : (
            <p>No related pets found.</p>
          )}
          </div>
          <div className="text-center mt-10">
            <button
              className="bg-white textindigo-900 px-6 py-3 rounded-full border-2 border-indigo-900 hover:bg-indigo-700 hover:text-white font-semibold transition-colors"
              onClick={handleIncrement}
            >
              Show more pets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
