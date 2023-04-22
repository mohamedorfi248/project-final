import React from 'react';
import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,Box} from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Blog = ({title,description,imageURL,userName, isUser,id}) =>{
  const navigate = useNavigate();
  const handleEdit = (e) =>{
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest = async () =>{
    const res = await axios.delete(`http://localhost:5000/api/blogs/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  
  const handleDelete = (e) =>{
  deleteRequest().then(()=> navigate("/")).then(()=>navigate("/blogs"))
  }
    console.log(title,isUser);
  return (
    <div>
      <Card sx={{ 
        width: "40%", 
        margin:'auto', 
        marginTop:10,
        padding:2, 
        boxShadow:"5px 5px 10px #ccc",":hover:":{ boxShadow :'10px 10px 20px #ccc'} }}>
        {isUser && (
          <Box display = 'flex'>
            <IconButton onClick = {handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon color='warning' /></IconButton>
            <IconButton onClick = {handleDelete} ><DeleteForeverIcon color='error'/></IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "blue" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
            subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          <b>{userName}</b> {":"} {description}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: "40%", margin:'auto', marginTop:10,padding:2, boxShadow:"5px 5px 10px #ccc",":hover:":{ boxShadow :'10px 10px 20px #ccc'} }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          userName.chartAt(0)
        </Avatar>
      }
      title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
    />
    <CardMedia
      component="img"
      height="194"
      image="imageURL"
      alt="Paella dish"
    />
    <CardContent>
    <hr/>
    <br/>
      <Typography variant="body2" color="text.secondary">
      This impressive paella is a perfect party dish and a fun meal to cook
    together with your guests. Add 1 cup of frozen peas along with the mussels,
    if you like.
      </Typography>
    </CardContent>
  </Card>
    </div>
  );
    }


export default Blog



