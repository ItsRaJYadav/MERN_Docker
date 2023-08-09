import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/auth.js'
import {
    registerController,
    loginController,
    testController,
    allUsersController,
    deleteUserController,
    updateProfileController,
    getUserInfoController,
    } from '../controllers/authController.js'
import { upload } from "../config/Cloudinary.js";

const router = express.Router();


//REGISTER || METHOD POST
router.post("/register",upload.single('avatar'), registerController);


//REGISTER || METHOD POST
router.post("/login", loginController);

//REGISTER || METHOD POST
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});
router.patch("/user/:userId/update", requireSignIn, updateProfileController);
router.get("/user/:userId",requireSignIn, getUserInfoController);



// Admin routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
router.get("/admin/alluser", requireSignIn, isAdmin, allUsersController);
router.delete("/admin/deleteuser/:userId", requireSignIn, isAdmin, deleteUserController);


export default router;