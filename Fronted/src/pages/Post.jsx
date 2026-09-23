import { useEffect, useState } from 'react'
import '../App.css'
import Form from '../components/Form'
import axios from 'axios'
import Header from '../components/Header'
import { baseUrl } from '../core'
import {PostComponent } from '../components/PostComponent'
import Input from '../components/Input'
import { useDebounce } from '../hooks/useDebounce'
import Button from '../components/Button'


const Post = () => {
  const [post, setPost] = useState([])
    const [searchText, setSearchText] = useState('')
    const [totalPost, setTotalPost] = useState(0)
  

  // Debounce the input value by 500ms
  const debouncedSearchText = useDebounce(searchText, 500)

  // Fetch posts whenever the debounced search text updates
  useEffect(() => {
    getAllPost(0 , debouncedSearchText)
  }, [debouncedSearchText])


  const getAllPost = async(skip = 0 , searchText = "") => {
    try {
     const resp = await axios.get(`${baseUrl}/api/v1/post?q=${searchText}&skip=${skip}` , {
      headers: {
        token: localStorage.getItem("token")
    }

     })
      // console.log(resp.data.data);
     if (skip == 0) {
       setPost([...resp.data.data])
      
     }else{
       setPost([...post, ...resp.data.data])

     }

      setTotalPost(resp.data.totalPost)
      
      
    } catch (error) {
      console.log(error);
    }
  }
 

  

  
  
  return(
  <div>
    <Header />
    <Form getAllPost={() => getAllPost(0 , debouncedSearchText)} />
    <div className='w-[800px] m-auto my-8'>
        <Input type='search' placeholder="Search post..." onChange={(e) => setSearchText(e.target.value)
        }/>
    </div>
  
    <div className='result flex justify-start items-start gap-2 p-2 flex-wrap'>
      {post.map((singlePost, index) => {
      return(
        <PostComponent singlePost={singlePost} key={index} setPost={setPost}  getAllPost={() => getAllPost(0 , debouncedSearchText)} />
        

        )})}
         
      
      
    </div>
    {post.length === totalPost ? null : <div className='w-full flex justify-center my-8'>
      <Button onClick={() => getAllPost(post?.length, debouncedSearchText)}>Load more</Button></div>}
  </div>
  )
}







export default Post