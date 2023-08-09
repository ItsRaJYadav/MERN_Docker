import React from 'react';
import { AiFillLike, AiOutlineClose } from 'react-icons/ai';

const NotificationModal = ({ posts, user, userimg, closeModal }) => {
  return (
    <div className="bg-white p-4 rounded-md w-full max-w-md relative">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-900"
        onClick={closeModal}
      >
        <AiOutlineClose />
      </button>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            {post.likes.length >= 5 ? (
              <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
                <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={userimg}
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <span className="font-mono">
                    Hey {user} your Post <strong>{post.title.substr(0, 30)}{post.title.length > 20 ? '...' : ''}</strong> got <strong>{post.likes.length}</strong> likes.
                  </span>
                </div>
                <div>
                  <AiFillLike />
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default NotificationModal;
