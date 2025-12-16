import React from "react";
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import "./index.css";
import "./App.css";

import LandingPage from './pages/Home/LandingPage.jsx';
import Admin_Dashboard from "./pages/Admin/Admin_DashBoard.jsx";
import Teacher_DashBoard from "./pages/Teacher/Teacher_DashBoard.jsx";
import Student_DashBoard from "./pages/Student/Student_DashBoard.jsx";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path='/admin' element={<Admin_Dashboard/>}/>
      <Route path='/teacher' element={<Teacher_DashBoard/>}/>
      <Route path='/student' element={<Student_DashBoard/>}/>
    </Routes>
    </>
  )
}

export default App;