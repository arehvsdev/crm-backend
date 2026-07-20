const mongoose = require("mongoose");
const UserDb = require("../models/UserModel");
const bcrypt = require('bcrypt');

const healthCheck = async (req, res) => {
    try {
        return res.status(200).json({message: 'Done !'})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

const createUser = async( req, res) => {
    console.log('Creating a new user');
    try {

        const {
            name, email, phone, password, age, country, zipcode, gender
        } = req.body;

        const userExist = await UserDb.findOne({ email: email });
        if( userExist ){
            return res.status(400).json({ message: "User already exists" , status: false});
        }
        
    } catch (error) {
        console.log('Register user :: ',error);
        return res.status(500).json({
            message: 'Error in creating a user',
            status: false
        })
    }
}

module.exports = {
    createUser,
    healthCheck
}