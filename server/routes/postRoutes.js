import express from "express";
import { requireSignIn } from '../middlewares/auth.js'
import { countLikesController, createPostController, dislikePostController, getAllPostsByUserController, getAllPostsController, likePostController, testController } from "../controllers/postController.js";


const router = express.Router();
router.get('/', (req, res) => {
    res.sendStatus(200);
})

router.get('/test', testController);
router.get('/showallposts', getAllPostsController);
router.post('/createpost', requireSignIn, createPostController)
router.post('/like/:postId', requireSignIn, likePostController);
router.post('/dislike/:postId', requireSignIn, dislikePostController);
router.get('/like/:postId', countLikesController);
router.get('/user/:userId',requireSignIn, getAllPostsByUserController);



export default router;