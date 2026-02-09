import { useState } from "react";
import axios from "axios";

const Check_Notices = ({ open, onClose }) => {

  const [teacherId, setTeacherId] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // do not render when closed
  if (!open) return null;

  // ---------------- GET NOTICES ----------------
  const handleGetNotices = async () => {
    if (!teacherId) return;

    try {
      setLoading(true);
      setMessage("");
      setNotices([]);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:8000/teacher/viewNotice/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotices(res.data.data || []);

    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Notices not found"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTeacherId("");
    setNotices([]);
    setMessage("");
    onClose();
  };

  return (
    <>
      {/* ---------- SHOW NOTICE MODAL ---------- */}
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs">

        <div className="bg-slate-50 p-6 rounded-lg w-125 max-h-[90vh] overflow-y-auto">

          <h2 className="bg-green-200 text-lg font-semibold mb-4 text-center rounded-xl">
            Teacher Notices
          </h2>

          {/* ---------------- FORM PART ---------------- */}
          {notices.length === 0 && (
            <>
              <input
                type="text"
                placeholder="Enter Teacher ID"
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
                  onClick={handleGetNotices}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  {loading ? "Loading..." : "Submit"}
                </button>

                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* ---------------- NOTICE LIST PART ---------------- */}
          {notices.length > 0 && (
            <div className="space-y-4 text-sm text-teal-800">

              {notices.map((n) => (
                <div key={n._id} className="hover:shadow-indigo-400 shadow-lg rounded-md p-4 bg-white" 
                >
                    <p className="font-semibold text-base mt-1">
                        {n.title}
                    </p>

                    <p className="mt-1">
                        {n.content}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                </div>
              ))}

              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="w-full bg-gray-200 py-2 rounded hover:bg-red-100"
                >
                  Close
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Check_Notices;
