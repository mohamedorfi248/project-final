import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'


const UserBlog = () => {
  const [user, setUser] = useState()
  const id = localStorage.getItem("userId")
  const sendRequest = async () =>{
  const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch(err=>console.log(err))
  const data = await res.data;
  return data
  }
  useEffect(() => {
    sendRequest().then((data)=>setUser(data.user));
   },[])
   console.log(user)
  return (
    <div>
      {user && user.blogs && user.blogs.map((Blog, index => (
        <Blog 
        id ={Blog._id}
        key ={index} 
        isUser={true}
        title={Blog.title} 
        description={Blog.description} 
        imageURL={Blog.image} 
        userName={user.Name}/>)))}
    </div>
  )
}

export default UserBlog