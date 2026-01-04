import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //for login function
  const handleLogin = async(role) => {
    try {
      setLoading(true);
      setError(null);

      //fetch api
      const response = await axios.post(
        `http://localhost:8000/${role}/login`, 
        {
          adminId, 
          password
        },
        {headers: {
          "Content-Type": "application/json",
        }}
      );
      console.log(response.data);
      // return response.data;

      //save token based on role
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("role", role);

      //redirect based on role
      if(role == "admin") window.location.href = "/admin/dashboard";
      if(role == "teacher") window.location.href = "/teacher/dashboard";
      if(role == "student") window.location.href = "/student/dashboard";

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
            type="email"
            placeholder="Admin Email"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* login button */}
          <button
            onClick={() => handleLogin("admin")}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            {/* Login */}
            {loading? "Login..." : "Login"}
          </button>
        </div>

        {/* TEACHER */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4">
          <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-700">TEACHER</span>
          </div>

          <input
            type="email"
            placeholder="Teacher Email"
            className="w-full text-center px-4 py-2 border rounded-lg"
          />

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
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
            type="email"
            placeholder="Student Email"
            className="w-full text-center px-4 py-2 border rounded-lg"
          />

          <input
            className="w-full text-center px-4 py-2 border rounded-lg"
            type="password"
            placeholder="Password"
          />

          {/* login button */}
          <button
            onClick={() => handleLogin("student")}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>

          {/* <button
            onClick={() => handleForgotPassword("student", student.email)}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Forgot Password
          </button> */}
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
