import { useState, useEffect } from "react"
import Input from "../components/Input"
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
    const [repPassword, set_repPassword] = useState("")

    // ==================== TIMER STATES ====================
    const [timer, setTimer] = useState(60)
    const [canResend, setCanResend] = useState(false)

    // ==================== TIMER LOGIC ====================
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            setCanResend(true)
        }
    }, [timer])

    // ==================== SUBMIT ====================
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!password.trim()) {
                alert("Password is required")
                return
            }

            if (password !== repPassword) {
                alert("Passwords do not match")
                return
            }

            await axios.post(`${baseUrl}/api/v1/forgot-password-complete`, {
                email: location?.state?.email,
                otp: otp,
                newPassword: password
            })
            
            alert("Password reset successfully!")
            navigate('/login')

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Something went wrong")
        }
    }

    // ==================== RESEND OTP ====================
    const send_otp = async () => {
        if (!canResend) return; // Agar timer chal raha hai to return

        try {
            await axios.post(`${baseUrl}/api/v1/forgot-password`, {
                email: location?.state?.email
            })
            
            // Timer reset karein
            setTimer(60)
            setCanResend(false)
            alert("New OTP sent to your email!")

        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message)
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
                        🔑
                    </div>
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">Reset Password</h1>
                    <p className="text-xl text-blue-100 leading-relaxed mb-8">
                        Enter the OTP sent to your email and set a new password.
                    </p>
                    <div className="space-y-3 text-blue-50">
                        <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span><span>OTP verification</span></div>
                        <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span><span>Secure password update</span></div>
                        <div className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">✓</span><span>Instant access recovery</span></div>
                    </div>
                </div>
            </div>

            {/* ==================== RIGHT SIDE: FORM ==================== */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] p-5 relative overflow-hidden">
                <div className="lg:hidden absolute top-[-10%] left-[-10%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="lg:hidden absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-7 sm:p-9 flex flex-col gap-4">
                    
                    <div className="text-center mb-2">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                            Reset Password
                        </h2>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                            Please enter the OTP sent to <span className="font-semibold text-[#1877F2] break-all">{location?.state?.email}</span>
                        </p>
                    </div>

                    <div className="flex justify-center py-2">
                        <OtpInput value={otp} onChange={(e) => set_otp(e)} />
                    </div>

                    <Input
                        placeholder="Enter your password"
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

                    {/* ==================== TIMER UI (RESEND OTP) ==================== */}
                    <div className="text-sm text-gray-600 text-center flex flex-col items-center justify-center gap-1 mt-2">
                        <span>Didn't get the code?</span>
                        <button
                            type="button"
                            onClick={send_otp}
                            disabled={!canResend}
                            className={`font-bold transition-all ${
                                canResend 
                                ? "text-[#1877F2] hover:underline cursor-pointer" 
                                : "text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Resend OTP {!canResend && `(${timer}s)`}
                        </button>
                    </div>

                    <Button>Reset Password</Button>

                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    <p className="text-sm text-gray-600 text-center">
                        Remember your password? <Link className="text-[#1877F2] font-bold hover:underline" to="/login">Back to Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword