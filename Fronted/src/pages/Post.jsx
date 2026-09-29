import { useEffect, useState } from 'react'
import '../App.css'
import Form from '../components/Form'
import axios from 'axios'
import Header from '../components/Header'
import { baseUrl } from '../core'
import { PostComponent } from '../components/PostComponent'
import Input from '../components/Input'
import { useDebounce } from '../hooks/useDebounce'
import Button from '../components/Button'

const Post = () => {
  const [post, setPost] = useState([])
  const [searchText, setSearchText] = useState('')
  const [totalPost, setTotalPost] = useState(0)

  const debouncedSearchText = useDebounce(searchText, 500)

  useEffect(() => {
    getAllPost(0, debouncedSearchText)
  }, [debouncedSearchText])

  const getAllPost = async (skip = 0, searchText = "") => {
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/post?q=${searchText}&skip=${skip}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      if (skip == 0) {
        setPost([...resp.data.data])
      } else {
        setPost([...post, ...resp.data.data])
      }
      setTotalPost(resp.data.totalPost)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F2F5] via-[#E8EEF7] to-[#F5F0FA] overflow-x-hidden">

      <Header />

      {/* Background decorative circles */}
      <div className="relative">
        <div className="absolute top-20 left-[-5%] w-72 h-72 bg-[#1877F2]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-40 right-[-5%] w-96 h-96 bg-[#764ba2]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">

          <div className="px-2">
            <Form getAllPost={() => getAllPost(0, debouncedSearchText)} />
          </div>

          <div className="max-w-2xl mx-auto my-6 px-2">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                🔍
              </span>
              <Input
                type='search'
                placeholder="Search post..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto flex flex-col gap-5 px-2 pb-8">
            {post.map((singlePost, index) => {
              return (
                <PostComponent
                  singlePost={singlePost}
                  key={index}
                  setPost={setPost}
                  getAllPost={() => getAllPost(0, debouncedSearchText)}
                />
              )
            })}
          </div>

          {post.length === totalPost ? null : (
            <div className='w-full flex justify-center my-8'>
              <button className="px-10 py-3 rounded-xl bg-gradient-to-r from-[#1877F2] to-[#0A66C2] text-white font-bold text-sm shadow-md shadow-[#1877F2]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer" onClick={() => getAllPost(post?.length, debouncedSearchText)}>
                Load more
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Post