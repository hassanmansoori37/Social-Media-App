import express from 'express'
import { PostModel } from '../../models/post/index.mjs'
import { isValidObjectId } from 'mongoose'
import { multerMiddleware } from '../../libs/multer.mjs'
import { uploadCloudinary } from '../../libs/cloudinary.mjs';

const router = express.Router()

router.post('/post' ,multerMiddleware.any(), async (req, res) => {
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

        const file = req?.files[0]
        let imageUrl = null

        if (file) {
             if (!file.mimetype.startsWith("image")) {
            return res.status(400).send({
                message: "only image are allowed"

            })
            
        }

        if (file.size > 1000000) {
            return res.status(400).send({
                message: "file uploads limit is 1mb"
            })
            
        }


            const fileResp = await uploadCloudinary(file)
            imageUrl = fileResp?.secure_url
            
        }




        await PostModel.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.currentUser._id,
           imageUrl: imageUrl
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

router.get("/post", async (req, res) => {
    try {
        const q = req.query.q ? req.query.q.trim() : ""

        // Build query filter
        let query = {}
        if (q) {
            query = {
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { description: { $regex: q, $options: "i" } }
                ]
            }
        }

        const allPost = await PostModel.find(query).populate("userId")

        return res.send({
            message: "all posts fetched",
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
        const singlePost = await PostModel.findOne({_id: req.params.postId}).populate("userId")

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

        const post = await PostModel.findOne({_id: postId})
      

          if (req.currentUser._id.toString() !== post.userId.toString()) {
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
          const post = await PostModel.findOne({_id: postId})
           
          if (req.currentUser._id.toString() !== post.userId.toString()) {
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