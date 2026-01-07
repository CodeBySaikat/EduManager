import { Route, Routes } from 'react-router-dom';
import "./index.css";
import "./App.css";

import LandingPage from './pages/Home/LandingPage.jsx';
import Admin_Dashboard from "./pages/Admin/Admin_DashBoard.jsx";
import Teacher_DashBoard from "./pages/Teacher/Teacher_DashBoard.jsx";
import Student_DashBoard from "./pages/Student/Student_DashBoard.jsx";
import Add_Student from './pages/Admin/student/add_student.jsx';

import Admin_Protected_Route from './store/Admin_Protected_Route.jsx';
import Student_Protected_Route from './store/Student_Protected_Route.jsx';



function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>

      <Route 
      path='/admin/dashboard' 
      element={
        <Admin_Protected_Route>
          <Admin_Dashboard/>
        </Admin_Protected_Route>
      }
      />

      <Route 
      path='/admin/addStudent' 
      element={
        <Admin_Protected_Route>
          <Add_Student/>
        </Admin_Protected_Route>
      } 
      />

      <Route
      path='/student/dashboard'
      element={
        <Student_Protected_Route>
          <Student_DashBoard/>
        </Student_Protected_Route>
      }
      />

    </Routes>
  );
};

export default App;