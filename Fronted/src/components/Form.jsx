import React from "react"
import { useRef } from "react"
import axios from "axios"
import { baseUrl } from "../core"

const Form = ({getAllPost}) => {
    const titleRef = useRef(null)
    const descriptionRef = useRef (null)

    const handleSubmit = async(event) => {
        event.preventDefault()

        if(!titleRef.current.value){
         alert("title is required")
         return
        }

        if(!descriptionRef.current.value){
         alert("description is required")
         return
        }

        try {
            const resp = await axios.post(`${baseUrl}/api/v1/post`
             , {
                title: titleRef.current.value,
                description: descriptionRef.current.value
            } , {
                headers: {
                 token: localStorage.getItem("token")
                }
            })
            alert("post created")
            getAllPost()
            event.target.reset()
            
        } catch (error) {
            console.log(error);       
            
        }
        
    }


    return(
        <form className="flex flex-col justify-center items-center gap-4 p-4" onSubmit={handleSubmit}>
            <h2 className="w-full text-center font-bold uppercase text-2xl">MongoDB Crud</h2>
            <input type="text" placeholder="title..." className="border-2 p-2 rounded-lg w-full"
            ref={titleRef} required/>
            <textarea placeholder="description..." className="border-2 p-2 rounded-lg w-full"
            ref={descriptionRef} required></textarea>
            <button className="bg-blue-800 text-white rounded-lg px-16 py-2
             cursor-pointer hover:bg-blue-600 transition-colors duration-400
              ml-auto" type="submit">Submit</button>
        </form>
    )
}

export default Form