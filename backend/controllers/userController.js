import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

// @desc    Auth User and get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if ( user && (await user.matchPassword(password)) )
    {
        generateToken(res, user._id)
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "user logged in successfully!",
            success: true,
        })
    }

    res.status(401);
    throw new Error('Invalid email or password')
});

// @desc    Register User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) =>{
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser)
    {
        res.status(400)
        throw new Error("User already exists.");
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user){
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "user registered successfully!",
            success: true,
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) =>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message : 'Logged out successfully' })
});


// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }

});

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;

        const existUserWithEmail = await User.findOne({ email: req.body.email })
        // if existUserWithEmail and user has not given it's own email
        if (existUserWithEmail && user.email !== req.body.email)
        {
            res.status(400);
            throw new Error('User with this email already exists');
        }
        user.email = req.body.email || user.email;

        if (req.body.password) {
        user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}
