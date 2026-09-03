
import { useState } from "react"
import Input  from "../components/Input"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import { baseUrl } from "../core"
import axios from "axios"
const Login = () => {
    const [email, set_email] = useState("")
    const [password, set_password] = useState("")

     const handleSubmit = async(e) => {
        e.preventDefault()
        try {

    if (!email.trim()) {
        alert("Email is required");
        return;
    }

    if (!password.trim()) {
        alert("Password is required");
        return;
    }


    const resp = await axios.post(`${baseUrl}/api/v1/login` , {
        email: email,
        password: password,
    })
     alert("Login done")
    //  navigate('/login')
    // console.log(resp.data.data)
    localStorage.setItem("token" , resp.data.data)
            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
            
        }
    }



    return(
        <form className="w-full flex flex-col justify-center items-center gap-2 mt-8"
         onSubmit={handleSubmit}>
            <h2>Login</h2>
              <Input
            placeholder="Enter your email" label="Email" required
            value={email} onChange={(e) => set_email(e.target.value)}
            />

              <Input
            placeholder="Enter your password" label="Password"
            required
            value={password} onChange={(e) => set_password(e.target.value)}
            />


            <p>Don't have an account? <Link className='text-blue-500' to="/signup">Signup</Link></p>
          <Button>Login</Button>

            
        </form>

    )
}

export default Login