import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { baseUrl } from '../core'
import { store } from '../store/states'
import { FaTrash, FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa'

const CommentSection = ({ postId }) => {
    const { user } = store()
    const [comments, setComments] = useState([])
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(false)

    // Comments load karein jab component mount ho
    useEffect(() => {
        if (postId) getComments()
    }, [postId])

    const getComments = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/post/comment/${postId}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setComments(resp.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // Naya comment add karein
    const addComment = async (e) => {
        e.preventDefault()
        if (!text.trim()) return

        setLoading(true)
        try {
            const resp = await axios.post(
                `${baseUrl}/api/v1/post/comment/${postId}`,
                { text: text },
                { headers: { token: localStorage.getItem("token") } }
            )
            setComments([resp.data.data, ...comments])
            setText("")
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    // Comment delete karein
    const deleteComment = async (commentId) => {
        if (!confirm("Delete this comment?")) return

        try {
            await axios.delete(`${baseUrl}/api/v1/post/comment/${commentId}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setComments(comments.filter(c => c._id !== commentId))
        } catch (error) {
            console.log(error);
            alert(error?.response?.data?.message)
        }
    }

    // ==================== LIKE / DISLIKE ====================
    const reactToComment = async (commentId, action) => {
        try {
            const resp = await axios.post(
                `${baseUrl}/api/v1/comment/reaction/${commentId}`,
                { action: action },
                { headers: { token: localStorage.getItem("token") } }
            )

            setComments(comments.map((e) => {
                if (e._id === commentId) {
                    return { ...e, like: resp.data.like, dislike: resp.data.dislike }
                }
                return e
            }))

        } catch (error) {
            console.log(error);
        }
    }

    // ==================== CHECK: USER NE LIKE/DISLIKE KIYA? ====================
    const checkReaction = (array, userId) => {
        if (!array) return false
        for (let i = 0; i < array.length; i++) {
            if (array[i] === userId || array[i]?._id === userId) {
                return true
            }
        }
        return false
    }

    return (
        <div className="w-full max-w-[650px] mx-auto mt-4 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-5">

            {/* ==================== HEADING ==================== */}
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-[#1877F2] to-[#764ba2] bg-clip-text text-transparent">
                Comments ({comments.length})
            </h3>

            {/* ==================== COMMENT INPUT ==================== */}
            <form onSubmit={addComment} className="flex gap-2 mb-5">
                <img
                    src={user?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1877F2]/20 shrink-0"
                />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 h-10 px-4 text-sm border-2 border-gray-200 bg-gray-50 rounded-xl outline-none transition-all focus:border-[#1877F2] focus:bg-white focus:ring-4 focus:ring-[#1877F2]/10"
                />
                <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="px-5 h-10 bg-gradient-to-r from-[#1877F2] to-[#0A66C2] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#1877F2]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                >
                    {loading ? "..." : "Send"}
                </button>
            </form>

            {/* ==================== COMMENTS LIST ==================== */}
            {comments.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center py-3">
                    No comments yet. Be the first to comment!
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {comments.map((comment) => {
                        const isLiked = checkReaction(comment.like, user?._id)
                        const isDisliked = checkReaction(comment.dislike, user?._id)

                        return (
                            <div key={comment._id} className="flex gap-3 group">

                                {/* ✅ Avatar — Link (click → profile) */}
                                <Link to={`/profile/${comment.userId?._id}`} className="shrink-0">
                                    <img
                                        src={comment.userId?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
                                        alt="avatar"
                                        className="w-9 h-9 rounded-full object-cover hover:ring-2 hover:ring-[#1877F2]/40 cursor-pointer transition-all"
                                    />
                                </Link>

                                {/* Comment content */}
                                <div className="flex-1 min-w-0">

                                    {/* Comment bubble */}
                                    <div className="bg-gray-100 rounded-2xl px-4 py-2">

                                        {/* User name + delete */}
                                        <div className="flex items-center justify-between gap-2 mb-0.5">

                                            {/* ✅ Name — Link (click → profile) */}
                                            <Link
                                                to={`/profile/${comment.userId?._id}`}
                                                className="font-bold text-[13px] text-gray-900 truncate hover:text-[#1877F2] hover:underline cursor-pointer transition-colors"
                                            >
                                                {comment.userId?.firstname} {comment.userId?.lastname}
                                            </Link>

                                            {/* Delete button (sirf owner) */}
                                            {user?._id === comment.userId?._id && (
                                                <button
                                                    onClick={() => deleteComment(comment._id)}
                                                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity cursor-pointer"
                                                >
                                                    <FaTrash className="text-xs" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Comment text */}
                                        <p className="text-sm text-gray-700 break-words">
                                            {comment.text}
                                        </p>

                                    </div>

                                    {/* ==================== LIKE / DISLIKE BUTTONS ==================== */}
                                    <div className="flex items-center gap-4 mt-1 ml-2 text-xs">

                                        {/* Like */}
                                        <button
                                            onClick={() => reactToComment(comment._id, "like")}
                                            className={`flex items-center gap-1 cursor-pointer transition-colors
                                                ${isLiked ? "text-[#1877F2]" : "text-gray-500 hover:text-[#1877F2]"}`}
                                        >
                                            {isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                                            <span>{comment.like?.length || 0}</span>
                                        </button>

                                        {/* Dislike */}
                                        <button
                                            onClick={() => reactToComment(comment._id, "dislike")}
                                            className={`flex items-center gap-1 cursor-pointer transition-colors
                                                ${isDisliked ? "text-[#1877F2]" : "text-gray-500 hover:text-[#1877F2]"}`}
                                        >
                                            {isDisliked ? <FaThumbsDown /> : <FaRegThumbsDown />}
                                            <span>{comment.dislike?.length || 0}</span>
                                        </button>

                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    )
}

export default CommentSection