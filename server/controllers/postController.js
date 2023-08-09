// controllers/postController.js

import Post from '../models/Post.js';


export const createPostController = async (req, res) => {
  try {
    // Extract the data from the request body
    const { title, description, image, userId, avatarUrl, author } = req.body;

    // Create a new post using the Post model
    const newPost = new Post({
      title,
      description,
      image,
      user: userId,
      avatarUrl,
      author,
    });

    // Save the post to the database
    await newPost.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Post created successfully!',
      post: newPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while creating the post.',
      error: error.message,
    });
  }
}


export const testController = (req, res) => {
  res.send("hello to the tester ");
}

export const getAllPostsController = async (req, res) => {
  try {
    // Find all posts in the database
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      message: 'All posts fetched successfully!',
      posts,
    });
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching all posts.',
      error: error.message,
    });
  }
};

export const getAllPostsByUserController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all posts in the database where the user ID matches
    const posts = await Post.find({ user: userId });

    return res.status(200).json({
      success: true,
      message: 'All posts fetched successfully!',
      posts,
    });
  } catch (error) {
    console.error('Error fetching all posts by user:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching all posts by user.',
      error: error.message,
    });
  }
};







export const likePostController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;
    console.log(`user: ${userId}`);
    console.log(`postId: ${postId}`);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in to like a post.',
      });
    }

    const post = await Post.findById(postId);



    const alreadyLiked = post.likes.some((like) => like.user && like.user.toString() === userId);

    if (alreadyLiked) {
      return res.status(400).json({
        success: false,
        message: 'You have already liked this post.',
      });
    }

    post.likes.push({ user: userId });
    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post liked successfully!',
      post,
    });
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while liking the post.',
      error: error.message,
    });
  }
};



export const dislikePostController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;
   console.log(`Post ${postId}`)
   console.log(`User ${userId}`)
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in to dislike a post.',
      });
    }

    const post = await Post.findById(postId);

    

    const alreadyDisliked = post.likes.some(like => like.user && like.user.toString() === userId);

    if (!alreadyDisliked) {
      return res.status(400).json({
        success: false,
        message: 'You have not liked this post yet.',
      });
    }

    // Remove the dislike from the post's likes array
    post.likes = post.likes.filter(like => !(like.user && like.user.toString() === userId));
    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post disliked successfully!',
      post,
    });
  } catch (error) {
    console.error('Error disliking post:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while disliking the post.',
      error: error.message,
    });
  }
};


export const countLikesController = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by its ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found.',
      });
    }

    // Count the total likes for the post
    const totalLikes = post.likes.length;

    return res.status(200).json({
      success: true,
      totalLikes: totalLikes,
    });
  } catch (error) {
    console.error('Error counting likes:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while counting the likes.',
      error: error.message,
    });
  }
};
  
