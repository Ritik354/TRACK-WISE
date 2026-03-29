import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import e from 'express';
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRE_TIME = '24H';

const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE_TIME });
}
// REGISTER USER
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" , success:false});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({ message: "Please enter a valid email" , success:false});
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters" , success:false});
    }
    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "User already exists" , success:false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = createToken(user._id);
        res.status(201).json({ message: "User registered successfully", token, success:true, user:{ id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }
}

// LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" , success:false});
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" , success:false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" , success:false});
        }
        const token = createToken(user._id);
        res.status(200).json({ message: "User logged in successfully", token, success:true, user:{ id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }
}

//to get user details
export const getUserDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", success:false });
        }
        res.status(200).json({ user, success:true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }
}

//to update user profile
export const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const userId = req.user.id;
    if (!name || !email) {
        return res.status(400).json({ message: "Please fill all the fields", success:false });
    }
    try{
        const exists = await User.findOne({ email });
        if(exists && exists._id.toString() !== userId){
            return res.status(400).json({ message: "Email already in use", success:false });
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found", success:false });
        }
        user.name = name;
        user.email = email;
        await user.save();
        res.status(200).json({ message: "User profile updated successfully", success:true, user:{ id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }   
}  

//to update user password
export const updateUserPassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Please fill all the fields", success:false });
    }
    if(newPassword.length < 6){
        return res.status(400).json({ message: "New password must be at least 6 characters", success:false });
    }
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found", success:false });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Current password is incorrect", success:false });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: "User password updated successfully", success:true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success:false });
    }   
}

