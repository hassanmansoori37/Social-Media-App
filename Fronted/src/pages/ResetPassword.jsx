
import { useState } from "react"
import Input  from "../components/Input"
import Button from "../components/Button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"
import OtpInput from "../components/OtpInput"

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
     const [otp, set_otp] = useState("")
      const [password, set_password] = useState("")
    const [repPassword , set_repPassword] = useState("")


    

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {

     if (!password.trim()) {
        alert("Password is required");
        return;
    }

    if (password !== repPassword) {
        alert("Passwords do not match");
        return;
    }
    


    const resp = await axios.post(`${baseUrl}/api/v1/forgot-password-complete` , {
      
        email: location?.state?.email,
        otp: otp,
        newPassword: password
    })
    //  alert("Singup done")
   
     navigate('/login')

            
    } catch (error) {
            console.error(error);
            alert(error.response.data.message)
            
        }
    }

     const send_otp = async() => {
        try {
             await axios.post(`${baseUrl}/api/v1/send-otp` , {
                    email: location?.state?.email
                })
            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)

            
        }
    }




    return(
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-2 mt-8">
            <h2>Reset Password</h2>
            <p>Please enter OTP code seent to <b>{location?.state?.email}</b></p>
                 <OtpInput
                 value={otp} onChange={(e) => set_otp(e)}
                 />
                <Input
                 placeholder="Enter your password" label="Password"
                 value={password} onChange={(e) => set_password(e.target.value)}
                 required
                 />
                 
                 <Input
                placeholder="Enter Confirm Password" label="ConfirmPassword"
                 value={repPassword} onChange={(e) => set_repPassword(e.target.value)}
                 required
                 />

            

            <p>Don't get <b className='text-blue-500 cursor-pointer' onClick={send_otp}>Resend OTP</b></p>

          <Button>ResetPassword</Button>

            
        </form>

    )
}

export default ResetPassword