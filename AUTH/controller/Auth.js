const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { options } = require('../route/user');
require('dotenv').config();
// Signup route handler
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // Send success response
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            success: false,
            message: "User registration failed",
        });
    }
};


exports.login = async(req,res) => {
    try {
        //data fetch
        const {email , password} = req.body;
        // validation
        if(!email || !password){
                return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //check if user is avilable or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                message:"User is not registered"
            })
        }
        //verify password and generate web token
        const payload = {
            email : user.email,
            id : user._id,
            role : user.role
        }
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            
            
            user.token= token;
            user.password=undefined;

            const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
            };

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message : 'User logged in'
            });
        }
        else{
            return res.status(403).json({
                success : false,
                message : "Password is incorrect"
            })
        }
    }
    catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            success: false,
            message: "User registration failed",
        });
    }
}