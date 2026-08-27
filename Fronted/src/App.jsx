import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import axios from 'axios'
import moment from 'moment'

const App = () => {
  const [post, setPost] = useState([])

  useEffect(() => {
    getAllPost()
    }, [])

  const getAllPost = async() => {
    try {
      const resp = await axios.get("http://localhost:409/api/v1/post")
      // console.log(resp.data.data);
      setPost(resp.data.data)
      
      
    } catch (error) {
      console.error(error);
    }
  }

  const deletePost = async(postId) => {
    if(!postId){
      alert("post id is required")
      return
    }

    // console.log(postId);

    try {
      const resp = await axios.delete(`http://localhost:409/api/v1/post/${postId}`)
      alert("post delete")
      getAllPost()
      
    } catch (error) {
      console.error(error);
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
     const resp = await axios.put(`http://localhost:409/api/v1/post/${postId}` , {
        title: editTitle,
        description: editDesc,
      })

      alert("post edit")
      getAllPost()
      
    } catch (error) {
      console.error(error);
    }
      
      
    }

  

  
  
  return(
  <div>
    <Form getAllPost={getAllPost} />
    <div className='result flex justify-start items-start gap-2 p-2 flex-wrap'>
      {post.map((singlePost, index) => {
      return(
        <div key={index} className='border-2 p-2 flex flex-col gap-2 rounded-lg w-full'>
          <b>{moment(singlePost.id).fromNow()}</b>
          <h2 className='font-bold text-2xl'>{singlePost.title}</h2>
          <p>{singlePost.description}</p>

          <div className='flex gap-2'>
            <button onClick={() => editPost(singlePost._id, singlePost.title,singlePost.description)}
             className='bg-green-600 cursor-pointer hover:bg-green-500 transition-colors
            duration-400 text-white text-xs py-2 px-4 rounded-md'>Edit</button>
            <button onClick={() => deletePost(singlePost._id)}
             className='bg-red-600 hover:bg-red-500 transition-colors duration-400 cursor-pointer
             text-white text-xs py-2 px-4 rounded-md'>Delete</button>
          </div>
        </div>
      )
  
    })}

    </div>
  </div>
  )
}






export default App