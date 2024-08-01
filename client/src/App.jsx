import React, {useContext} from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Public from './components/Public';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import Auth from './components/Auth';
import {UserContext} from "./components/context/UserProvider"

function App() {

  const {token} = useContext(UserContext)
  return (
    <div id="app">
      {token && <Navbar />}
      <Routes>
        <Route path = "/" element = {token ? <Navigate to ="/profile" /> : <Auth/>} />
        <Route path="/profile" element={!token ? <Navigate to = "/" /> : <Profile />} />
        <Route path="/public" element={!token ? <Navigate to = "/"/> :<Public />} />
      </Routes>
    </div>
  );
}

export default App;
