import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Student_ActionButtons = () => {
  
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex gap-3">
      <button
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        onClick={() => navigate("/admin/addStudent")}
      >
        Add
      </button>

      <button 
        className="flex-1 bg-red-500 text-white py-2 rounded-lg"
        onClick={() => {}}
      >
        Remove
      </button>

      <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg">
        Details
      </button>
    </div>
  );
};



const Teacher_ActionButtons = () => {
  
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex gap-3">
      <button
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        onClick={() => navigate("/admin/addTeacher")}
      >
        Add
      </button>

      <button 
        className="flex-1 bg-red-500 text-white py-2 rounded-lg"
        
      >
        Remove
      </button>

      <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg">
        Details
      </button>
    </div>
  );
};


const Course_ActionButtons = () => {
  
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex gap-3">
      <button
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        onClick={() => navigate("/admin/addCourse")}
      >
        Add
      </button>

      <button 
        className="flex-1 bg-red-500 text-white py-2 rounded-lg"
       
      >
        Remove
      </button>

      <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg">
        Details
      </button>
    </div>
  );
};


const Class_ActionButtons = () => {
  
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex gap-3">
      <button
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        onClick={() => navigate("/admin/addClass")}
      >
        Add
      </button>

      <button 
        className="flex-1 bg-red-500 text-white py-2 rounded-lg"
      >
        Remove
      </button>

      <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg">
        Details
      </button>
    </div>
  );
};

const Notice_ActionButtons = () => {
  
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex gap-3">
      <button
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        onClick={() => navigate("/admin/addNotice")}
      >
        Add
      </button>

      <button 
        className="flex-1 bg-red-500 text-white py-2 rounded-lg"
      >
        Remove
      </button>

      <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg">
        Details
      </button>
    </div>
  );
};




const Admin_Dashboard = () => {

  const [adminId, setAdminId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(false);

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

    } catch (error) {
      setError(error.response?.data?.message || "login Failed");
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className="text-xl font-semibold">Admin Registration</h2>
            <p className="text-sm text-gray-500">Create admin account</p>
          </div>

          {/* Admin Register Form */}
          <div className="mt-6 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Admin ID
              </label>
              <input
                type="text"
                placeholder="ADM001"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setAdminId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter admin name"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@email.com"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          <button
          className="mt-6 w-full h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={handleRegister}
          disabled={loading}
          >
            {loading? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* RIGHT: Management Sections */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Students</h3>
            <p className="text-sm text-gray-500">Manage student records and profiles</p>
            <Student_ActionButtons isStudent={true}/>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Teachers</h3>
            <p className="text-sm text-gray-500">Add or manage teachers</p>
            <Teacher_ActionButtons />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Courses</h3>
            <p className="text-sm text-gray-500">Create and organize courses</p>
            <Course_ActionButtons />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Classes</h3>
            <p className="text-sm text-gray-500">Assign students and teachers</p>
            <Class_ActionButtons />
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 sm:col-span-2 hover:shadow-xl transition">
            <h3 className="text-lg text-center font-semibold mb-2">Notices</h3>
            <p className="text-sm text-gray-500">
              Publish announcements for students and teachers
            </p>
            <Notice_ActionButtons />
          </div>

        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-10 flex justify-center">
        <button className="px-10 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
          Logout
        </button>
      </div>

    </div>
  );
};

export default Admin_Dashboard;
