import { useState } from "react";
import axios from "axios";

const Add_Teacher = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitFunction = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please Login as Admin");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/admin/addTeacher",
        {
          teacherId,
          teacherName,
          contact,
          department,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Teacher added:", response.data);
      alert("Teacher Registration Successfully");

    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-6">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT: FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            TEACHER REGISTRATION FORM
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Teacher ID"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTeacherId(e.target.value)}
            />

            <input
              type="text"
              placeholder="Teacher Name"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTeacherName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Contact Number"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setContact(e.target.value)}
            />

            <input
              type="text"
              placeholder="Department"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDepartment(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full h-11 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={handleSubmitFunction}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0"
            alt="Teacher Registration"
            className="h-full w-full object-cover absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Add_Teacher;


