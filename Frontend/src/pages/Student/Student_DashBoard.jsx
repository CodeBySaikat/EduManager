import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-linear-to-b from-blue-700 to-blue-600 text-white p-6 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold">
              🎓
            </div>
            <h1 className="text-xl font-semibold"><i>Student</i></h1>
          </div>

          {/* Menu */}
          <nav className="space-y-4 text-sm">
            {[
              "Profile",
              "Attendence",
              "Grades",
              "Enrolled Courses",
              "Classes",
              "Schedule",
              "Results",
              "Pending Fees",
              "Notices",
            ].map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-lg hover:bg-white/20 cursor-pointer transition"
              >
                {item}
              </div>
            ))}
          </nav>
        </div>

        <button className="mt-10 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/3 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">Profile</p>
              <p className="text-sm text-gray-500">Saikat</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-300 flex items-center justify-center font-bold text-white">
              A
            </div>
          </div>
        </div>

        {/* WELCOME CARD */}
        <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">September 2025</p>
            <h2 className="text-2xl font-bold mt-2">
              Welcome back, Saikat!
            </h2>
            <p className="text-sm mt-1 opacity-90">
              Manage students, teachers, courses and notices from here.
            </p>
          </div>
          <div className="hidden md:block text-6xl opacity-20">📊</div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[
            { title: "Total Attendance", value: "75%" },
            { title: "Grades", value: "A+" },
            { title: "Pending Fees", value: "4800" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6"
            >
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COURSES */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">Courses</h3>
              <span className="text-blue-600 cursor-pointer text-sm">
                See all
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Object Oriented Programming",
                "Database Management Systems",
              ].map((course, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 hover:shadow-md transition"
                >
                  <h4 className="font-semibold">{course}</h4>
                  <button className="mt-3 px-4 py-1 bg-blue-600 text-white rounded-lg text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NOTICE */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg">Daily Notices</h3>
              <span className="text-blue-600 cursor-pointer text-sm">
                See all
              </span>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold">Exam Schedule Updated</p>
                <p className="text-gray-500">
                  New mid-term exam dates have been published.
                </p>
              </div>
              <div>
                <p className="font-semibold">Fee Payment Reminder</p>
                <p className="text-gray-500">
                  Pending fees must be cleared before semester end.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
