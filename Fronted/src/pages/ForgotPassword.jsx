
import { useState } from "react"
import Input  from "../components/Input"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"
const ForgotPassword = () => {
    const navigate = useNavigate()

    
    const [email, set_email] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {

    if (!email.trim()) {
        alert("Email is required");
        return;
    }


    const resp = await axios.post(`${baseUrl}/api/v1/forgot-password` , {
      
        email: email,
    })
    //  alert("Singup done")
   
     navigate('/reset-password' , {
        state: {
            email: email
        }
     })

            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
            
        }
    }




    return(
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-2 mt-8">
            <h2>Forgot Password</h2>

              <Input
            placeholder="Enter your email" label="Email"
            value={email} onChange={(e) => set_email(e.target.value)}
            required
            />
           

          <Button>ForgotPassword</Button>

            
        </form>

    )
}

export default ForgotPassword