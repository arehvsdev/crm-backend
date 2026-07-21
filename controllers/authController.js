const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User

const register = async (req, res) => {
    console.log("Registering new user");
    try {
        const {name, email, password, role } = req.body;

        // Validation
        if( !name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === ""){
            return res.status(400).json({
                 message: "All fields are required and cannot be empty",
                 status: false
            })
        }

        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
                status: false
            });
        }

        // Password complexity check
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
                status: false
            });
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                status: false
            });
        }

        // Check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: 'User already exist',
                status: false
            })
        }

        // Hashpassword
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "User"
        })

        if (user) {
            return res.status(201).json({
                message: "Registration successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        }

    }catch(err){
        console.log("register error : ", err);
        return res.status(500).json({
            message: "Failed to register",
            status: false,
            error: err.message
        })
    }
}

// Login

const login = async(req, res) => {
    console.log("Login started");
    try {
        const {email, password} = req.body;

        if (!email || !password || email.trim() === "" || password.trim() === "") {
            return res.status(400).json({
                message: "Email and password are required",
                status: false
            });
        }

        const user = await User.findOne({email});
        if( !user){
            return res.status(404).json({
                message: "User not found",
                status: false
            })
        }

        const matchPswd = await bcrypt.compare(password, user.password);
        if(!matchPswd){
            return res.status(401).json({
                message: "Invalid username or Password",
                status: false
            })
        }
        
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        });

        res.status(200).json({
            message: "Login succesful",
            status: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: false,
            error: error.message
        })
    }
}

// Profile

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({
            message: "User profile",
            status: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    register,
    login,
    profile
}