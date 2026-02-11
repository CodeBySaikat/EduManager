import axios from "axios";
import { useEffect, useState } from "react";

const Check_PendingFees = ({ open, onClose, SID, studentName, onPendingFees }) => {

  const [pendingFees, setPendingFees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!open || !SID) return;

    const fetchPendingFees = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/student/checkFees/${SID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const amount = res.data?.data?.pendingFees;

        setPendingFees(amount);

        //protected callback
        if(onPendingFees) {
            onPendingFees(amount);
        };

        //store amount in local storage
        localStorage.setItem("pendingAmount", amount);

      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to fetch pending fees"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPendingFees();

  }, [open, SID, onPendingFees]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BLUR BACKGROUND */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-95 rounded-xl shadow-lg p-6">

        <h2 className="text-lg font-semibold text-center mb-4">
          Pending Fees
        </h2>

        {loading && (
          <p className="text-center text-sm text-gray-500">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-600">Student Name</span>
              <span className="font-medium">{studentName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Student ID</span>
              <span className="font-medium">{SID}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Pending Fees</span>
              <span className="font-semibold text-red-600">
                ₹ {pendingFees}
              </span>
            </div>

          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default Check_PendingFees;
