import React, { useState } from "react";

const LoginPage = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4ff] px-4">
      
      {/* Main Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

        {/* Admin */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between">
          <div>
            <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-blue-700">ADMIN</span>
            </div>
            <h2 className="text-xl text-center font-semibold mb-1"><i>Admin</i></h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setRole("student")}
              className={`w-full py-2 rounded-lg font-medium transition ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
          </div>

          <button
            onClick={() => setRole("teacher")}
            className={`w-full py-2 rounded-lg font-medium transition ${
              role === "teacher"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            >
              Forgot Password
          </button>
        </div>

        {/* Teacher */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between">
          <div>
            <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-blue-700">TEACHER</span>
            </div>
            <h2 className="text-xl text-center font-semibold mb-1"><i>Teacher</i></h2>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => setRole("student")}
              className={`w-full py-2 rounded-lg font-medium transition ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
          </div>

          <button
              onClick={() => setRole("teacher")}
              className={`w-full py-2 rounded-lg font-medium transition ${
                role === "teacher"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Forgot Password
            </button>
        </div>

        {/* Student */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between">
          <div>
            <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-blue-700">STUDENT</span>
            </div>
            <h2 className="text-xl text-center font-semibold mb-1"><i>Student</i></h2>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setRole("student")}
              className={`w-full py-2 rounded-lg font-medium transition ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setRole("teacher")}
              className={`w-full py-2 rounded-lg font-medium transition ${
                role === "teacher"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
