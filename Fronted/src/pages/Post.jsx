import { useEffect, useState } from 'react'
import '../App.css'
import Form from '../components/Form'
import axios from 'axios'
import Header from '../components/Header'
import { baseUrl } from '../core'
import {PostComponent } from '../components/PostComponent'
import Input from '../components/Input'
import { useDebounce } from '../hooks/useDebounce'


const Post = () => {
  const [post, setPost] = useState([])
    const [searchText, setSearchText] = useState('')
  

  // Debounce the input value by 500ms
  const debouncedSearchText = useDebounce(searchText, 500)

  // Fetch posts whenever the debounced search text updates
  useEffect(() => {
    getAllPost(debouncedSearchText)
  }, [debouncedSearchText])


  const getAllPost = async(searchText = "") => {
    try {
     const resp = await axios.get(`${baseUrl}/api/v1/post?q=${searchText}` , {
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
    <Form getAllPost={() => getAllPost(debouncedSearchText)} />
    <div className='w-[800px] m-auto my-8'>
        <Input type='search' placeholder="Search post..." onChange={(e) => setSearchText(e.target.value)
        }/>
    </div>
  
    <div className='result flex justify-start items-start gap-2 p-2 flex-wrap'>
      {post.map((singlePost, index) => {
      return(
        <PostComponent singlePost={singlePost} key={index}  getAllPost={() => getAllPost(debouncedSearchText)} />
        

        )})}
         
      
      
    </div>
  </div>
  )
}







export default Post