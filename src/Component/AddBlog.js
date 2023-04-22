import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const labelStyles ={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({title:"",description:"",imageURL:""})
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      }))
  }
  const sendRequest = async() => {
    const res = await axios.post('http://localhost:5000/api/blogs/add',{
      title: inputs.title,
      description: inputs.description ,
      image: inputs.imageURL,
      user : localStorage.getItem("userId")}).catch(err =>console.log(err));
      const data = await res.data;
      return 
        }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} borderColor="black" borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={15} display='flex' flexDirection={'column'} width={"80%"}>
          <Typography fontWeight={'bold'} padding={3} color='black' variant='h2' textAlign={'center'}>POST YOUR BLOG</Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined"/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined"/>
          <InputLabel sx={labelStyles}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='auto' variant="outlined"/>
          <Button sx={{mt:2,borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog