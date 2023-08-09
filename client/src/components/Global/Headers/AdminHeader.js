import React from 'react';
import { useAuth } from '../../../contextApi/auth';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [auth] = useAuth();

   return (
    <header className="bg-green-500 p-4">
      <nav className="flex items-center justify-center max-w-4xl mx-auto">
        <div>
          <span className="text-white font-bold text-lg">Admin Logo</span>
        </div>
        {auth.user && auth.user.isAdmin === true ? (
          <>
            <div className="space-x-4 flex-grow text-center">
              <Link to="/admin/dashboard" className="text-white hover:text-gray-200">
                Dashboard
              </Link>
              
              <Link to="/admin/allusers" className="text-white hover:text-gray-200">
                All Users
              </Link>
             
            </div>
            <Link to="/user" className="text-white hover:text-gray-200">
                Admin 
              </Link>
          </>
        ) : null}
      </nav>
    </header>
  );
};

export default AdminHeader;
