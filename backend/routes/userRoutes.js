import express from "express";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";

import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadUserProfilePhoto,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/profile/upload-profile-photo", protect, uploadUserProfilePhoto);

export default router;
