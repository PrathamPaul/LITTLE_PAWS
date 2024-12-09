import React, { useEffect, useState } from 'react';
import { Heart, User, ChevronDown, FishOff, UserCog, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import PetCard from '@/components/main-search/PetCard';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MainNavbar from '@/components/main-navbar/MainNavbar';

const MainSearchPage = () => {

  const [pets, setPet] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [breed, setBreed] = useState("Any"); 
  const [city, setCity] = useState("All");
  const [filteredPets, setFilteredPets] = useState([]);
  const [animal, setAnimal] = useState("All"); 
  const [age, setAge] = useState("Any"); 
  const [sort, setSort] = useState("Any"); 
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
  
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  

  const handleBreedChange = (e) => {

    setBreed(e.target.value);
  };

  const handleCityChange = (e) => {
      setCity(e.target.value);
  };

  const handleAnimalChange = (e) => {
    const selectedAnimal = e.target.value;
    setAnimal(selectedAnimal);
    setBreed("Any"); // Reset breed whenever the animal changes
  };

  const handleSortChange = (e) => {
    //console.log(e.target.value);
    setSort(e.target.value);
};
  

  useEffect(() => {
    if (pets) {
        let filtered = pets;

        // Filter by Breed
        if (animal !== "All") {
            filtered = filtered.filter((pet) => pet.type === animal);
            console.log("After Animal Filter:", filtered);
        }
        if (breed !== "Any") {
            filtered = filtered.filter((pet) => pet.breed === breed);
        }

        // Filter by City
        if (city !== "All") {
            filtered = filtered.filter((pet) => pet.region === city);
        }

        if (age === "1 - 4") {
          filtered = filtered.filter((pet) => pet.age >= 1 && pet.age <= 4);
        }
        else if(age === "4 - 8"){
          filtered = filtered.filter((pet) => pet.age >= 4 && pet.age <= 8);
        }
        else if(age === "8 - 12"){
          filtered = filtered.filter((pet) => pet.age >= 8 && pet.age <= 12);
        }
        else if(age === "12 - 16"){
          filtered = filtered.filter((pet) => pet.age >= 12 && pet.age <= 16);
        }
        else if(age === "16 - 20"){
          filtered = filtered.filter((pet) => pet.age >= 16 && pet.age <= 20);
        }
        // if(sort==="Any"){
        //   console.log(sort);
        //   filtered= pets.sort(() => 0.5 - Math.random());
        // }
        // else if (sort === "A - Z") {
        //   console.log(sort);
        //   filtered = pets.sort((a, b) => a.name.localeCompare(b.name));
        // } else if (sort === "Z - A") {
        //   console.log(sort);
        //   filtered = pets.sort((a, b) => b.name.localeCompare(a.name));
        // }

        setFilteredPets(filtered); // Update filteredPets
    }
}, [pets, breed, city,age,animal,sort]);



  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://little-paws-api2.vercel.app/api/pets/'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const allpets = await response.json();
        const pets = allpets.sort(() => 0.5 - Math.random());
        // const pets = shuffledPets.slice(0, 3);
        // const pets = selectedPets;

        setPet(pets);
        setFilteredPets(pets);
      } catch (error) {
        setError(error); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); // Call the fetch function

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  const Animals = [
    'All',
    'Dog',
    'Cat',
    'Bird',
    'Hamster',
    'Rabbit',
  ];
  const City = [
    'All',
    'Chandigarh',
    'Mohali',
    'Panchkula',
  ];
  const handleLogout = async () => {
    try {
      const { data } = await axios.post("https://little-paws-api2.vercel.app/api/auth/logout", {}, { withCredentials: true });
  
      alert(data.message); // "Logged out successfully!"
      // Redirect user to login page or clear user state
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navigation Bar */}
      {/* <nav className="bg-indigo-900 text-white p-4 shadow-lg ">
        <div className="container mx-auto flex justify-between items-center mt-3">
        <Link to="/" className="text-2xl font-bold mt-[-6px]">🐾 LilPaws</Link>
          <div className="flex items-center gap-6">
            
            
          </div>
          
          <div className="flex gap-6">
          <Link to="/" className="text-white hover:text-indigo-400 transition-colors">Home</Link>
          <Link to="/search" className="text-white hover:text-indigo-400 transition-colors">Pets</Link>
          <Link to="/ecommerce" className="text-white hover:text-indigo-400 transition-colors">Ecommerce</Link>
          <Link to="/reportStray" className="text-white hover:text-indigo-400 transition-colors">Report Stray</Link>
          <Link to="/aboutUs" className="text-white hover:text-indigo-400 transition-colors">About Us</Link>
          {isAuthenticated ? (
                <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="bg-white mt-[-8px] ml-[9px]">
                      <AvatarFallback className="bg-white text-indigo-800 font-extrabold">
                        {user?.userName[0].toUpperCase()} 
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                      <UserCog className="mr-2 h-4 w-4" />
                      <Link to="/applicationStatus" >Application Status</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </>
            ) : (<div>
                <a href="/auth/login" className="mr-4 text-white hover:text-indigo-400 transition-colors">Login</a>
                <a href="/auth/login" className="text-white hover:text-indigo-400 transition-colors">Register</a>
                </div>
            )}
          
          </div>
        </div>
      </nav> */}
      <MainNavbar/>
      

      {/* Search Bar */}
      <div className="bg-indigo-800 text-white p-6 shadow-md">
        <div className="container mx-auto flex items-center gap-6">
          
            <select 
              className=" p-3 font-bold rounded bg-indigo-800 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              onChange={handleAnimalChange}
              value={animal}
              >
              {Animals.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
          
            <select 
              className="p-3 font-bold rounded bg-indigo-800 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
              onChange={handleCityChange}
              value={city}
              >
              {City.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-64 bg-white p-4 rounded-lg shadow-md">
            {/* Breed Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-indigo-900 mb-2">BREED</h3>
              <div className="relative">
                <select
                  className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  onChange={handleBreedChange}
                  value={breed}
                >
                  <option>Any</option>
                  {/* Dynamically change breed options based on the selected animal */}
                  {animal === 'Dog' && (
                    <>
                      <option>Golden Retriever</option>
                      <option>Boxer</option>
                      <option>Labrador Retriever</option>
                      <option>French Bulldog</option>
                      {/* Add more dog breeds as needed */}
                    </>
                  )}
                  
                  {animal === 'Cat' && (
                    <>
                      <option>Siamese</option>
                      <option>Persian</option>
                      <option>Maine Coon</option>
                      <option>Ragdoll</option>
                      {/* Add more cat breeds as needed */}
                    </>
                  )}
                  
                  {animal === 'Bird' && (
                    <>
                      <option>Parrot</option>
                      <option>Canary</option>
                      <option>Finch</option>
                      <option>Budgerigar</option>
                      {/* Add more bird breeds as needed */}
                    </>
                  )}
                  
                  {animal === 'Hamster' && (
                    <>
                      <option>Syrian</option>
                      <option>Dwarf</option>
                      <option>Roborovski</option>
                      {/* Add more hamster breeds as needed */}
                    </>
                  )}
                  
                  {animal === 'Rabbit' && (
                    <>
                      <option>Himalayan</option>
                      <option>Mini Rex</option>
                      <option>Holland Lop</option>
                      {/* Add more rabbit breeds as needed */}
                    </>
                  )}

                  {/* Option for all breeds (if the animal type is set to Any) */}
                  {animal === 'Any' && (
                    <>
                      <option>Any Breed</option>
                    </>
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
              </div>
            </div>

      {/* Age Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-indigo-900 mb-2">AGE</h3>
        <div className="relative">
          <select
            className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
            onChange={handleAgeChange}
            value={age}
          >
            <option>Any</option>
            <option>1 - 4</option>
            <option>4 - 8</option>
            <option>8 - 12</option>
            {/* <option>12 - 16</option> */}
            
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
        </div>
      </div>

      {/* Sort Filter */}
      {/* <div className="mb-6">
        <h3 className="text-sm font-bold text-indigo-900 mb-2">SORT</h3>
        <div className="relative">
          <select
            className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
            onChange={handleSortChange}
            value={sort}
          >
            <option>Any</option>
            <option>A - Z</option>
            <option>Z - A</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
        </div>
      </div> */}

      
      {/* <div className="mb-6">
        <h3 className="text-sm font-bold text-indigo-900 mb-2">GENDER</h3>
        <div className="relative">
          <select
            className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
          >
            <option>Any</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
        </div>
      </div> */}

      {/* <div className="mb-6">
        <h3 className="text-sm font-bold text-indigo-900 mb-2">GOOD WITH</h3>
        <div className="relative">
          <select
            className="w-full p-3 border border-indigo-200 rounded appearance-none bg-white hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
          >
            <option>Any</option>
            <option>Dogs</option>
            <option>Cats</option>
            <option>Children</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600" />
        </div>
      </div> */}
    </div>



          {/* Pet Grid */}
          <div className="flex-1">
            <div className="flex justify-end mb-6">
              
            </div>
            {/* <pre>{JSON.stringify(filteredPets, null, 2)}</pre> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.length > 0 ? (
                filteredPets.map((pet, index) => (
                  <PetCard key={index} pet={pet} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-12">
                  <div className="flex justify-center items-center mb-4">
                    <FishOff className="w-20 h-20 text-indigo-700" />
                  </div>
                  <p className="text-2xl font-bold text-gray-700">No Pets Found</p>
                  <p className="mt-2 text-lg">Try adjusting your filters to explore more options!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSearchPage;