import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from '@react-oauth/google'

import './App.css'

const App = () => {

  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <GoogleOAuthProvider clientId="673520078178-jved4m4j34nkggqqu6c1vbjiudnk67rs.apps.googleusercontent.com">
      {/* <Container> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to={'/posts'} />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to='/posts'/>} />
        </Routes>
      {/* </Container> */}
    </GoogleOAuthProvider>
  );
};

export default App;
