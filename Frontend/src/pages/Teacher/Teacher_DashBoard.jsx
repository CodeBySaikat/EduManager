import React from "react";

const Teacher_Dashboard = () => {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#bde0fe" }}>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: Teacher Profile */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="h-28 w-28 rounded-full bg-[#bde0fe] flex items-center justify-center text-3xl font-bold text-blue-800 mb-4">
              T
            </div>
            <h2 className="text-xl font-semibold">Teacher Name</h2>
            <p className="text-sm text-gray-500">teacher@example.com</p>
          </div>

          {/* Profile Details */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Teacher Name"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="teacher@example.com"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button className="mt-6 w-full h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Update Profile
          </button>
        </div>

        {/* RIGHT: Teacher Actions */}
        <div className="md:col-span-2 grid grid-cols-1 gap-6">

          {/* Student Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">
              <i>Students</i>
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Manage student attendance and grades
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => console.log("Assign Grade")}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Assign Grade
              </button>

              <button
                onClick={() => console.log("Mark Attendance")}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Mark Attendance
              </button>
            </div>
          </div>

          {/* Notices Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">
              <i>Notices</i>
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              View important announcements
            </p>

            <button
              onClick={() => console.log("View Notices")}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              View Notices
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Teacher_Dashboard;
