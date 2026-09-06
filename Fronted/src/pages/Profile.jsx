import axios from "axios";
import { store } from "../store/states"
import { FaPencil } from "react-icons/fa6";
import { baseUrl } from "../core";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";





const Profile = () => {
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
         } catch (error) {
            console.log(error);
            alert(error.response.data.message)
            
            
         }
        
    }

     const [currentPassword, setcurrentPassword] = useState("")
     const [newPassword, setnewPassword] = useState("")
     const [repPassword, setrepPassword] = useState("")

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
            
            
        } catch (error) {
            console.log(error);
             alert(error.response.data.message)
            
            
        }

    
      }
     
     
    return(
        <div className="w-full p-4 flex flex-col gap-4 pb-32">

            {/* edit Profile */}
            <h2 className="text-3xl font-bold">
                <span className="cursor-pointer" onClick={() => window.history.back()}>{"<"}</span>
                Your Profile
                </h2>

            <div className='relative w-64 h-64'>   
             <img className="w-64 h-64 rounded-full border"
             src= {user.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73K-hNaw6ETaPB2zU7PqIiWDgchEYFoDcaRJLGtHYRg&s=10"}
              alt="profile" />
              <input type="file" hidden id="profile-selector" accept="image/*" 
               onChange={(e) => uploadFiles(e.target.files[0])}/>
              <label htmlFor="profile-selector">
               <FaPencil
                className="cursor-pointer absolute right-4 bottom-4 bg-white border w-8 h-8 p-2 rounded-full"
               />
               </label>
            </div>
          
              <h3 className="w-full text-2xl flex gap-2">{user.firstname} {user.lastname}
                <FaPencil className="cursor-pointer" onClick={editProfile}/>
              </h3>

              {/* edit password */}

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
             
            
              
        </div>
    )
}

export default Profile