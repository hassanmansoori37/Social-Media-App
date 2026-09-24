import mongoose from "mongoose";
import { emailPattern } from "../../utilities/core.mjs";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },

    lastname: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: emailPattern
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
    
    profilePicture: {
        type: String,
        trim: true,
        default: null,
    },
    isEmailVerify: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

export const UserModel = mongoose.model('users' , userSchema)