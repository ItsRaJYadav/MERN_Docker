import React, { useState, useEffect } from "react";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";

import { useAuth } from "../../../contextApi/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Global/Spinner";

function UserInfoPage() {
  const [auth, , Logout] = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = auth?.user._id;
  useEffect(() => {
    // console.log(`User id ${userId}`)
    const fetchData = async () => {
      try {
        

        const userDataResponse = await axios.get(`/api/v1/auth/user/${userId}`);
        const userData = userDataResponse.data.user;
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.user._id]);

  const handleLogout = () => {
    Logout();
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate(`/user/updateProfile/${auth.user._id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Banner */}
      <div
        className="h-40 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${user?.bannerUrl})`,
        }}
      ></div>

      {/* Avatar and User Info */}
      <div className="flex items-center justify-center p-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user?.avatarUrl}
            alt="Avatar"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold flex items-center">
            {user?.name} {user?.isVerified ? <BiSolidBadgeCheck className="ml-2 text-blue-600" /> : null}
          </h2>
          
          <p className="text-gray-900">{user?.email}</p>
          <p>Phone : {user.phone}</p>
          <p>About : {user.about}</p>
          {
            !user?.isVerified ?
              <>
                <p className="text-m font-bold flex items-center">
                  Verification Status : {!user?.isVerified ? <VscClose className="ml-2 text-red-600 h-6 w-6" /> : null}
                </p>
              </> : null
          }
          
        </div>
      </div>

      {/* Edit Profile, Logout */}
      <div className="flex items-center justify-center p-4">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mr-4"
          onClick={handleEditProfile}
        >
          <FaUserEdit className="mr-1" />
          Edit Profile
        </button>
        <button
          className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserInfoPage;
