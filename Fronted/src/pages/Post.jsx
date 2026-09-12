import { useEffect, useState } from 'react'
import '../App.css'
import Form from '../components/Form'
import axios from 'axios'
import moment from 'moment'
import Header from '../components/Header'
import { baseUrl } from '../core'
import { store } from '../store/states'
import {PostComponent } from '../components/PostComponent'
const Post = () => {
  const [post, setPost] = useState([])
  

  useEffect(() => {
    getAllPost()
    }, [])

  const getAllPost = async() => {
    try {
     const resp = await axios.get(`${baseUrl}/api/v1/post` , {
      headers: {
        token: localStorage.getItem("token")
    }

     })
      // console.log(resp.data.data);
      setPost(resp.data.data)
      
      
    } catch (error) {
      console.log(error);
    }
  }
 

  

  
  
  return(
  <div>
    <Header />
    <Form getAllPost={getAllPost} />
    <div className='result flex justify-start items-start gap-2 p-2 flex-wrap'>
      {post.map((singlePost, index) => {
      return(
        <PostComponent singlePost={singlePost} key={index}  getAllPost={getAllPost} />
        

        )})}
         
      
      
    </div>
  </div>
  )
}







export default Post