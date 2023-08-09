import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextApi/auth'
const App = () => {
    const [auth ] =useAuth();
    const userId=auth?.user._id;
    const avatarUrl=auth?.user.avtar;
    const author=auth?.user.name;
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image } = newPost;  
    console.log(newPost); // Log newPost
    if (title.split(' ').length < 5) {
      toast.error('Post tittle must be at least 5 words long.');
      return;
    }

    if (description.split(' ').length < 10) {
      toast.error('Description must be at least 10 words long.');
      return;
    }

    try {
      const res = await axios.post('/api/v1/post/createpost', { 
        title,
        description,
        image,
        userId,
        author,
        avatarUrl
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="w-1/2 mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newPost.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newPost.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={newPost.image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default App;
