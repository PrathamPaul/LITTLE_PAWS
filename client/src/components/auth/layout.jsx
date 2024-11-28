import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    // <div className="flex min-h-screen w-full">
    //   <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12">
    //     <div className="max-w-md space-y-6 text-center text-primary-foreground">
    //       <h1 className="text-4xl font-extrabold tracking-tight">
    //         Welcome to ECommerce Shopping
    //       </h1>
    //     </div>
    //   </div>
    //   <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    //     <Outlet />
    //   </div>
    // </div>
    <div className="flex flex-col min-h-screen w-full">
    {/* Navbar */}
    <nav className="flex items-center justify-between bg-indigo-900 p-4 text-white">
      <div className="flex items-center">
        <Link 
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-indigo-300 transition-colors duration-300"
        >
          🐾 LilPaws
        </Link>
      </div>
      <div className="hidden lg:flex space-x-4">
        <Link
          to="/"
          className="px-3 py-2 rounded hover:bg-gray-800 transition-colors duration-300"
        >
          Home
        </Link>
        {/* Add more nav links as needed */}
      </div>
    </nav>

    {/* Main Content Area - Centered and Full Height Minus Navbar */}
    <div className="flex items-center justify-center flex-grow bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  </div>
  );
}

export default AuthLayout;