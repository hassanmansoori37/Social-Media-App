import { useState } from "react"
import Input from "../components/Input"
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
    const [repPassword, set_repPassword] = useState("")

    const handleSubmit = async (e) => {
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

            const resp = await axios.post(`${baseUrl}/api/v1/signup`, {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            })

            await axios.post(`${baseUrl}/api/v1/send-otp`, {
                email: email
            })

            navigate('/verify-email', {
                state: { email: email }
            })

        } catch (error) {
            console.error(error);
            alert(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen w-full flex">

            {/* ==================== LEFT SIDE: BRANDING ==================== */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#1877F2] via-[#4C6EF5] to-[#764ba2] items-center justify-center p-12 overflow-hidden">

                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-white max-w-md">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold mb-8 shadow-2xl">
                        C
                    </div>

                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        Connectify
                    </h1>
                    <p className="text-xl text-blue-100 leading-relaxed mb-8">
                        Connect with friends and the world around you. Share moments, chat, and be yourself.
                    </p>

                    <div className="space-y-3 text-blue-50">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Share posts & photos</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>Chat with friends</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span>
                            <span>100% free forever</span>
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

                    <div className="lg:hidden flex justify-center mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#764ba2] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#1877F2]/30">
                            C
                        </div>
                    </div>

                    <div className="text-center mb-2">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            It's quick and easy.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="First Name"
                            label="First Name"
                            value={firstname}
                            onChange={(e) => set_firstname(e.target.value)}
                            required
                        />
                        <Input
                            placeholder="Last Name"
                            label="Last Name"
                            value={lastname}
                            onChange={(e) => set_lastname(e.target.value)}
                            required
                        />
                    </div>

                    <Input
                        placeholder="Enter your Email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        required
                    />

                    <Input
                        placeholder="Enter your Password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => set_password(e.target.value)}
                        required
                    />

                    <Input
                        placeholder="Enter Confirm Password"
                        label="Confirm Password"
                        type="password"
                        value={repPassword}
                        onChange={(e) => set_repPassword(e.target.value)}
                        required
                    />

                    <p className="text-xs text-gray-500 leading-relaxed">
                        By clicking Sign Up, you agree to our{" "}
                        <span className="text-[#1877F2] font-medium hover:underline cursor-pointer">Terms</span>,{" "}
                        <span className="text-[#1877F2] font-medium hover:underline cursor-pointer">Privacy Policy</span>{" "}
                        and{" "}
                        <span className="text-[#1877F2] font-medium hover:underline cursor-pointer">Cookies Policy</span>.
                    </p>

                    <Button>Sign Up</Button>

                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                        Already have an account?{" "}
                        <Link
                            className="text-[#1877F2] font-bold hover:underline"
                            to="/login"
                        >
                            Log in
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup