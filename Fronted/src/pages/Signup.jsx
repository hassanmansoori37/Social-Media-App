
import { useState } from "react"
import Input  from "../components/Input"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"
const Signup = () => {
    const navigate = useNavigate()

    const [firstname, set_firstname] = useState("")
    const [lastname, set_lastname] = useState("")
    const [email, set_email] = useState("")
    const [password, set_password] = useState("")
    const [repPassword , set_repPassword] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {

    if (!firstname.trim()) {
        alert("Firstname is required");
        return;
    }

    if (!lastname.trim()) {
        alert("Lastname is required");
        return;
    }

    if (!email.trim()) {
        alert("Email is required");
        return;
    }

    if (!password.trim()) {
        alert("Password is required");
        return;
    }

    if (password !== repPassword) {
        alert("Passwords do not match");
        return;
    }

    const resp = await axios.post(`${baseUrl}/api/v1/signup` , {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
    })
     alert("Singup done")
     navigate('/login')

            
        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
            
        }
    }


    return(
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-2 mt-8">
            <h2>SignUp</h2>
            <Input
            placeholder="Enter your firstname" label="FirstName"
            value={firstname} onChange={(e) => set_firstname(e.target.value)}
            required
            />

              <Input
            placeholder="Enter your lastname" label="LastName"
            value={lastname} onChange={(e) => set_lastname(e.target.value)}
            required
            />

              <Input
            placeholder="Enter your email" label="Email"
            value={email} onChange={(e) => set_email(e.target.value)}
            required
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

            <p>Already have an account? <Link className='text-blue-500' to="/login">Login</Link></p>
          <Button>Signup</Button>

            
        </form>

    )
}

export default Signup