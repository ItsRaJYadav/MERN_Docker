import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contextApi/auth';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import NotificationModal from '../../pages/User/Notification';
import { Link } from 'react-router-dom';

const Header = () => {
  const [auth] = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const userId = auth?.user?._id;
  const user = auth?.user?.name;
  const userimg = auth?.user?.avtar;

  useEffect(() => {
    if (userId) {
      // Fetch all posts by user ID
      axios
        .get(`/api/v1/post/user/${userId}`)
        .then((response) => {
          setPosts(response.data.posts);
          const count = response.data.posts.reduce((total, post) => {
            if (post.likes.length >= 5) {
              return total + 1;
            }
            return total;
          }, 0);
          setNotificationCount(count);
        })
        .catch((error) => {
          console.error('Error fetching user posts:', error);
        });
    }
  }, [userId]);
  

  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex items-center justify-center max-w-4xl mx-auto">

        <div>
          <Link to='/' className="text-white font-bold text-lg cursor-pointer">PostMan</Link>
        </div>

        <div className="space-x-4 flex-grow text-center">
          <a href="/" className="text-white hover:text-gray-200">Home</a>

          {auth?.user ? (
            <>
              <a href="/user" className="text-white hover:text-gray-200">User</a>
              <a href="/user/mypost" className="text-white hover:text-gray-200">My Post</a>
              <a href="/user/newpost" className="text-white hover:text-gray-200">New Post</a>
              {/* Notification badge */}
              <div className="relative inline-block cursor-pointer" onClick={handleNotificationClick}>
                <FaBell className="text-white text-xl" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white font-bold rounded-full px-2 py-1">
                    {notificationCount}
                  </span>
                )}
              </div>
            </>
          ) : (
            <a href="/login" className="text-white hover:text-gray-200">Login</a>
          )}


        </div>
      </nav>

      {/* Notification modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <NotificationModal
            posts={posts}
            user={user}
            userimg={userimg}
            closeModal={closeModal}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
