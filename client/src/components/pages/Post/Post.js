import React, { useState, useEffect } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../../../contextApi/auth";
import toast from "react-hot-toast";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [auth] = useAuth();
  const [userId, setUserId] = useState(null); 
  const [isExpanded, setIsExpanded] = useState({});

  useEffect(() => {
    if (auth?.user?._id) {
      setUserId(auth.user._id);
    }
  }, [auth?.user?._id]);

  // Fetch all posts from the backend
  useEffect(() => {
    axios
      .get("/api/v1/post/showallposts")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [userId]);

  const handleLikeClick = (postId) => {
    if (!userId) {
      toast.error("please sign in to like this post");
      return;
    }
    axios
      .post(`/api/v1/post/like/${postId}`, { userId })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        // Fetch the total likes
        axios
          .get(`/api/v1/post/likes/${postId}`)
          .then((likesResponse) => {
            // Update the likes count
            setPosts((prevPosts) => {
              return prevPosts.map((post) =>
                post._id === postId
                  ? { ...post, likes: likesResponse.data.totalLikes }
                  : post
              );
            });
          })
          .catch((error) => {
            console.error("Error fetching total likes:", error);
          });
      })
      .catch((error) => {
        // Handle error
        console.error("Error liking post:", error);
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("You have already liked this post.");
          } else if (error.response.status === 401) {
            toast.error("You must be logged in to like a post.");
          }
        } else {
          toast.error("Error liking post");
        }
      });
  };

  const handleDislikeClick = (postId) => {
    if (!userId) {
      toast.error("You must be login to dislike this post");
      return;
    }
    axios
      .post(`/api/v1/post/dislike/${postId}`, { userId })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
        axios
          .get(`/api/v1/post/dislikes/${postId}`)
          .then((dislikesResponse) => {
            //logic for Update the dislikes count for the post
            setPosts((prevPosts) => {
              return prevPosts.map((post) =>
                post._id === postId
                  ? { ...post, dislikes: dislikesResponse.data.totalDislikes }
                  : post
              );
            });
          })
          .catch((error) => {
            console.error("Error fetching total dislikes:", error);
          });
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("You have already disliked this post.");
          } else if (error.response.status === 401) {
            toast.error("You must be logged in to dislike this post.");
          }
        } else {
          toast.error("Error disliking post");
        }
      });
  };

  const renderContent = (content, maxLength, postId) => {
    if (content.length <= maxLength || isExpanded[postId]) {
      return content;
    }
    return (
      <>
        {content.slice(0, maxLength)}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setIsExpanded((prevExpanded) => ({
              ...prevExpanded,
              [postId]: !prevExpanded[postId],
            }));
          }}
        >

        </span>
      </>
    );
  }

  return (
    <>
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-2 text-center">Recents Posts</h1>
      <div className="flex flex-wrap -mx-2">
        {posts.map((post) => (
          <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-2">
          <div className="post-card border border-gray-300 p-4 mb-6 rounded-md shadow-md">
              <div className="flex items-center mb-3">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={post.avatarUrl}
                  alt="Author Profile"
                />
                <div>
                  <h3 className="text-lg font-bold">{post.author}</h3>
                  <span>
                      {new Date(post.createdAt).toLocaleString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              {post.image && (
                <img
                  className="w-full mb-4 rounded-md"
                  src={post.image}
                  alt="Post"
                />
              )}
              <p className="text-gray-700">
                {renderContent(post.description, 120, post._id)}
              </p>
              {post.description.length > 120 && (
                <div className="mt-2">
                  <button
                    className="text-blue-500 font-bold"
                    onClick={() => setIsExpanded((prevExpanded) => ({
                      ...prevExpanded,
                      [post._id]: !prevExpanded[post._id],
                    }))}
                  >
                    {isExpanded[post._id] ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              )}
              <div className="flex mt-4">
                <button
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    post.likes && post.likes.length > 0
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-blue-500"
                  }`}
                  onClick={() => handleLikeClick(post._id)}
                >
                  {post.likes && post.likes.length > 0 ? (
                    <>
                      <AiFillLike className="mr-2" /> Liked{" "}
                      {post.likes.length}
                    </>
                  ) : (
                    <>
                      <AiFillLike className="mr-2" />
                      Like
                    </>
                  )}
                </button>
                <button
                  className={`flex items-center px-4 py-2 rounded-lg ml-4 ${
                    post.dislikes && post.dislikes.length > 0
                      ? "bg-red-500 text-white"
                      : "bg-gray-300 text-red-500"
                  }`}
                  onClick={() => handleDislikeClick(post._id)}
                >
                  {post.dislikes && post.dislikes.length > 0 ? (
                    <>
                      <AiFillDislike className="mr-2" /> Disliked{" "}
                      {post.dislikes.length}
                    </>
                  ) : (
                    <>
                      <AiFillDislike className="mr-2" />
                      Dislike
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  
  );
};

export default App;
