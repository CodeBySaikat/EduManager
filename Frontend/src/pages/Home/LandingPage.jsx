import React, { useState } from "react";

const LoginPage = () => {
  
  //for login function
  const handleLogin = () => {
  };

  //for forgot function
  function handleForgotPassword() {
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf4ff] px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">

        {/* ADMIN */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-4">
          <div className="h-40 bg-[#bde0fe] rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-700">ADMIN</span>
          </div>

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full text-center px-4 py-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-center px-4 py-2 border rounded-lg"
          />

          <button
            onClick={() => handleLogin("admin", admin)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => handleForgotPassword("admin", admin.email)}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Forgot Password
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
            type="password"
            placeholder="Password"
            className="w-full text-center px-4 py-2 border rounded-lg"
          />

          <button
            onClick={() => handleLogin("teacher", teacher)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => handleForgotPassword("teacher", teacher.email)}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Forgot Password
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
            type="password"
            placeholder="Password"
            className="w-full text-center px-4 py-2 border rounded-lg"
          />

          <button
            onClick={() => handleLogin("student", student)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>

          <button
            onClick={() => handleForgotPassword("student", student.email)}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Forgot Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
