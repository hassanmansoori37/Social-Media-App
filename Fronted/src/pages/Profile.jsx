import axios from "axios";
import { store } from "../store/states"
import { FaPencil } from "react-icons/fa6";
import { baseUrl } from "../core";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { PostComponent } from "../components/PostComponent";


const Profile = () => {
    const params = useParams()
    const navigate = useNavigate()
    const userId = params.userId

    const { user, globalLogin, globalLogout } = store()

    const [menuOpen, setMenuOpen] = useState(false)
    const [userData, setuserData] = useState(null)
    const [post, setuserPost] = useState([])
    const [totalPost, setTotalPost] = useState(0)


    const editProfile = async () => {
        setMenuOpen(false)
        const firstname = prompt("Enter your firstname", user.firstname)
        const lastname = prompt("Enter your lastname", user.lastname)

        try {
            const resp = await axios.put(`${baseUrl}/api/v1/profile`, {
                firstname,
                lastname
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            globalLogin({
                ...user,
                firstname: firstname,
                lastname: lastname,
            })

            setuserData({
                ...userData,
                firstname: firstname,
                lastname: lastname,
            })

        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }

    const uploadFiles = async (file) => {
        if (!file) return

        const formData = new FormData()
        formData.append("my-file", file)

        try {
            const resp = await axios.put(
                `${baseUrl}/api/v1/profile-picture`,
                formData,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            )

            globalLogin({
                ...user,
                profilePicture: resp.data.url
            })

            setuserData({
                ...userData,
                profilePicture: resp.data.url
            })

        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    }

    const handleLogout = () => {
        setMenuOpen(false)
        localStorage.removeItem("token")
        globalLogout()
    }

    useEffect(() => {
        getOtherUserProfle()
        getOtherPosts()
    }, [])

    const getOtherUserProfle = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/profile/${userId || user._id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setuserData(resp.data.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getOtherPosts = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/profile/posts/${userId || user._id}?skip=${post?.length}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setuserPost([...post, ...resp.data.data])
            setTotalPost(resp.data.totalPost)

        } catch (error) {
            console.log(error);
        }
    }

    const isOwnProfile = userData?._id === user._id


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] overflow-x-hidden relative pb-32">

            {/* Decorative blur circles */}
            <div className="absolute top-20 left-[-5%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-40 right-[-5%] w-96 h-96 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto px-3 pt-6 pb-8 flex flex-col gap-5">

                {/* ==================== PROFILE HEADER CARD ==================== */}
                <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">

                    {/* Gradient cover */}
                    <div className="h-32 bg-gradient-to-r from-[#1877F2] via-[#4C6EF5] to-[#764ba2] relative">
                        {/* Back button */}
                        <button
                            onClick={() => window.history.back()}
                            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer font-bold"
                        >
                            ←
                        </button>

                        {/* ============ 3-DOT MENU (only own profile) ============ */}
                        {isOwnProfile ? (
                            <div className="absolute top-3 right-3">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer text-xl font-bold"
                                >
                                    ⋯
                                </button>

                                {/* Dropdown */}
                                {menuOpen ? (
                                    <>
                                        {/* Overlay to close */}
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setMenuOpen(false)}
                                        ></div>

                                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50">

                                            {/* Edit Profile */}
                                            <button
                                                onClick={editProfile}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors cursor-pointer"
                                            >
                                                <span className="text-base">✏️</span>
                                                Edit Profile
                                            </button>

                                            {/* Security */}
                                            <button
                                                onClick={() => {
                                                    setMenuOpen(false)
                                                    navigate('/security')
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors cursor-pointer"
                                            >
                                                <span className="text-base">🔒</span>
                                                Security
                                            </button>

                                            {/* Divider */}
                                            <div className="border-t border-gray-100"></div>

                                            {/* Logout */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                            >
                                                <span className="text-base">🚪</span>
                                                Logout
                                            </button>

                                        </div>
                                    </>
                                ) : null}
                            </div>
                        ) : null}
                    </div>

                    {/* Avatar + Info */}
                    <div className="px-6 pb-6">
                        <div className="relative -mt-16 mb-3 w-fit">
                            <img
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                src={userData?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
                                alt="profile"
                            />
                            <input
                                type="file"
                                hidden
                                id="profile-selector"
                                accept="image/*"
                                onChange={(e) => uploadFiles(e.target.files[0])}
                            />
                            {isOwnProfile ? (
                                <label htmlFor="profile-selector">
                                    <FaPencil className="cursor-pointer absolute right-1 bottom-1 bg-gradient-to-br from-[#1877F2] to-[#0A66C2] text-white w-9 h-9 p-2.5 rounded-full shadow-md hover:scale-110 transition-transform" />
                                </label>
                            ) : null}
                        </div>

                        {/* Name */}
                        <h3 className="text-2xl font-bold text-gray-900">
                            {userData?.firstname} {userData?.lastname}
                        </h3>

                        {/* Joined date */}
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-xs">
                                📅
                            </span>
                            Joined: {moment(userData?.createdAt).format("DD-MM-YYYY")}
                        </p>
                    </div>
                </div>


                {/* ==================== USER POSTS ==================== */}
                <div className="flex flex-col items-center gap-5">
                    {post.map((singlePost, index) => {
                        return (
                            <PostComponent
                                singlePost={singlePost}
                                key={index}
                                setPost={setuserPost}
                                getAllPost={getOtherPosts}
                            />
                        )
                    })}
                </div>

                {/* Load More */}
                {post.length === totalPost ? null : (
                    <div className='w-full flex justify-center my-4'>
                        <button className="px-10 py-3 rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0A66C2] text-white font-bold text-sm shadow-md shadow-[#1877F2]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer" onClick={getOtherPosts}>Load more</button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Profile