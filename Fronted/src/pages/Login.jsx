import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import { baseUrl } from "../core"
import axios from "axios"
import { store } from "../store/states"

const Login = () => {
    const { globalLogin } = store()

    const [email, set_email] = useState("")
    const [password, set_password] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
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

            const resp = await axios.post(`${baseUrl}/api/v1/login`, {
                email: email,
                password: password,
            })
            alert("Login done")
            console.log(resp.data.data)
            localStorage.setItem("token", resp.data.data.token)
            globalLogin(resp.data.data.user)
            navigate('/')

        } catch (error) {
            console.error(error);
            if (error.response.data.message === "email is not verified") {
                await axios.post(`${baseUrl}/api/v1/send-otp`, {
                    email: email
                })
                navigate('/verify-email', {
                    state: {
                        email: email
                    }
                })

            }
            else {
                alert(error.response.data.message)
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex">

            {/* ==================== LEFT SIDE: BRANDING ==================== */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#1877F2] via-[#4C6EF5] to-[#764ba2] items-center justify-center p-12 overflow-hidden">

                {/* Decorative blurred circles */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-white max-w-md">
                    {/* Logo */}
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold mb-8 shadow-2xl">
                        C
                    </div>

                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        Welcome Back!
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed mb-8">
                        Log in to continue connecting with your friends and sharing your moments.
                    </p>

                    {/* Feature bullets */}
                    <div className="space-y-3 text-blue-50">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>See what your friends are up to</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Share your thoughts instantly</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Chat in real-time</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== RIGHT SIDE: FORM ==================== */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] p-5 relative overflow-hidden">

                {/* Decorative circles for mobile */}
                <div className="lg:hidden absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="lg:hidden absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

                <form
                    onSubmit={handleSubmit}
                    className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-7 sm:p-9 flex flex-col gap-4"
                >

                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#764ba2] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#1877F2]/30">
                            C
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-2">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                            Login
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Welcome back! Please enter your details.
                        </p>
                    </div>

                    {/* Email */}
                    <Input
                        placeholder="Enter your Email"
                        label="Email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                    />

                    {/* Password */}
                    <Input
                        placeholder="Enter your Password"
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => set_password(e.target.value)}
                    />

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link
                            className='text-sm text-[#1877F2] font-semibold hover:underline'
                            to="/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Button */}
                    <Button>Login</Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Signup link */}
                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account?{" "}
                        <Link
                            className='text-[#1877F2] font-bold hover:underline'
                            to="/signup"
                        >
                            Sign up
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login