import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../Store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate()
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({name:"",email:"",password:""})
  const [isSignup, setisSignup] = useState(false)
  const handlechange = (e) =>{ 
  setInputs((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
    }))
    
    setInputs((prevState)=>({...prevState,[e.target.name] : e.target.value}))}
  const sendRequest = async (type="login") =>{
    const res = await axios.post('http://localhost:5000/api/user', "$ {type}" , {
      name: inputs.name,
      email: inputs.email, password:inputs.password
    }).catch(err => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  }
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(inputs);
      if (isSignup) {
        sendRequest("signup")
        .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>dispath(authActions.login()))
        .then(()=>navigate("/blogs"))
      } else {
        sendRequest()
        .then((data)=>localStorage.setItem("userId",data.user._id))
        .then(()=>dispath(authActions.login()))
        .then(()=>navigate("/blogs"))
      }
    };
  
    

return <div>
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection={'column'} alignItems='center' justifycontent={'center'}  boxShadow="10px 10px 20px #ccc" padding={5} borderRadius={5} maxWidth={400} margin='auto' marginTop={15}>
        <Typography variant='h2' padding={3} textAlign='center'>{isSignup ? "Signup" : "Login"} </Typography>
  {isSignup &&<TextField name="name" onChange={handlechange} value={inputs.name} placeholder='Name' margin='normal'/>}
        <TextField name="email" onChange={handlechange} value={inputs.email}type={"email"} placeholder='Email' margin='normal'/>
        <TextField name="password" onChange={handlechange} value={inputs.password} type={"password"}placeholder='Password' margin='normal'/>
        <Button type='submit' variant="contained" sx={{borderRadius:3, marginTop:3}} color="warning">Submit</Button>
        <Button onClick={()=>setisSignup(!isSignup)} sx={{borderRadius:3, marginTop:3}}>Change To {isSignup ? "login" : "Signup"}</Button>
      </Box>
    </form>
    </div>
  
}

export default Auth