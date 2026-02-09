import axios from "axios";
import { useState } from "react";

const Mark_Attendance = ({ open, onClose }) => {
  const [SID, setSID] = useState("");
  const [date, setDate] = useState("");
  const [present, setPresent] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // allow showing success popup even after form is closed
  if (!open && !showSuccessPopup) return null;

  const handle_markAttendance = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please Login as Teacher");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/teacher/markAttendance",
        {
          SID,
          date,
          present,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = res.data?.message || "Attendance Marked successfully";

      // show success popup
      setSuccess(message);
      setShowSuccessPopup(true);

      // close the form
      onClose();

      // clear form
      setSID("");
      setDate("");
      setPresent(true);

      // auto hide popup
      setTimeout(() => {
        setShowSuccessPopup(false);
        setSuccess("");
      }, 1000);

    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to mark attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= MARK ATTENDANCE FORM MODAL ================= */}
      {open && (
        <>
          {/* Blur background */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

          {/* Center popup */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-95 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-center mb-4">
                Mark Attendance
              </h2>

              {error && (
                <p className="text-red-600 text-center mb-3">
                  {error}
                </p>
              )}

              <form onSubmit={handle_markAttendance}>
                <input
                  type="text"
                  placeholder="Student ID (SID)"
                  value={SID}
                  onChange={(e) => setSID(e.target.value)}
                  className="w-full border p-2 rounded mb-3"
                  required
                />

                {/* Date */}
                <input
                  type="date"
                  value={date}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border p-2 rounded mb-3"
                  required
                />

                {/* Present / Absent */}
                <select
                  value={present ? "true" : "false"}
                  onChange={(e) =>
                    setPresent(e.target.value === "true")
                  }
                  className="w-full border p-2 rounded mb-4"
                >
                  <option 
                  value="true"
                  >
                    Present
                  </option>

                  <option 
                  value="false"
                  >
                    Absent
                  </option>
                </select>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {loading ? "Saving..." : "Mark"}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* ================= SUCCESS POPUP ================= */}
      {showSuccessPopup && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white px-8 py-6 rounded-xl shadow-xl">
              <p className="text-green-600 font-semibold text-center text-lg">
                {success || "Attendance Marked successfully"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Mark_Attendance;
