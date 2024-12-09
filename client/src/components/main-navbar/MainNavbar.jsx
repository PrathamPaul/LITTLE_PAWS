import React, { useEffect, useState } from 'react';
import { Heart, User, ChevronDown, FishOff, UserCog, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';


const MainNavbar = () => {

 
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
  const linkPath = user?.role === 'seller' ? "/admin/products" : "/shop/home";
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
      
      <nav className="bg-indigo-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center mt-3">
        <Link to="/" className="text-2xl font-bold mt-[-6px]">🐾 LilPaws</Link>
          <div className="flex items-center gap-6">
            {/* <button className="hover:text-gray-200 font-semibold">ALL ABOUT PETS</button>
            <Heart className="w-6 h-6 hover:text-indigo-200 cursor-pointer" /> */}
            
          </div>
          {/* <Link to="/" className="text-white text-2xl font-bold">🐾 LilPaws</Link> */}
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
                    <Avatar className="bg-white mt-[-9px] ml-[9px]">
                      <AvatarFallback className="bg-white text-indigo-800 font-extrabold">
                        {user?.userName[0].toUpperCase()} 
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* Conditional rendering based on the user's role */}
                    {user?.role === "shelterAdmin" ? (
                      <DropdownMenuItem onClick={() => navigate("/shelterAdmin")}>
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
        </div>
      </nav>
  );
};

export default MainNavbar;