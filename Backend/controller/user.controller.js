import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";



import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";











export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // 🛑 Handle missing file safely
        let profilePhoto = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri);
            profilePhoto = cloudResponse.url;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto }
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            success: true,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
      try {
            const { email, password , role } = req.body;
            if (!email || !password || !role) {
                return res.status(400).json({
                    message: "Something is missing",
                    success: false
                });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'User not found with this email.',
                    success: false,
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid password',
                    success: false,
                })
            }

              // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

      // ✅ Instead of reassigning, create a new object
      const userData = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    };

    return res.status(200)
        .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
        .json({
            message: `Welcome back ${user.fullname}`,
            user: userData,  // ✅ Use new userData object instead of modifying "user"
            success: true
        });
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
};



export const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Logged out successfully",
        success: true
    });
    
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        // const file = req.file;
        // // cloudinary ayega idhar
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        // if(cloudResponse){
        //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url
        //     user.profile.resumeOriginalName = file.originalname // Save the original file name
        // }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



