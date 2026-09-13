import axios from "axios"
import { useParams } from "react-router-dom"
import { baseUrl } from "../core"
import { useEffect, useState } from "react"
import { PostComponent } from "./PostComponent"
import Header from "./Header"


const SinglePost = () => {
    const params = useParams()
    const [singlePost, setsinglePost] = useState(null)

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
            setsinglePost(resp.data.data)
            
            
        } catch (error) {
            console.error(error);
            
            
        }
    }
    return(
        <>
        <Header />
        <div className="p-4 w-[80%] m-auto">
            <PostComponent singlePost={singlePost} />
        </div>
        </>
    )
}

export default SinglePost