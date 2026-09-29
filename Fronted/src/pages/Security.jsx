import { useState } from "react"
import axios from "axios"
import { baseUrl } from "../core"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

const Security = () => {
  const navigate = useNavigate()

  const [currentPassword, setcurrentPassword] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [repPassword, setrepPassword] = useState("")

  const updatePassword = async () => {
    console.log("Update Password");

    if (!currentPassword) {
      alert("current password is required")
      return
    }

    if (!newPassword) {
      alert("new password is required")
      return
    }

    if (repPassword !== newPassword) {
      alert("password do not match")
      return
    }

    try {
      const resp = await axios.put(`${baseUrl}/api/v1/password`, {
        currentPassword: currentPassword,
        newPassword: newPassword,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      alert("Password Updated")
      setcurrentPassword("")
      setnewPassword("")
      setrepPassword("")

    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] overflow-x-hidden relative p-4">

      {/* Decorative blur circles */}
      <div className="absolute top-20 left-[-5%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 right-[-5%] w-96 h-96 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-xl mx-auto pt-6">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-gray-600 hover:text-[#1877F2] font-semibold text-sm transition-colors cursor-pointer"
        >
          ← Back
        </button>

        {/* Security Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8">

          {/* Heading */}
          <div className="flex items-center gap-3 mb-1">
            <span className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1877F2] to-[#764ba2] flex items-center justify-center text-white text-xl shadow-md shadow-[#1877F2]/30">
              🔒
            </span>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
              Security
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6 ml-14">
            Update your password to keep your account safe.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-6"></div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter your current Password"
              label="Current Password"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setcurrentPassword(e.target.value)}
            />
            <Input
              placeholder="Enter your New Password"
              label="New Password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <Input
              placeholder="Enter your Confirm New Password"
              label="Confirm New Password"
              type="password"
              required
              value={repPassword}
              onChange={(e) => setrepPassword(e.target.value)}
            />

            <Button onClick={updatePassword}>Update Password</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Security