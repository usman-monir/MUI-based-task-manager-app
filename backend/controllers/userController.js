import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import multer from "multer";
import path from "path"

// @desc    Auth User and get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    return res.json({
      data: { _id: user._id, name: user.name, email: user.email, imageUrl: user.imageUrl},
      message: "user logged in successfully!",
      success: true,
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid email or password",
    data: null,
  });
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400).json({
      success: false,
      message: "User already exists",
      data: null,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      data: { _id: user._id, name: user.name, email: user.email, imageUrl: user.imageUrl },
      message: "user registered successfully!",
      success: true,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid user data",
      data: null,
    });
  }
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res
    .status(200)
    .json({ data: null, message: "Logged out successfully", success: true });
});

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      data: { _id: user._id, name: user.name, email: user.email, imageUrl: user.imageUrl },
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    const existUserWithEmail = await User.findOne({ email: req.body.email });
    // if existUserWithEmail and user has not given it's own email
    if (existUserWithEmail && user.email !== req.body.email) {
      res.status(400).json({
        success: false,
        message: "User with this email already exists",
        data: null,
      });
    }
    user.email = req.body.email || user.email;
    user.imageUrl = req.body.imageUrl || user.imageUrl;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        imageUrl: user.imageUrl,
      },
      success: true,
      message: "Profile updated successfully."
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
      data: null,
    });
  }
});


// @desc    Upload User Profile Picture
// @route   POST /api/users/profile/upload-profile-picture
// @access  Private
const uploadUserProfilePhoto = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const __dirname = path.resolve();
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'backend', 'assets', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).single('profilePic');

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Failed to upload profile picture',
        error: err.message,
      });
    }

    const imageUrl = `/images/${req.file.filename}`; // Adjust the URL to match the static file serving route

    user.imageUrl = imageUrl;

    try {
      await user.save();
      res.json({
        success: true,
        data: {
          imageUrl,
        },
        message: 'Profile photo updated successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update profile photo',
        error: error.message,
      });
    }
  });
});


export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  uploadUserProfilePhoto,
};
