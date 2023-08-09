import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: { 
    type: String,
    default: "" 
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],

},
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  if (this.image.trim() === "") {
    this.image = "https://www.fahrenheitmarketing.com/app/uploads/2019/09/111773543_s.jpg";
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
