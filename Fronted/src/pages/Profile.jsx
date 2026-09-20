import axios from "axios";
import { store } from "../store/states"
import { FaPencil } from "react-icons/fa6";
import { baseUrl } from "../core";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import moment from "moment";
import { PostComponent } from "../components/PostComponent";






const Profile = () => {
    const params = useParams()
    // console.log(params);
    const userId = params.userId
    
    const { user, globalLogin } = store()
    
    //  console.log(user);

    const editProfile = async () => {
        // console.log("Edit Profile");
        const firstname = prompt("Enter your firstname" , user.firstname)
         const lastname = prompt("Enter your lastname" , user.lastname)

         try {

            const resp = await axios.put(`${baseUrl}/api/v1/profile` , {
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

     const [currentPassword, setcurrentPassword] = useState("")
     const [newPassword, setnewPassword] = useState("")
     const [repPassword, setrepPassword] = useState("")
      const [userData, setuserData] = useState(null)

    const updatePassword = async() => {
        console.log("Update Password");

        if (!currentPassword) {
            alert("current password is required")
            return
            
        }
        
        if (!newPassword) {
            alert("new password is required")
            return
            
        }
        
        if (repPassword !== newPassword) {
            alert("password do not match")
            return
            
        }

        try {

            const resp = await axios.put(`${baseUrl}/api/v1/password` , {
                currentPassword: currentPassword,
                newPassword: newPassword,
            } , {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            alert("Password Updated")
            setcurrentPassword("")
            setnewPassword("")
            setrepPassword("")
            
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
            
        }
        

    }

    
    

      const uploadFiles = async(file) => {
        if (!file) return

        const formData = new FormData()
        formData.append("my-file" , file)

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

            // console.log(resp);

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

     
      const [post, setuserPost] = useState([])
       const [totalPost, setTotalPost] = useState(0)

      useEffect(() => {
        getOtherUserProfle()
        getOtherPosts()
      }, [])

      const getOtherUserProfle = async() => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/profile/${userId || user._id}` , {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setuserData(resp.data.data)

            // console.log(resp);
            
            
        } catch (error) {
            console.log(error);
            
            
        }
      }

       const getOtherPosts = async() => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/profile/posts/${userId || user._id}?skip=${post?.length}` , {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            // setuserPost(resp.data.data)
            setuserPost([...post, ...resp.data.data])
           setTotalPost(resp.data.totalPost)


            console.log(resp);
            
            
        } catch (error) {
            console.log(error);
            
            
        }
      }
     
     
     
    return(
        <div className="w-full p-4 flex flex-col gap-4 pb-32">

            {/* edit Profile */}
            <h2 className="text-3xl font-bold">
                <span className="cursor-pointer" onClick={() => window.history.back()}>{"<"}</span>
                {userData?.firstname} {userData?.lastname} Profile
                </h2>

            <div className='relative w-64 h-64'>   
             <img className="w-64 h-64 rounded-full border"
             src= {userData?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
              alt="profile" />
              <input type="file" hidden id="profile-selector" accept="image/*" 
               onChange={(e) => uploadFiles(e.target.files[0])}/>
                {userData?._id === user._id ? 
                 <label htmlFor="profile-selector">
               <FaPencil
                className="cursor-pointer absolute right-4 bottom-4 bg-white border w-8 h-8 p-2 rounded-full"
               />
               </label> : null }
             
            </div>
             <h3 className="w-full text-2xl flex gap-2">{userData?.firstname} {userData?.lastname}
              {userData?._id === user._id ? 
                <FaPencil className="cursor-pointer" onClick={editProfile}/> : null}
              </h3>

                <h3 className="w-full text-2xl flex gap-2">
                    Joined: {moment(userData?.createdAt).format("DD--MM-YYYY")}
              </h3>


             {userData?._id === user._id ? 
             <>
             <h2 className="text-3xl font-bold mt-8">Security</h2>
              <p>update your password</p>
               <Input
                  placeholder="Enter your current Password" label="Current Password" required
                  value= {currentPassword} onChange={(e) => setcurrentPassword(e.target.value)}
                />
                 <Input
                  placeholder="Enter your New Password" label="New Password" required 
                    value= {newPassword} onChange={(e) => setnewPassword(e.target.value)}/>
                     <Input
                  placeholder="Enter your Confirm New Password" label="Confirm New Password" required
                      value= {repPassword} onChange={(e) => setrepPassword(e.target.value)} />
                      <Button onClick={updatePassword}>Update Password</Button> 
                      </>
                    : null }
                      
                    {/* all post of a user */}

                    <div className='result flex justify-start items-start gap-2 p-2 flex-wrap'>
      {post.map((singlePost, index) => {
      return(
        <PostComponent singlePost={singlePost} key={index} getAllPost={getOtherPosts}  />
        
      )
  
    })}

    </div>
    {post.length === totalPost ? null : <div className='w-full flex justify-center my-8'><Button onClick={getOtherPosts}>Load more</Button></div>}
      
      

    
             
            
              
        </div>
    )
}

export default Profile