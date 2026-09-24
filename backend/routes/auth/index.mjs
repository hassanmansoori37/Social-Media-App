import express from 'express'
import { UserModel } from '../../models/index.mjs'
import { emailPattern } from '../../utilities/core.mjs'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const router = express.Router()

// auth apis
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

            
        }, process.env.JWT_KEY , {expiresIn: '1d'})


        

        return res.send({
            message: "login done",
            data: {
                token: token,
                user: userAccount
            }
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
            
        })    
        
    }
})

// verfication apis
router.post('/send-otp' , async (req, res) => {
    try {
        
        const email = req.body.email

      // email validation
        if (!email) {
           return res.status(400).send({
                message: "email is required"
            })
            
        }

        
        // pattern validation

        if(!emailPattern.test(email.toLowerCase())){
            return res.status(400).send({
                message: "email is invalid"
            })

        }

        const user =  await UserModel.findOne({email: email})

        if (!user) {
            return res.status(404).send({
                message: "account not found"
            })
            
        }

        // generate otp
        // hash otp and save it to database with user email;
        // send otp to email


        return res.send({
            message: "send otp"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})

router.post('/verify-otp' , async (req, res) => {
    try {
        
        const email = req.body.email
        const otp = req.body.otp

      // email validation
        if (!email) {
           return res.status(400).send({
                message: "email is required"
            })
            
        }

        
        // pattern validation

        if(!emailPattern.test(email.toLowerCase())){
            return res.status(400).send({
                message: "email is invalid"
            })

        }

        // does otp exist for email
        // is otp expired
        // is otp correct
        // mark email verify

        const user =  await UserModel.findOne({email: email})

        if (!user) {
            return res.status(404).send({
                message: "account not found"
            })
            
        }

        // generate otp
        // send otp to email


        return res.send({
            message: "verify otp"
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal server error"
        })    
        
    }
})


export default router