import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { baseUrl } from "../core"
import { useEffect, useState } from "react"
import { PostComponent } from "./PostComponent"
import Header from "./Header"


const SinglePost = () => {
    const params = useParams()
    const [singlePost, setsinglePost] = useState([])

    useEffect(() => {
        getsinglePost()
    }, [])

    const getsinglePost = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/post/${params.postId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setsinglePost([resp.data.data])

        } catch (error) {
            console.error(error);
        }
    }

    const likes = singlePost?.[0]?.like || []
    const likesCount = likes.length

    return (
        <>
            <Header />

            {/* Main wrapper with gradient background */}
            <div className="min-h-screen bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] overflow-x-hidden relative">

                {/* Decorative blur circles */}
                <div className="absolute top-20 left-[-5%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-40 right-[-5%] w-96 h-96 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-2xl mx-auto px-3 py-6">

                    {/* ==================== POST ==================== */}
                    <PostComponent
                        singlePost={singlePost[0]}
                        setPost={setsinglePost}
                        getAllPost={getsinglePost}
                    />

                    {/* ==================== LIKED BY SECTION ==================== */}
                    <div className="mt-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5">

                        {/* Header */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white text-sm shadow-md shadow-red-500/30">
                                ❤️
                            </span>
                            <h2 className="text-lg font-bold bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                                Liked by
                            </h2>
                            <span className="ml-auto text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                {likesCount} {likesCount === 1 ? "person" : "people"}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 mb-4"></div>

                        {/* Likes List */}
                        {likesCount === 0 ? (
                            <p className="text-sm text-gray-500 italic text-center py-3">
                                No likes yet. Be the first to like this post! 👍
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {likes.map((like, i) => {
                                    return (
                                        <Link
                                            to={`/profile/${like?._id}`}
                                            key={i}
                                            className="group flex items-center gap-2 bg-gray-50 hover:bg-[#1877F2]/10 border border-gray-200 hover:border-[#1877F2]/30 rounded-full pl-1 pr-4 py-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                                        >
                                            {/* Avatar with gradient ring */}
                                            <div className="relative shrink-0">
                                                <img
                                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white group-hover:ring-[#1877F2]/30 transition-all"
                                                    src={like?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
                                                    alt="profile-picture"
                                                />
                                            </div>

                                            {/* Name */}
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-[#1877F2] transition-colors">
                                                {like?.firstname} {like?.lastname}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </>
    )
}

export default SinglePost