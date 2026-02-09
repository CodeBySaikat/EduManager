import {
  FaUser,
  FaKey,
  FaClipboardCheck,
  FaTasks,
  FaSignOutAlt,
  FaUserGraduate,
  FaBookOpen,
  FaBullhorn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";




//Teacher function imported
import Assign_Grade from "./assign_grade.jsx";
import Mark_Attendance from "./mark_attendance.jsx";



const Teacher_Dashboard = () => {

  const navigate = useNavigate();

  const [showAssignGrade, setShowAssignGrade] = useState(false);
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);



  return (
    <div className="min-h-screen flex bg-slate-100 relative">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-[#004bfb] text-white flex flex-col justify-between rounded-r-3xl shadow-xl">

        <div className="p-6">

          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg" />
            <span className="text-xl font-semibold tracking-wide">
              Teacher
            </span>
          </div>

          <nav className="space-y-2">

            <SidebarItem
              icon={<FaUser />}
              label="Profile"
              onClick={() => navigate("/teacher/profile")}
            />

            <SidebarItem
              icon={<FaKey />}
              label="Change Password"
              onClick={() => navigate("/teacher/change-password")}
            />

            <SidebarItem
              icon={<FaTasks />}
              label="Grade Assign"
              onClick={() => setShowAssignGrade(true)}
            />

            <SidebarItem
              icon={<FaClipboardCheck />}
              label="Mark Attendance"
              onClick={() => setShowMarkAttendance(true)}
            />

          </nav>
        </div>

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 transition rounded-xl py-2 font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= RIGHT MAIN AREA ================= */}
      <main className="flex-1 p-6 bg-slate-150">

        {/* ================= TOP BAR ================= */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3 text-[#00a6fb] font-semibold text-xl">
            <div className="w-10 h-10 bg-[#00a6fb] text-white rounded-xl flex items-center justify-center">
              EM
            </div>
            EduManager
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/teacher/profile")}
          >
            <span className="text-sm font-medium">Profile</span>
            <div className="w-9 h-9 bg-[#00a6fb] text-white rounded-full flex items-center justify-center font-semibold">
              T
            </div>
          </div>

        </div>

        {/* ================= WELCOME SECTION ================= */}
        <div className="bg-blue-800 rounded-2xl p-6 text-white flex justify-between items-center mb-8 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">

          <div>
            <p className="text-sm opacity-90 mb-1">September 2025</p>
            <h2 className="text-2xl font-semibold mb-1">
              Welcome back, Teacher!
            </h2>
            <p className="text-sm opacity-90">
              Manage students, courses and notices from here.
            </p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="teacher"
            className="w-24"
          />
        </div>

        {/* ================= LOWER SECTION ================= */}
        <div className="grid grid-cols-12 gap-6">

          {/* ================= TEACHER DETAILS ================= */}
          <div
            className="
              col-span-12 lg:col-span-7
              bg-white rounded-2xl p-6
              shadow-[0_10px_25px_rgba(0,0,0,0.06)]
              hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]
              transition
            "
          >
            <h3 className="text-lg font-semibold mb-4 text-center">
              Teacher Details
            </h3>

            <div className="grid grid-cols-2 gap-5 text-sm">
              <Info label="Name" value="John Doe" />
              <Info label="Teacher ID" value="T1023" />
              <Info label="Email" value="teacher@edumanager.com" />
              <Info label="Department" value="Computer Science" />
              <Info label="Assigned Class" value="BCA – 2nd Year" />
              <Info label="Status" value="Active" valueClass="text-green-600" />
            </div>
          </div>

          {/* ================= RIGHT STACK ================= */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">

            <RightCard
              title="Students"
              subtitle="View and manage students"
              icon={<FaUserGraduate size={26} />}
              avatar="https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
              onClick={() => navigate("/teacher/students")}
            />

            <RightCard
              title="Courses"
              subtitle="View assigned courses"
              icon={<FaBookOpen size={26} />}
              avatar="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              onClick={() => navigate("/teacher/courses")}
            />

            <RightCard
              title="Show Notices"
              subtitle="View all published notices"
              icon={<FaBullhorn size={26} />}
              avatar="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              onClick={() => navigate("/teacher/notices")}
            />

          </div>

        </div>

      </main>

      {/* mount assign grade */}
      <Assign_Grade
        open={showAssignGrade}
        onClose={() => setShowAssignGrade(false)}
      />

      {/* mount assign attendance */}
      <Mark_Attendance
        open={showMarkAttendance}
        onClose={() => setShowMarkAttendance(false)}
      />

    </div>
  );
};






/* ================= SMALL COMPONENTS FOR UI ================= */

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center gap-3 px-4 py-2 rounded-xl
        text-white/90
        hover:bg-white/20
        hover:translate-x-1
        transition-all duration-200
        cursor-pointer
      "
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const Info = ({ label, value, valueClass = "" }) => {
  return (
    <div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <p className={`font-medium ${valueClass}`}>{value}</p>
    </div>
  );
};

const RightCard = ({ title, subtitle, icon, avatar, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="
        bg-white rounded-2xl p-5
        shadow-[0_10px_22px_rgba(0,0,0,0.06)]
        hover:shadow-[0_14px_32px_rgba(0,0,0,0.08)]
        transition
        flex items-center justify-between
        cursor-pointer
      "
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#0026fb]/10 text-[#00a6fb] rounded-xl flex items-center justify-center">
          {icon}
        </div>

        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>

      <img
        src={avatar}
        alt={title}
        className="w-10 h-10 rounded-full"
      />
    </div>
  );
};





export default Teacher_Dashboard;
