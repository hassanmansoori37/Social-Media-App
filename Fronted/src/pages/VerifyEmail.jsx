import { useState } from "react"
import OtpInput from "../components/OtpInput"
import Button from "../components/Button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"


const VerifyEmail = () => {


    const [otp, set_otp] = useState("")
    const location = useLocation()
   

    const navigate = useNavigate()

     const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post(`${baseUrl}/api/v1/verify-otp` , {
                    email: location?.state?.email,
                    otp: otp
                })
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
        <form className="w-full flex flex-col justify-center items-center gap-2 mt-8"
         onSubmit={handleSubmit}>
            <h2>Verify Email</h2>
            <p>Please enter OTP code seent to <b>{location?.state?.email}</b></p>
              <OtpInput
            value={otp} onChange={(e) => set_otp(e)}
            />


            <p>Don't get <b className='text-blue-500 cursor-pointer' onClick={send_otp}>Resend OTP</b></p>
          <Button>Verify Email</Button>

            
        </form>

    )
}

export default VerifyEmail