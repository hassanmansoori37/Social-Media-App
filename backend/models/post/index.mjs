import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    imageUrl: {
        type: String,
        trim: true,
        default: null,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    like: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "users"
    }

}, {timestamps: true})

export const PostModel = mongoose.model('post' , postSchema)