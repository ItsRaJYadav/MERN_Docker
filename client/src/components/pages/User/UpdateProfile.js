import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contextApi/auth";
import { toast } from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

function UpdateProfileForm() {
    const navigate=useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.user._id;
        const response = await axios.get(`/api/v1/auth/user/${userId}`);
        const userData = response.data.user;
        setName(userData.name);
        setPhone(userData.phone);
        setAvatarUrl(userData.avatarUrl);
        setBannerUrl(userData.bannerUrl);

        setAbout(userData.about);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [auth]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userId = auth.user._id;
      const response = await axios.patch(`/api/v1/auth/user/${userId}/update`, {
        name,
        phone,
        avatarUrl,
        bannerUrl, 
        about,
      });
      const updatedUser = response.data.user;
      setAuth({ ...auth, user: updatedUser });
      
      setLoading(false);
      setError(null);
      toast.success("profile updated successfully")
      setTimeout(() => {
        navigate('/user')
      }, 1000);

    } catch (error) {
      setLoading(false);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-3xl flex justify-center">
      <div className="w-full px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatarUrl" className="block text-gray-700 font-semibold mb-2">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatarUrl"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatarUrl" className="block text-gray-700 font-semibold mb-2">
              Banner URL
            </label>
            <input
              type="text"
              id="bannerUrl"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-gray-700 font-semibold mb-2">
              About
            </label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfileForm;
