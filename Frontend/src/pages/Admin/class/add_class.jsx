import { useState } from "react";
import axios from "axios";

const Add_Class = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [students, setStudents] = useState("");
  const [teachers, setTeachers] = useState("");

  const handleSubmitFunction = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please login as Admin");
        return;
      }

      const studentsArray = students
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const teachersArray = teachers
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

      const response = await axios.post(
        "http://localhost:8000/admin/addClass",
        {
          classId,
          className,
          representative,
          students: studentsArray,
          teachers: teachersArray
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Class created:", response.data);
      alert("Class created successfully");

    } catch (error) {
      setError(error.response?.data?.message || "Class creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-6">
      <div className="max-w-5xl w-full bg-white shadow-2xl rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT : FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            CREATE CLASS
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Class ID"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setClassId(e.target.value)}
            />

            <input
              type="text"
              placeholder="Class Name"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setClassName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Class Representative (Teacher ID)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRepresentative(e.target.value)}
            />

            <input
              type="text"
              placeholder="Students (comma separated Student IDs)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStudents(e.target.value)}
            />

            <input
              type="text"
              placeholder="Teachers (comma separated Teacher IDs)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTeachers(e.target.value)}
            />

            <button
              className="w-full h-11 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={handleSubmitFunction}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Class"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

          </div>
        </div>

        {/* RIGHT : IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0"
            alt="Create Class"
            className="h-full w-full object-cover absolute inset-0"
          />
        </div>

      </div>
    </div>
  );
};

export default Add_Class;
