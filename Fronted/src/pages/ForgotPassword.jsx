import { useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { baseUrl } from "../core"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, set_email] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email.trim()) {
            alert("Email is required")
            return
        }

        try {
            const resp = await axios.post(`${baseUrl}/api/v1/forgot-password`, {
                email: email
            })

            alert("Reset link sent to your email!")
         navigate('/reset-password' , {
        state: {
            email: email
        }
     })
            // ya jo bhi aap karte ho

        } catch (error) {
            console.error(error)
            alert(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="min-h-screen w-full flex">

            {/* ==================== LEFT SIDE: BRANDING ==================== */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#1877F2] via-[#4C6EF5] to-[#764ba2] items-center justify-center p-12 overflow-hidden">

                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-white max-w-md">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold mb-8 shadow-2xl">
                        🔒
                    </div>

                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        Forgot Password?
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed mb-8">
                        No worries! Enter your email and we'll send you a link to reset your password.
                    </p>

                    <div className="space-y-3 text-blue-50">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Secure password reset</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Email verification link</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Fast account recovery</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* ==================== RIGHT SIDE: FORM ==================== */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] p-5 relative overflow-hidden">

                <div className="lg:hidden absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="lg:hidden absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

                <form
                    onSubmit={handleSubmit}
                    className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-7 sm:p-9 flex flex-col gap-4"
                >

                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#764ba2] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#1877F2]/30">
                            🔒
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-2">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                            Forgot Password
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Enter your email to reset your password.
                        </p>
                    </div>

                    {/* Email */}
                    <Input
                        placeholder="Enter your Email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        required
                    />

                    {/* Button */}
                    <Button>Send Reset Link</Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Back to Login */}
                    <p className="text-sm text-gray-600 text-center">
                        Remember your password?{" "}
                        <Link
                            className="text-[#1877F2] font-bold hover:underline"
                            to="/login"
                        >
                            Back to Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword