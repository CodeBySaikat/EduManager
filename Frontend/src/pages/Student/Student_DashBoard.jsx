import React, { useState } from "react";



import Check_Student_Attendance from "./check_attendance.jsx";
import Check_Student_Grades from "./check_grades.jsx";




const Student_Dashboard = () => {

  const [openAttendance, setOpenAttendance] = useState(false);
  const [attendancePercentage, setAttendancePercentage] = useState(
    Number(localStorage.getItem("attendancePercentage")) || 0
  );

  const [openGrades, setOpenGrades] = useState(false);
  const [overallGrade, setOverallGrade] = useState(
    localStorage.getItem("overallGrade") || "0"
  )


  // const student = JSON.parse(localStorage.getItem("user"));
  // const SID = student?.SID;
  // console.log("SID", SID);

  const SID = JSON.parse(localStorage.getItem("user"))?.SID;
  console.log("SID: ", SID);



  const handleMenuClick = (name) => {
    console.log("Clicked:", name);
    // later you can navigate or open a section here
  };

  return (
    <div className="min-h-screen bg-blue-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-linear-to-b from-blue-700 to-blue-600 text-white p-6 flex flex-col justify-between m-2 rounded-xl">
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
              "Change Password",
              "Attendance",
              "Grades",
              "Enrolled Courses",
              "Classes",
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  if (item === "Attendance") {
                    setOpenAttendance(true);
                  } 
                  else if(item === "Grades") {
                    setOpenGrades(true);
                  }
                  else {
                    handleMenuClick(item);
                  }
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/40"
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <button
          type="button"
          className="mt-10 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
          onClick={() => handleMenuClick("Logout")}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          
          <div className="flex items-center gap-3 text-black font-semibold text-xl">
            <div className="w-10 h-10 bg-indigo-700 text-white rounded-xl flex items-center justify-center">
              EM
            </div>
            EduManager
          </div>

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
        <div className="bg-linear-to-r from-sky-700 to-sky-500 text-white rounded-2xl p-6 mb-6 flex justify-between items-center">
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
            { title: "Total Attendance", value: `${attendancePercentage}%` },
            { title: "Overall Grades", value: `${overallGrade}` || "0" },
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
            <div className="flex justify-between mb-4 items-center">
              <h3 className="font-semibold text-lg">Courses</h3>

              {/* CHANGED → button */}
              <button
                type="button"
                onClick={() => handleMenuClick("All Courses")}
                className="text-blue-600 text-sm hover:underline"
              >
                See all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Object Oriented Programming",
                "Database Management Systems",
              ].map((course, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleMenuClick(course)}
                  className="text-left border rounded-xl p-4 hover:shadow-md transition"
                >
                  <h4 className="font-semibold">{course}</h4>
                </button>
              ))}
            </div>
          </div>

          {/* NOTICE */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-4 items-center">
              <h3 className="font-semibold text-lg">Daily Notices</h3>

              {/* CHANGED → button */}
              <button
                type="button"
                onClick={() => handleMenuClick("All Notices")}
                className="text-blue-600 text-sm hover:underline"
              >
                See all
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <button
                type="button"
                onClick={() => handleMenuClick("Exam Schedule Updated")}
                className="text-left w-full"
              >
                <p className="font-semibold">Exam Schedule Updated</p>
                <p className="text-gray-500">
                  New mid-term exam dates have been published.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleMenuClick("Fee Payment Reminder")}
                className="text-left w-full"
              >
                <p className="font-semibold">Fee Payment Reminder</p>
                <p className="text-gray-500">
                  Pending fees must be cleared before semester end.
                </p>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ✅ Attendance Modal */}
      <Check_Student_Attendance
        open={openAttendance}
        onClose={() => setOpenAttendance(false)}
        SID={SID}
        onPercentage={setAttendancePercentage}
      />

      {/* ✅ Grades Modal */}
      <Check_Student_Grades
      open={openGrades}
      onClose={() => setOpenGrades(false)}
      SID={SID}
      onOverallGrade={setOverallGrade}
      />
    </div>
  );
};

export default Student_Dashboard;
