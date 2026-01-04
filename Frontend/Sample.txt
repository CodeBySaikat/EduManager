import React from "react";

const ActionButtons = () => (
  <div className="mt-4 flex gap-3">
    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm">
      Add
    </button>
    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm">
      Remove
    </button>
    <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-sm">
      Details
    </button>
  </div>
);

const Admin_Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: Admin Profile */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <div className="h-28 w-28 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 mb-4">
              A
            </div>
            <h2 className="text-xl font-semibold">Admin Name</h2>
            <p className="text-sm text-gray-500">admin@example.com</p>
          </div>

          {/* Admin Details */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Admin Name"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
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

        {/* RIGHT: Management Sections */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Students */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Students</h3>
            <p className="text-sm text-gray-500">
              Manage student records and profiles
            </p>
            <ActionButtons />
          </div>

          {/* Teachers */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Teachers</h3>
            <p className="text-sm text-gray-500">
              Add or manage teachers
            </p>
            <ActionButtons />
          </div>

          {/* Courses */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Courses</h3>
            <p className="text-sm text-gray-500">
              Create and organize courses
            </p>
            <ActionButtons />
          </div>

          {/* Classes */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Classes</h3>
            <p className="text-sm text-gray-500">
              Assign students and teachers
            </p>
            <ActionButtons />
          </div>

          {/* Notices */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:col-span-2 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Notices</h3>
            <p className="text-sm text-gray-500">
              Publish announcements for students and teachers
            </p>
            <ActionButtons/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
