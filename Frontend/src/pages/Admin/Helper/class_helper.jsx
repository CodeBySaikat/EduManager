import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Class_ActionButtons = () => {

  const navigate = useNavigate();

  const [showRemove, setShowRemove] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [classId, setClassId] = useState("");

  const [classData, setClassData] = useState(null);
  const [classStudents, setClassStudents] = useState([]);
  const [classTeachers, setClassTeachers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [showToast, setShowToast] = useState(false);


  // ---------------- REMOVE CLASS ----------------
  const handleRemoveClass = async () => {
    if (!classId) {
      alert("Class ID is required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/admin/removeClass/${classId}`,
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

      setClassId("");

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to delete class"
      );
    } finally {
      setLoading(false);
    }
  };


  // ---------------- GET CLASS DETAILS ----------------
  const handleGetClassDetails = async () => {
    if (!classId) return;

    try {
      setLoading(true);
      setMessage("");
      setClassData(null);
      setClassStudents([]);
      setClassTeachers([]);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/admin/fetch/classDetails/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setClassData(res.data.data.classItem);
      setClassStudents(res.data.data.students || []);
      setClassTeachers(res.data.data.teachers || []);

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Class not found"
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
          onClick={() => navigate("/admin/addClass")}
        >
          Add
        </button>

        <button
          className="flex-1 bg-red-200 text-red-800 py-1.5 rounded-md hover:bg-red-300 transition text-sm"
          onClick={() => {
            setClassId("");
            setMessage("");
            setShowRemove(true);
          }}
        >
          Remove
        </button>

        <button
          className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-md hover:bg-gray-300 transition text-sm"
          onClick={() => {
            setClassId("");
            setClassData(null);
            setClassStudents([]);
            setClassTeachers([]);
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
              Remove Class
            </h2>

            <input
              type="text"
              placeholder="Enter Class ID"
              className="w-full border p-2 rounded mb-4"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />

            {message && (
              <p className="text-sm text-center mb-3 text-red-600">
                {message}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRemoveClass}
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
            Class deleted successfully
          </div>
        </div>
      )}


      {/* ---------------- CLASS DETAILS MODAL ---------------- */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs text-teal-800">

          <div className="bg-white p-6 rounded-lg w-125 max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Class Details
            </h2>

            {!classData && (
              <>
                <input
                  type="text"
                  placeholder="Enter Class ID"
                  className="w-full border p-2 rounded mb-4"
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                />

                {message && (
                  <p className="text-sm text-center mb-3 text-red-600">
                    {message}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleGetClassDetails}
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


            {classData && (
              <div className="text-sm space-y-3">

                <p><b>Class ID:</b> {classData.classId}</p>
                <p><b>Class Name:</b> {classData.className}</p>
                <p><b>Representative:</b> {classData.representative}</p>

                <div>
                  <b>Students</b>
                  {classStudents.length === 0 && <p>No students</p>}
                  {classStudents.map((s) => (
                    <p key={s.SID}>
                      {s.SID} - {s.name}
                    </p>
                  ))}
                </div>

                <div>
                  <b>Teachers</b>
                  {classTeachers.length === 0 && <p>No teachers</p>}
                  {classTeachers.map((t) => (
                    <p key={t.teacherId}>
                      {t.teacherId} - {t.teacherName}
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

export default Class_ActionButtons;
