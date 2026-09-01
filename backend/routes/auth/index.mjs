import express from 'express'
import { UserModel } from '../../models/index.mjs'
import { emailPattern } from '../../utilities/core.mjs'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const router = express.Router()

router.post('/signup' , async (req, res) => {
    try {
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const password = req.body.password


        // required validation

        if (!firstname) {
           return res.status(400).send({
                message: "firstname is required"
            })
            
        }

        if (!lastname) {
           return res.status(400).send({
                message: "lastname is required"
            })
            
        }

        if (!email) {
           return res.status(400).send({
                message: "email is required"
            })
            
        }

        if (!password) {
          return res.status(400).send({
                message: "password is required"
            })
            
        }

        // pattern validation

        if(!emailPattern.test(email.toLowerCase())){
            return res.status(400).send({
                message: "email is invalid"
            })

        }

        // check if email exist
        const user = await UserModel.findOne({email: email.toLowerCase()})

        if (user) {
            return res.status(400).send({
                message: "emaail already taken"
            })
            
            
        }

        // generate password hash
        const passwordHash = await bcrypt.hash(password, 12)

        // store data in database
        await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: passwordHash
        })


        return res.send({
            message: "signup done"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})

router.post('/login' , async (req, res) => {
    try {
         const email = req.body.email
        const password = req.body.password


        // required validation
        if (!email) {
           return res.status(400).send({
                message: "email is required"
            })
            
        }

        if (!password) {
          return res.status(400).send({
                message: "password is required"
            })
            
        }

        // pattern validation

        if(!emailPattern.test(email.toLowerCase())){
            return res.status(400).send({
                message: "Invalid credentials"
            })

        }

        const userAccount = await UserModel.findOne({email: email.toLowerCase()})

        if (!userAccount) {
            return res.status(400).send({
                message: "Invalid Credentials"
            })
            
        }

        const isPasswordTrue = await bcrypt.compare(password, userAccount.password)
        // console.log(isPasswordTrue);

         if (!isPasswordTrue) {
            return res.status(400).send({
                message: "Invalid Credentials"
            })
            
        }

        // generate token
        const token = jsonwebtoken.sign({
            email: userAccount.email,
            _id: userAccount._id

            
        }, process.env.JWT_KEY , {expiresIn: '15m'})


        

        return res.send({
            message: "login done",
            data: token
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
            
        })    
        
    }
})
export default router