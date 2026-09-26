import mongoose from "mongoose"

const emailOtpSchema = new mongoose.Schema({
  

      email: {
        type: String,
        required: true,
        lowercase: true
        
    },
    otpCodeHash: {
        type: String,
        required: true,
    }
    

}, {timestamps: true})

export const emailOtpModel = mongoose.model('email-otps' , emailOtpSchema) 