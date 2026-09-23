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

    const getsinglePost = async() => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/post/${params.postId}` , {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            // console.log(resp.data.data);
            setsinglePost([resp.data.data])
            
            
        } catch (error) {
            console.error(error);
            
            
        }
    }
    return(
        <>
        <Header />
        <div className="p-4 w-[80%] m-auto">
            <PostComponent singlePost={singlePost[0]} setPost={setsinglePost} getAllPost={getsinglePost} />
            <h2 className="text-xl my-4">Liked by: </h2>
          <div className="mt-4 flex gap-2">
              {singlePost?.[0]?.like?.map((like, i) => {
                return(
                    <Link to={`/profile/${like?._id}`} key={i} className="flex w-fit gap-2 items-center border rounded-full px-2 hover:bg-gray-300 transition-colors">
                        <img className="w-6 h-6 rounded-full border" 
                        src={like.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"} alt="profile-picture" />
                        {like.firstname} {like.lastname}
                        </Link>
                )
            })}
            
        </div>
          </div>
        </>
    )
}

export default SinglePost