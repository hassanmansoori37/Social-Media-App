import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    // Comment text
    text: {
        type: String,
        required: true,
        trim: true
    },

    // Kis user ne comment kiya
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    // Kis post pe comment kiya
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
     like: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "users"
    },
    dislike: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: "users"
    }

}, { timestamps: true })

export const CommentModel = mongoose.model('comments', commentSchema)