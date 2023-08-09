import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../contextApi/auth";

function RegistrationForm() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    } //if already logged in then user can't access the registration
  }, [auth, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null, // Add the 'avatar' field to store the selected avatar file
    preview: null, // Add the 'preview' field to store the preview image URL
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (name === "avatar" && files[0]) {
      setFormData({
        ...formData,
        avatar: files[0], // This should set the avatar file correctly
        preview: URL.createObjectURL(files[0]),
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, avatar } = formData;
    if (!avatar) {
      toast.error("Please select an avatar.");
      return; // Do not proceed with form submission
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("avatar", avatar);
  
      const res = await axios.post("/api/v1/auth/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the appropriate content-type for the avatar upload
        },
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>
      <div className="flex justify-center mb-4">
        {formData.preview ? (
          <img
            src={formData.preview}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <FaUser className="text-gray-600" />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <div className="relative">
            <FaUser className="absolute left-0 top-2 text-gray-600" />
            <input
              className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-0 top-2 text-gray-600" />
            <input
              className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <FaLock className="absolute left-0 top-2 text-gray-600" />
            <input
              className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="mb-4">
  <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
    Avatar
  </label>
  <input
    type="file"
    id="avatar"
    name="avatar" // Make sure the name attribute is set to "avatar"
    accept="image/*"
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />
</div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
