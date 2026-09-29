
import { Link, useNavigate } from 'react-router-dom'
import { FaRegThumbsUp as LikeEmpty, FaThumbsUp as LikeFill } from "react-icons/fa";
import { FaCommentAlt as CommentIcon } from "react-icons/fa";
import { IoMdShare as ShareIcon } from "react-icons/io";
import moment from 'moment'
import { store } from '../store/states';
import axios from 'axios';
import { baseUrl } from '../core';


export const PostComponent = ({singlePost, setPost }) => {
  const {user} = store()
  const navigate = useNavigate()

   const deletePost = async(postId) => {
    if(!postId){
      alert("post id is required")
      return
    }

    // console.log(postId);

    try {
      const resp = await axios.delete(`${baseUrl}/api/v1/post/${postId}` , {
         headers: {
        token: localStorage.getItem("token")
    }


      })
      setPost((prev) => prev.filter((post) => post?._id?.toString() !== singlePost?._id?.toString() ))
      alert("post delete")
      // getAllPost()
      
    } catch (error) {
      console.log(error);
    }
  }

    const editPost = async(postId, title, description) => {
    if(!postId){
      alert("post id is required")
      return
    }

  

    const editTitle = prompt("Enter edit title", title)
    const editDesc = prompt("Enter edit description", description)

    // console.log(postId);

    try {
     const resp = await axios.put(`${baseUrl}/api/v1/post/${postId}` , {
        title: editTitle,
        description: editDesc,
      },
       {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

      setPost((prev) => prev.map((post) => post?._id?.toString() === singlePost?._id?.toString() ? 
      {
        ...post,
         title: editTitle,
         description: editDesc,

      }: post ))

      alert("post edit")
      // getAllPost()
      
    } catch (error) {
      console.log(error);
    }
      
      
    }
    const sharePost = async() => {
      // console.log(singlePost._id);
   
      try {
      // Use the native Clipboard API
         const url = `${window.location.host}/post/${singlePost._id}`
      await navigator.clipboard.writeText(url);
     alert("Linked copied")
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
      
    }

    const isLiked = singlePost?.like?.find((singleUser) => singleUser?._id?.toString() === user?._id?.toString())

    const likePost = async() => {
      try {
        const resp = await axios.post(`${baseUrl}/api/v1/post/like/${singlePost?._id}`, {} , {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        // console.log("like done");
        // getAllPost()
        if (isLiked) {
          // array mai sy apni id nikalni ha
          // like ke array mese apna user nikala 
          const updatedLiked = singlePost?.like?.filter((like) => like?._id?.toString() !== user?._id?.toString() )
          
          // current post ko update krdia like ke array ko
          setPost((prev) => prev.map((post) => post?._id?.toString() === singlePost?._id?.toString() ? {
            ...post,
            like: updatedLiked,

          }: post))
          
        } else {
          // aray mai apni id dalni ha with details
          // like ke array me apna user dalna ha
          const updatedLiked = [
            ...singlePost?.like,
            {
              firstname: user?.firstname,
              lastname: user?.lastname,
              _id: user?._id,
              profilePicture: user?.profilePicture,
          
            }
          ]
          // current post ko update krdia like ke array ko
          setPost((prev) => prev.map((post) => post?._id?.toString() === singlePost?._id?.toString() ? {
            ...post,
            like: updatedLiked,

          }: post))
          
          
        }
      
        
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message)
        
        
      }

    }

    // console.log(singlePost?.like);
    
    

 return (
  <div className="w-full max-w-[650px] mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


    {/* Header */}
    <Link
      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition"
      to={`/profile/${singlePost?.userId?._id}`}
    >
      <img
        className="w-11 h-11 rounded-full object-cover border border-gray-200"
        src={singlePost?.userId?.profilePicture}
        alt="profile-picture"
      />

      <div className="flex flex-col min-w-0">
        <h3 className="text-[20px] font-semibold text-gray-900">
          {singlePost?.userId?.firstname} {singlePost?.userId?.lastname}
        </h3>

        <span className="text-xs text-gray-500">
          {moment(singlePost?.createdAt)?.fromNow()}
        </span>
      </div>
    </Link>

    {/* Post Content */}
    <Link to={`/post/${singlePost?._id}`}>
      <div className="px-4 pb-3">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          {singlePost?.title}
        </h2>

        <p className="text-[20px] text-gray-700 leading-relaxed">
          {singlePost?.description}
        </p>
      </div>
    </Link>

    {/* Post Image */}
    {singlePost?.imageUrl ? (
      <a
        href={singlePost.imageUrl}
        target="_blank"
        rel="noreferrer"
        className="block w-full"
      >
        <img
          className="w-full max-h-[500px] object-contain bg-gray-100"
          src={singlePost.imageUrl}
          alt="post-image"
        />
      </a>
    ) : null}

    {/* Edit / Delete */}
    {user?._id === singlePost?.userId?._id ? (
      <div className="flex gap-2 px-4 py-3">
        <button
          onClick={() =>
            editPost(
              singlePost?._id,
              singlePost?.title,
              singlePost?.description
            )
          }
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-4 rounded-lg cursor-pointer transition"
        >
          Edit
        </button>

        <button
          onClick={() => deletePost(singlePost?._id)}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 px-4 rounded-lg cursor-pointer transition"
        >
          Delete
        </button>
      </div>
    ) : null}

    {/* Like Count */}

<div className="px-4 pt-3 pb-2 text-sm text-gray-500">
  <span className="font-medium">
    {singlePost?.like?.length || 0} {singlePost?.like?.length === 1 ? "like" : "likes"}
  </span>
</div>

    {/* Actions */}
    <div className="grid grid-cols-3 px-2 py-2 gap-1">

      <button
        onClick={likePost}
        className="cursor-pointer py-2.5 rounded-lg flex justify-center items-center gap-2
        text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
      >
        {isLiked ? (
          <LikeFill className="text-blue-600 text-lg" />
        ) : (
          <LikeEmpty className="text-lg" />
        )}
        <span className={isLiked ? "text-blue-600" : ""}>
          Like
        </span>
      </button>

      <button
        onClick={() => navigate(`/post/${singlePost._id}`)}
        className="cursor-pointer py-2.5 rounded-lg flex justify-center items-center gap-2
        text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
      >
        <CommentIcon className="text-lg" />
        Comment
      </button>

      <button
        onClick={sharePost}
        className="cursor-pointer py-2.5 rounded-lg flex justify-center items-center gap-2
        text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
      >
        <ShareIcon className="text-lg" />
        Share
      </button>

    </div>
  </div>
)
}  
