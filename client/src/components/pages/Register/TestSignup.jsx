import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSignup = async () => {
    //form data to send to the server
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    try {
      // Send the form data to the server for signup
      await axios.post('/api/signup', formData);

      
      setEmail('');
      setPassword('');
      setAvatar(null);
      setPreview('');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="bg-white max-w-md mx-auto rounded-lg overflow-hidden shadow-md p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Signup Form</h1>
      <div className="space-y-2">
        <label className="font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="space-y-2">
        <label className="font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="space-y-2">
        <label className="font-semibold">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {preview && (
        <div>
          <h3 className="font-semibold">Image Preview</h3>
          <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />
        </div>
      )}
      <button
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignupForm;
