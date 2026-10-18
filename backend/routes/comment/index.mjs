import express from 'express'
import { CommentModel } from '../../models/comments/index.mjs'
import { PostModel } from '../../models/post/index.mjs'
import { authGuardJWT } from '../../middlewares/index.mjs'

const router = express.Router()

// ==================== ADD COMMENT ====================
router.post('/post/comment/:postId',authGuardJWT, async (req, res) => {
    try {
        const postId = req.params.postId
        const userId = req.currentUser._id      // ← authGuardJWT se aata hai
        const text  = req.body.text

        // Validation
        if (!text || !text.trim()) {
            return res.status(400).send(
                { message: "comment text is required" }
            )
        }

        // Post exist karta hai?
        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(404).send(
                { message: "post not found" }
            )
        }

        // Comment create karein
        const comment = await CommentModel.create({
            text: text.trim(),
            userId: userId,
            postId: postId
        })

        // User info ke saath return karein (populate)
        const populatedComment = await CommentModel.findById(comment._id)
            .populate('userId', 'firstname lastname profilePicture')

        return res.status(201).send({
            message: "comment added",
            data: populatedComment
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({ 
            message: "Internal server error" }
        )
    }
})

// ==================== GET COMMENTS OF POST ====================
router.get('/post/comment/:postId', async (req, res) => {
    try {
        const postId = req.params.postId

        // Post ke saare comments dhundein
        const comments = await CommentModel.find({ postId: postId })
            .populate('userId', 'firstname lastname profilePicture')   // ← User info
            .sort({ createdAt: -1 })     // ← Latest pehle

        return res.send({
            message: "comments fetched",
            data: comments
        })

    } catch (error) {
        console.error(error);
        res.status(500).send(
            { message: "Internal server error" }
        )
    }
})

// ==================== DELETE COMMENT ====================
router.delete('/post/comment/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId
        const userId = req.currentUser._id 

        // Comment dhundein
        const comment = await CommentModel.findById(commentId)
        if (!comment) {
            return res.status(404).send({ message: "comment not found" })
        }

        // Sirf comment owner delete kar sakta hai
        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).send(
                { message: "not authorized" }
            )
        }

        await CommentModel.findByIdAndDelete(commentId)

        return res.send(
            { message: "comment deleted" }
        )

    } catch (error) {
        console.error(error);
        res.status(500).send(
            { message: "Internal server error" }
        )
    }
})
router.post('/comment/reaction/:commentId', authGuardJWT, async (req, res) => {
    try {
        const commentId = req.params.commentId
        const userId = req.currentUser._id
        const action = req.body.action

        if (!action) {
            return res.status(400).send({ message: "action is required" })
        }

        const comment = await CommentModel.findById(commentId)
        if (!comment) {
            return res.status(404).send({ message: "comment not found" })
        }

        // Pehle se like/dislike check karein
        const isLiked = comment.like.some((id) => id.toString() === userId.toString())
        const isDisliked = comment.dislike.some((id) => id.toString() === userId.toString())

        // ==================== LIKE ====================
        if (action === "like") {
            if (isLiked) {
                comment.like = comment.like.filter((id) => id.toString() !== userId.toString())
            } else {
                comment.like.push(userId)
                comment.dislike = comment.dislike.filter((id) => id.toString() !== userId.toString())
            }
        }

        // ==================== DISLIKE ====================
        if (action === "dislike") {
            if (isDisliked) {
                comment.dislike = comment.dislike.filter((id) => id.toString() !== userId.toString())
            } else {
                comment.dislike.push(userId)
                comment.like = comment.like.filter((id) => id.toString() !== userId.toString())
            }
        }

        await comment.save()

        return res.send({
            message: action + " done",
            like: comment.like,
            dislike: comment.dislike
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" })
    }
})



export default router