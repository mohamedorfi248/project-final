import './App.css';
import Header from './Component/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './Component/Auth';
import Blogs from './Component/Blogs'
import UserBlog from './Component/UserBlog'
import BlogDetail from './Component/BlogDetail';
import AddBlog from './Component/AddBlog';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlog />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;

