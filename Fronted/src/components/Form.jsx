import React, { useRef, useState } from "react"
import axios from "axios"
import { baseUrl } from "../core"

const Form = ({ getAllPost }) => {
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const fileRef = useRef(null)
    
    // ✅ Image ka naam dikhane ke liye state
    const [fileName, setFileName] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!titleRef.current.value) {
            alert("title is required")
            return
        }
        if (!descriptionRef.current.value) {
            alert("description is required")
            return
        }

        const formData = new FormData()
        formData.append("title", titleRef.current.value)
        formData.append("description", descriptionRef.current.value)

        if (fileRef.current.files.length) {
            formData.append("file", fileRef.current.files[0])
        }

        try {
            await axios.post(`${baseUrl}/api/v1/post`, formData, {
                headers: { token: localStorage.getItem("token") }
            })
            alert("post created")
            getAllPost()
            event.target.reset()
            setFileName("") // Form reset hone pe naam bhi reset karein
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5 sm:p-6 flex flex-col gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-shadow duration-300">
            
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                Create Post
            </h2>

            <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition-all focus:border-[#1877F2] focus:bg-white focus:ring-4 focus:ring-[#1877F2]/10 placeholder:text-gray-400"
                ref={titleRef}
                required
            />

            <textarea
                placeholder="Write something..."
                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 min-h-[110px] text-sm text-gray-800 resize-none outline-none transition-all focus:border-[#1877F2] focus:bg-white focus:ring-4 focus:ring-[#1877F2]/10 placeholder:text-gray-400"
                ref={descriptionRef}
                required
            />

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-600 hover:text-[#1877F2] transition-colors">
                    <span className="w-10 h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] text-lg">
                        📷
                    </span>
                    <span className="max-w-[150px] truncate">
                        {fileName ? fileName : "Add Photo"}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setFileName(e.target.files[0].name) // ✅ File select hone pe naam save
                            }
                        }}
                    />
                </label>

                <button
                    type="submit"
                    className="px-8 h-11 rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0A66C2] text-white font-bold text-sm shadow-md shadow-[#1877F2]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all cursor-pointer"
                >
                    Post
                </button>
            </div>
        </form>
    )
}

export default Form