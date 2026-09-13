import express from 'express'
import { PostModel, UserModel } from '../../models/index.mjs';
import bcrypt from 'bcryptjs';
import { multerMiddleware }from '../../libs/multer.mjs'
import { uploadCloudinary } from '../../libs/cloudinary.mjs';


const router = express.Router()

// get profile

router.get('/profile' , async(req, res) => {
    try {
       
         return res.send({
            message: "profile fetched",
            data: req.currentUser
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
        
    }
})

router.get('/profile/:userId' , async(req, res) => {
    try {
        const userId = req.params.userId || req.currentUser.userId

        const user = await UserModel.findOne({_id: userId})

        return res.send({
            message: "profile fetched",
            data: user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
        
    }
})




// update profile
router.put('/profile' , async(req, res) => {
    try {
        const firstname = req.body.firstname
        const lastname = req.body.lastname

        const user =  await UserModel.findOne({_id: req.currentUser._id})

        if (!user) {
            return res.status(404).send({
                message: "account not Found"
            })
            
        }

        if (firstname) {
            user.firstname = firstname
            
        }

        if (lastname) {
            user.lastname = lastname
            
        }

        await user.save()

        return res.send({
            message: "profile updated"
       })

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
        
    }
})


// update profile picture

router.put('/profile-picture', multerMiddleware.any() , async(req, res, next) => {
    try {
        // console.log(req.files);

        const file = req.files[0]

        if (!file) {
            return res.status(400).send({
                message: "file is required"
            })
            
        }

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
        // console.log(fileResp);

        await UserModel.findByIdAndUpdate({_id: req.currentUser._id} , {
            $set: {
                profilePicture: fileResp.secure_url

            }
        })
        

        


        
        return res.send({
            message: "profile-picture updated",
            url: fileResp.secure_url
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
        
        
    }
})

// update password


router.put('/password' , async(req, res) => {
    try {

        const currentPassword = req.body.currentPassword
        const newPassword = req.body.newPassword

        const isCurrentPassword = await bcrypt.compare(currentPassword, req.currentUser.password)

        if (!isCurrentPassword) {
            return res.status(400).send({
                message: "current password is invalid"
            })
            
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 12)

        await UserModel.findByIdAndUpdate({_id: req.currentUser._id} , {
            $set: {
               password: newPasswordHash

            }
        })

        return res.send({
            message: "password updated",
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
        
    }
})

router.get('/profile/posts/:userId' , async(req, res) => {
    try {

        const allPosts = await PostModel.find({userId: req.params.userId}).populate("userId")

        return res.send({
            message: "profile posts fetched",
            data: allPosts
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal server error"
        })
        
    }
})


// update email

export default router