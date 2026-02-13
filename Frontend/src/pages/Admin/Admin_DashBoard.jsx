import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


//importing action button components for each section

import Student_ActionButtons from "./Helper/student_helper.jsx";
import Teacher_ActionButtons from "./Helper/teacher_helper.jsx";
import Class_ActionButtons from "./Helper/class_helper.jsx";
import Course_ActionButtons from "./Helper/course_helper.jsx";
import Notice_buttons from "./Helper/notice_helper.jsx";


import AdminLogout from "./admin_logout.jsx";
import DashboardCounts from "./dashboard_counts.jsx";




// Main dashboard component
const Admin_Dashboard = () => {
  
  //for dropdown menus
  const [open, setOpen] = useState({
    student: false,
    teacher: false,
    class: false,
    course: false,
    notice: false,
  });

  const toggle = (key) =>
  setOpen((p) => ({ ...p, [key]: !p[key] }));


  const navigate = useNavigate();

  //handle resister new admin
  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  //handle resister
  const handleRegister = async() => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        'http://localhost:8000/admin/register',
        {
          adminId,
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      // alert("Admin registered successfully!");
      setSuccess(true);

      // Clear form
      setAdminId("");
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };



  //for admin logout
  const [showLogout, setShowLogout] = useState(false);

  //for total counts
  const [refreshKey, setRefreshKey] = useState(0);

  //for Right side profile and welcome card
  const [adminName, setAdminName] = useState(""); //for name
  const [now, setNow] = useState(new Date()); //for new date and time

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user?.name) {
      setAdminName(user.name);
    }

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000)

    return () => clearInterval(timer);

  }, [])

  const current_Date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const current_Time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })



  return (
    <div className="min-h-screen flex bg-slate-100 relative">

      {/* ✅ CHANGED – success popup + blur */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          <div className="relative bg-white rounded-xl shadow-lg p-6 w-75 text-center">
            <h3 className="text-lg font-semibold text-green-600">
              Admin Registered Successfully
            </h3>

            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}


      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside className="w-72 bg-linear-to-b from-blue-600 to-blue-700 text-white flex flex-col">

        <div className="px-6 py-5 text-xl font-semibold border-b border-blue-500">
          EduManager
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-2">

          <button
            onClick={() => navigate("/admin/profile")}
            className="w-full text-left px-6 py-3 hover:bg-blue-500/70 rounded-r-full transition"
          >
            Profile
          </button>

          {/* Student */}
          <div className="mx-2 rounded-xl overflow-hidden bg-blue-600">
            <button
              onClick={() => toggle("student")}
              className="w-full px-5 py-3 flex justify-between items-center hover:bg-blue-500 transition"
            >
              <span>Student</span>
              <span
                className={`transition-transform ${
                  open.student ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`bg-blue-50 text-black transition-all duration-300 ${
                open.student ? "max-h-40" : "max-h-0"
              } overflow-hidden`}
            >
              <Student_ActionButtons
              onChange={() => setRefreshKey((p) => p+1)}
              />
            </div>
          </div>

          {/* Teacher */}
          <div className="mx-2 rounded-xl overflow-hidden bg-blue-600">
            <button
              onClick={() => toggle("teacher")}
              className="w-full px-5 py-3 flex justify-between items-center hover:bg-blue-500 transition"
            >
              <span>Teacher</span>
              <span
                className={`transition-transform ${
                  open.teacher ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`bg-blue-50 text-black transition-all duration-300 ${
                open.teacher ? "max-h-40" : "max-h-0"
              } overflow-hidden`}
            >
              <Teacher_ActionButtons
              onChange={() => setRefreshKey((p) => p+1)}
              />
            </div>
          </div>

          {/* Class */}
          <div className="mx-2 rounded-xl overflow-hidden bg-blue-600">
            <button
              onClick={() => toggle("class")}
              className="w-full px-5 py-3 flex justify-between items-center hover:bg-blue-500 transition"
            >
              <span>Class</span>
              <span
                className={`transition-transform ${
                  open.class ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`bg-blue-50 text-black transition-all duration-300 ${
                open.class ? "max-h-40" : "max-h-0"
              } overflow-hidden`}
            >
              <Class_ActionButtons
              onChange={() => setRefreshKey((p) => p+1)}
              />
            </div>
          </div>

          {/* Course */}
          <div className="mx-2 rounded-xl overflow-hidden bg-blue-600">
            <button
              onClick={() => toggle("course")}
              className="w-full px-5 py-3 flex justify-between items-center hover:bg-blue-500 transition"
            >
              <span>Courses</span>
              <span
                className={`transition-transform ${
                  open.course ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`bg-blue-50 text-black transition-all duration-300 ${
                open.course ? "max-h-40" : "max-h-0"
              } overflow-hidden`}
            >
              <Course_ActionButtons
              onChange={() => setRefreshKey((p) => p+1)}
              />
            </div>
          </div>

          {/* Notice */}
          <div className="mx-2 rounded-xl overflow-hidden bg-blue-600">
            <button
              onClick={() => toggle("notice")}
              className="w-full px-5 py-3 flex justify-between items-center hover:bg-blue-500 transition"
            >
              <span>Notices</span>
              <span
                className={`transition-transform ${
                  open.notice ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`bg-blue-50 text-black transition-all duration-300 ${
                open.notice ? "max-h-40" : "max-h-0"
              } overflow-hidden`}
            >
              <Notice_buttons
              onChange={() => setRefreshKey((p) => p+1)}
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-blue-500">
          <button
            className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
            onClick={() => setShowLogout(true)}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ---------------- RIGHT SIDE ---------------- */}
      <main className="flex-1 p-6">

        {/* ===== Top bar (logo instead of search) ===== */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              EM
            </div>
            <span className="text-lg font-semibold text-slate-700">
              EduManager
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Profile</p>
              <p className="text-xs text-slate-500">
                {adminName || "Admin"}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {adminName? adminName.charAt(0).toLocaleUpperCase() : "A"}
            </div>
          </div>
        </div>

        {/* ===== Welcome panel (same style as your image) ===== */}
        <div className="mb-10 rounded-2xl bg-linear-to-r from-blue-800 to-blue-700 p-6 text-white relative overflow-hidden">
          <p className="text-lg text-yellow-300 opacity-90"
          // style={{color: '#003459'}}
          >
            {current_Date} | {current_Time}
          </p>
          <h2 className="text-2xl font-semibold mt-1">
            Welcome back, {adminName || "Admin"}
          </h2>
          <p className="text-sm mt-1 opacity-90">
            Manage students, teachers, classes, courses and notices from here.
          </p>

          <div className="absolute right-6 top-6 h-20 w-20 rounded-xl bg-white/10" />
        </div>

        {/* ===== Main content shifted downward ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Register new admin */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5 text-center">
              Register New Admin
            </h2>

            <form className="space-y-4">

              <div>
                <label className="text-sm text-gray-600">Admin ID</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter ID"
                  // value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter name"
                  // value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter email"
                  // value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter password"
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register" }
              </button>
              {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Totals section */}
          <DashboardCounts refreshKey={refreshKey}/>

        </div>
      </main>


      {/* for logout */}
      {showLogout && <AdminLogout/>}

    </div>
  );
};

export default Admin_Dashboard;
