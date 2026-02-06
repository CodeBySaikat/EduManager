import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Course_ActionButtons = () => {

  const navigate = useNavigate();

  const [showRemove, setShowRemove] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [courseId, setCourseId] = useState("");

  const [courseData, setCourseData] = useState(null);
  const [courseStudents, setCourseStudents] = useState([]);
  const [courseTeachers, setCourseTeachers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showToast, setShowToast] = useState(false);


  // ---------------- REMOVE COURSE ----------------
  const handleRemoveCourse = async () => {
    if (!courseId) {
      alert("Course ID is required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/admin/removeCourse/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setShowRemove(false);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1000);

      setCourseId("");

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to delete course"
      );
    } finally {
      setLoading(false);
    }
  };


  // ---------------- GET COURSE DETAILS ----------------
  const handleGetCourseDetails = async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      setMessage("");

      setCourseData(null);
      setCourseStudents([]);
      setCourseTeachers([]);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/admin/fetch/courseDetails/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const CourseItem = res.data.data.course;

      setCourseData(CourseItem);

      setCourseStudents(CourseItem.studentsEnrolled || []);
      setCourseTeachers(CourseItem.teachersAssigned || []);

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Course not found"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Action buttons */}
      <div className="px-4 pb-3 pt-2 flex gap-2">

        <button
          className="flex-1 bg-green-200 text-green-800 py-1.5 rounded-md hover:bg-green-300 transition text-sm"
          onClick={() => navigate("/admin/addCourse")}
        >
          Add
        </button>

        <button
          className="flex-1 bg-red-200 text-red-800 py-1.5 rounded-md hover:bg-red-300 transition text-sm"
          onClick={() => {
            setCourseId("");
            setMessage("");
            setShowRemove(true);
          }}
        >
          Remove
        </button>

        <button
          className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-md hover:bg-gray-300 transition text-sm"
          onClick={() => {
            setCourseId("");
            setCourseData(null);
            setCourseStudents([]);
            setCourseTeachers([]);
            setMessage("");
            setShowDetails(true);
          }}
        >
          Details
        </button>

      </div>


      {/* ---------------- REMOVE CLASS MODAL ---------------- */}
      {showRemove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-lg w-87.5">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Remove Course
            </h2>

            <input
              type="text"
              placeholder="Enter Course ID"
              className="w-full border p-2 rounded mb-4"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />

            {message && (
              <p className="text-sm text-center mb-3 text-red-600">
                {message}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRemoveCourse}
                disabled={loading}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                {loading ? "Deleting..." : "Submit"}
              </button>

              <button
                onClick={() => setShowRemove(false)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ---------------- SUCCESS TOAST ---------------- */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Course deleted successfully
          </div>
        </div>
      )}


      {/* ---------------- Course DETAILS MODAL ---------------- */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs text-teal-800">

          <div className="bg-white p-6 rounded-lg w-125 max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Course Details
            </h2>

            {!courseData && (
              <>
                <input
                  type="text"
                  placeholder="Enter Course ID"
                  className="w-full border p-2 rounded mb-4"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                />

                {message && (
                  <p className="text-sm text-center mb-3 text-red-600">
                    {message}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleGetCourseDetails}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>

                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}


            {courseData && (
              <div className="text-sm space-y-3">

                <p><b>Course ID:</b> {courseData.courseId}</p>
                <p><b>Course Name:</b> {courseData.courseName}</p>
                <p><b>Course HOD:</b> {courseData.HOD || "-"}</p>

                <div>
                  <b>Students Enrolled</b>
                  {courseStudents.length === 0 && <p>No students</p>}

                  {/* {courseStudents.map((s) => (
                    <p key={s.SID}>
                      {s.SID} - {s.name}
                    </p>
                  ))} */}

                  {courseStudents.map((s, i) => (
                    <p key={i}>
                      {s}
                    </p>
                  ))}
                </div>


                <div>
                  <b>Teachers Assigned</b>
                  {courseTeachers.length === 0 && <p>No teachers</p>}
                  
                  {/* {courseTeachers.map((t) => (
                    <p key={t.teacherId}>
                      {t.teacherId} - {t.teacherName}
                    </p>
                  ))} */}

                  {courseTeachers.map((t, i) => (
                    <p key={i}>
                      {t}
                    </p>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full bg-gray-200 py-2 rounded"
                  >
                    Close
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </>
  );
};

export default Course_ActionButtons;
