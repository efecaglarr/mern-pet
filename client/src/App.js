import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Create from "./components/Create/Create";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from '@react-oauth/google'

import './App.css'

const App = () => {

  const user = JSON.parse(localStorage.getItem("profile"))
  const [currentId, setCurrentId] = useState(0);

  return (
    <GoogleOAuthProvider clientId="673520078178-jved4m4j34nkggqqu6c1vbjiudnk67rs.apps.googleusercontent.com">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={'/posts'} />} />
          <Route path="/posts" element={<Home currentId={currentId} setCurrentId={setCurrentId}/>} />
          <Route path="/posts/search" element={<Home currentId={currentId} setCurrentId={setCurrentId}/>} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create" element={<Create currentId={currentId} setCurrentId={setCurrentId}/>} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to='/posts'/>} />
        </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
