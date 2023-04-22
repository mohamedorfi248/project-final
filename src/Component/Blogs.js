import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog'

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs));
  }, []);

console.log(blogs);
return (
  <div>
    {blogs && blogs.map(
      (Blog, index => (
        <Blog 
        id ={Blog._id}
        isUser={localStorage.getItem("userId")===blogs.user._id}
        title={Blog.title} 
        description={Blog.description} 
        imageURL={Blog.image} 
        userName={Blog.user.Name}/>)))}
  </div>
);
}
export default Blogs;






