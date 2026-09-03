import express from 'express'
import { UserModel } from '../../models/index.mjs';
import bcrypt from 'bcryptjs';

const router = express.Router()

// get profile
router.get('/profile' , (req, res) => {
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
            user.lastname =lastname
            
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
// update email

export default router