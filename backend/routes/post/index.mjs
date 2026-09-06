import express from 'express'
import { PostModel } from '../../models/post/index.mjs'
import { isValidObjectId } from 'mongoose'

const router = express.Router()

router.post('/post' , async (req, res) => {
    try {
        if (!req.body.title) {
            res.status(400).send({
                message: "title is required"
            })
            
        }

         if (!req.body.description) {
            res.status(400).send({
                message: "description is required"
            })
            
        }

        await PostModel.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.currentUser._id
        })

        return res.send({
            message: "post created"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})

router.get('/post' , async(req, res) => {
    try {
        const allPost = await PostModel.find().populate("userId")
        return res.send({
            message: "all post fetched",
            data: allPost
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})

router.get('/post/:postId' , async(req, res) => {
    try {
        const postId = req.params.postId

        if (!postId) {
            return res.status(400).send({
                message: "post id is required"
            })
            
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: "id is invalid"
            })
            
        }


        // const singlePost = await PostModel.find({_id: req.params.postId})
        const singlePost = await PostModel.findOne({_id: req.params.postId})

        if (!singlePost) {
            return res.status(404).send({
                message: "post not found"
            })
            
        }
        return res.send({
            message: "single post fetched",
            data: singlePost
            
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})

router.put('/post/:postId' , async(req, res) => {
    

     try {
        const postId = req.params.postId
     if (!postId) {
            return res.status(400).send({
                message: "post id is required"
            })
            
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: "id is invalid"
            })
            
        }

          if (!req.body.title) {
            res.status(400).send({
                message: "title is required"
            })
            
        }

         if (!req.body.description) {
            res.status(400).send({
                message: "description is required"
            })
            
        }

        const post = await PostModel.findOne({_id: postid})
          if (req.currentUser._id !== post.userId) {
            return res.status(401).send({
                message: "you cannot edit this post"
            })
            
          }


         await PostModel.findByIdAndUpdate({_id: postId}, {
        title: req.body.title,
        description: req.body.description,
    })

        return res.send({
            message: "single post edited"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})



router.delete('/post/:postId' , async(req, res) => {
  
    try {
          const postId = req.params.postId
     if (!postId) {
            return res.status(400).send({
                message: "post id is required"
            })
            
        }

        if (!isValidObjectId(postId)) {
            return res.status(400).send({
                message: "id is invalid"
            })
            
        }
          const post = await PostModel.findOne({_id: postid})
          if (req.currentUser._id !== post.userId) {
            return res.status(401).send({
                message: "you cannot delete this post"
            })
            
          }
        await PostModel.findByIdAndDelete(postId)
        
        return res.send({
            message: "single post deleted"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})



export default router