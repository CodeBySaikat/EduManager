import { useState } from "react";
import axios from "axios";

const Add_Course = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [HOD, setHOD] = useState("");
  const [teachersAssigned, setTeachersAssigned] = useState([]);
  const [studentsEnrolled, setStudentsEnrolled] = useState([]);

  const handleSubmitFunction = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please login as Admin");
        return;
      }

      const teachersArray = teachersAssigned
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);

      const studentsArray = studentsEnrolled
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const response = await axios.post(
        "http://localhost:8000/admin/addCourse",
        {
          courseId,
          courseName,
          HOD,
          teachersAssigned: teachersArray,
          studentsEnrolled: studentsArray
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Course created:", response.data);
      alert("Course created successfully");

    } catch (error) {
      setError(error.response?.data?.message || "Course creation failed");
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
            CREATE COURSE
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Course ID"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCourseId(e.target.value)}
            />

            <input
              type="text"
              placeholder="Course Name"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCourseName(e.target.value)}
            />

            <input
              type="text"
              placeholder="HOD (Teacher ID)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setHOD(e.target.value)}
            />

            <input
              type="text"
              placeholder="Teachers Assigned (comma separated teacher IDs)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTeachersAssigned(e.target.value)}
            />

            <input
              type="text"
              placeholder="Students Enrolled (comma separated student SIDs)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setStudentsEnrolled(e.target.value)}
            />

            <button
              className="w-full h-11 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={handleSubmitFunction}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Course"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

          </div>
        </div>

        {/* RIGHT : IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://sureshitacademy.com/wp-content/uploads/2024/05/Seminar-pana-1024x1024.png"
            alt="Create Course"
            className="h-full w-full object-cover absolute inset-0"
          />
        </div>

      </div>
    </div>
  );
};

export default Add_Course;
