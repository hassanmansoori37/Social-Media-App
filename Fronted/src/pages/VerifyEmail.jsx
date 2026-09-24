import { useState } from "react"
import OtpInput from "../components/OtpInput"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"


const VerifyEmail = () => {


    const [otp, set_otp] = useState("")
   

    const navigate = useNavigate()

     const handleSubmit = async(e) => {
        e.preventDefault()
        try {

    
            
        } catch (error) {
            console.error(error);
            // alert(error.response.data.message)
            
        }
    }



    return(
        <form className="w-full flex flex-col justify-center items-center gap-2 mt-8"
         onSubmit={handleSubmit}>
            <h2>Verify Email</h2>
            <p>Please enter OTP code seent to {"email"}</p>
              <OtpInput
            value={otp} onChange={(e) => set_otp(e)}
            />


            <p>Don't get <Link className='text-blue-500' to="/signup">Resend OTP</Link></p>
          <Button>Verify Email</Button>

            
        </form>

    )
}

export default VerifyEmail