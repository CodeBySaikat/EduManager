import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Teacher_ActionButtons = () => {

  const navigate = useNavigate();

  const [showRemove, setShowRemove] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [teacherId, setTeacherId] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [teacher, setTeacher] = useState(null);

  // NEW
  const [showToast, setShowToast] = useState(false);


  // ---------------- REMOVE TEACHER ----------------
  const handleRemoveTeacher = async () => {
    if (!teacherId) return;

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/admin/removeTeacher/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // close modal
      setShowRemove(false);

      // show success message in center
      setShowToast(true);

      //auto hide after 1s
      setTimeout(() => {
        setShowToast(false);
      }, 1000);

      setTeacherId("");

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to delete teacher"
      );
    } finally {
      setLoading(false);
    }
  };


  // ---------------- GET TEACHER DETAILS ----------------
  const handleGetDetails = async () => {
    if (!teacherId) return;

    try {
      setLoading(true);
      setMessage("");
      setTeacher(null);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/admin/fetch/teacherDetails/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTeacher(res.data.data.teacher);

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Teacher not found"
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
          onClick={() => navigate("/admin/addTeacher")}
        >
          Add
        </button>

        <button
          className="flex-1 bg-red-200 text-red-800 py-1.5 rounded-md hover:bg-red-300 transition text-sm"
          onClick={() => {
            setTeacherId("");
            setMessage("");
            setShowRemove(true);
          }}
        >
          Remove
        </button>

        <button
          className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-md hover:bg-gray-300 transition text-sm"
          onClick={() => {
            setTeacherId("");
            setTeacher(null);
            setMessage("");
            setShowDetails(true);
          }}
        >
          Details
        </button>

      </div>


      {/* ---------------- REMOVE MODAL ---------------- */}
      {showRemove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-lg w-87.5">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Remove Teacher
            </h2>

            <input
              type="text"
              placeholder="Enter Teacher ID (TID)"
              className="w-full border p-2 rounded mb-4"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            />

            {message && (
              <p className="text-sm text-center mb-3 text-red-600">
                {message}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleRemoveTeacher}
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


      {/* CHANGED – blur background for success message */}
      {showToast && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Teacher deleted successfully
          </div>

        </div>
      )}


      {/* ---------------- DETAILS MODAL ---------------- */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs text-teal-800">

          <div className="bg-white p-6 rounded-lg w-125 max-h-[90vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4 text-center">
              Teacher Details
            </h2>

            {!teacher && (
              <>
                <input
                  type="text"
                  placeholder="Enter Teacher ID (TID)"
                  className="w-full border p-2 rounded mb-4"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                />

                {message && (
                  <p className="text-sm text-center mb-3 text-red-600">
                    {message}
                  </p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleGetDetails}
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


            {teacher && (
              <div className="text-sm space-y-2">

                <p><b>TeacherID:</b> {teacher.teacherId}</p>
                <p><b>Teacher Name:</b> {teacher.teacherName}</p>
                <p><b>Contact Number:</b> {teacher.contact}</p>
                <p><b>Department:</b> {teacher.department}</p>
                {/* <p><b>Password:</b> {teacher.password}</p> */}
                
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

export default Teacher_ActionButtons;
