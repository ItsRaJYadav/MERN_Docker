import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';

const User = (props) => {
  const [auth] = useAuth();
  const [posts, setPosts] = useState([]);
  const userId = auth?.user?._id;
  const user = auth?.user?.name;
  const [isModalOpen, setIsModalOpen] = useState(
    localStorage.getItem('userModalStatus') !== 'closed'
  );

  useEffect(() => {
    // Fetch all posts by user ID
    axios
      .get(`/api/v1/post/user/${userId}`)
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error('Error fetching user posts:', error);
      });
  }, [userId]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    localStorage.setItem('userModalStatus', 'closed');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold mb-4 text-center">Posts by {user}</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">You have no posts yet.</p>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {posts.map((post) => (
            <div key={post._id} className="w-full md:w-1/3 px-4 border border-gray-300 rounded-md mb-2">
              <h1 className="text-xl font-bold mb-2">{post.title}</h1>
              {post.image && <img className="w-full mb-4 rounded-md" src={post.image} alt="Post" />}
              <p className="text-gray-700 mb-2">
                Total Likes: {post.likes.length}
              </p>
              <p className="text-gray-700">
                {post.description.length > 100
                  ? `${post.description.slice(0, 100)}...`
                  : post.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {posts.length > 0 && isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Post Stats</h1>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={handleModalClose}
              >
                Close
              </button>
            </div>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-700">
                      Post "{post.title}" has{' '}
                      <span className="font-bold text-red-500 ml-1">{post.likes.length}</span> likes.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
