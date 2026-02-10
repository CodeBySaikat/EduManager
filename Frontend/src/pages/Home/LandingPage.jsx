import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();
  
  const [adminId, setAdminId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");

  const [adminPassword, setAdminPassword] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [studentPassword, setStudentPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  //for login function
  const handleLogin = async(role) => {
    try {
      setLoading(true);
      setError(null);

      let payload = {};

      //diff role payload
      if(role === "admin") {
        payload = {adminId, password: adminPassword};
      } 
      else if (role === "teacher") {
        payload = {teacherId, password: teacherPassword};
      }
      else if (role === "student") {
        payload = {SID: studentId, password: studentPassword};
      }

      console.log("Role", role);
      console.log("Payload", payload);

      //fetch api
      const response = await axios.post(
        `http://localhost:8000/${role}/login`, 
        payload,
        {headers: {
          "Content-Type": "application/json",
        }}
      );

      console.log(response.data);

      const accessToken = response.data?.data?.accessToken;


      //for store logged user info
      let user = null;

      if(role === "student") {
        user = response.data?.data?.student;
      }

      if(role === "teacher") {
        user = response.data?.data?.teacher;
      }

      if(role === "admin") {
        user = response.data?.data?.admin;
      }

      if(!accessToken || !user) {
        setError("Login Data Missing From Server");
        return;
      };


      //save token based on role
      localStorage.setItem("token", accessToken);
      localStorage.setItem("activeRole", role);


      //store full information for logged in user
      localStorage.setItem("user", JSON.stringify(user));

      
      console.log(`${role}accessToken`, accessToken);

      //clear navigation
      if(role === "admin") navigate("/admin/dashboard");
      if(role === "teacher") navigate("/teacher/dashboard");
      if(role === "student") navigate("/student/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "login Failed");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4ff] px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

        {/* ADMIN */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4">
          <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-700">ADMIN</span>
          </div>

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="adminId"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />

          {/* login button */}
          <button
            onClick={() => handleLogin("admin")}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading? "Login..." : "Login"}
          </button>
        </div>

        {/* TEACHER */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4">
          <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-700">TEACHER</span>
          </div>

          <input
            type="teacherId"
            placeholder="Teacher ID"
            className="w-full text-center px-4 py-2 border rounded-lg"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
            value={teacherPassword}
            onChange={(e) => setTeacherPassword(e.target.value)}
          />

          {/* login button */}
          <button
            onClick={() => handleLogin("teacher")}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>
        </div>

        {/* STUDENT */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4">
          <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-700">STUDENT</span>
          </div>

          <input
            type="studentId"
            placeholder="Student ID"
            className="w-full text-center px-4 py-2 border rounded-lg"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
            value={studentPassword}
            onChange={(e) => setStudentPassword(e.target.value)}
          />

          {/* login button */}
          <button
            onClick={() => handleLogin("student")}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            {loading? "Login..." : "Login"}
          </button>
          
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
