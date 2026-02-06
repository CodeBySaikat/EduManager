import Axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";


const Notice_buttons = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [noticeId, setNoticeId] = useState("");
  const [showRemove, setShowRemove] = useState(false);

  const [showToast, setShowToast] = useState(false);


  //handle remove notice
  const handleRemoveNotice = async () => {
    if(!noticeId) {
        alert("Notice ID is required");
        return;
    }

    try {
        setLoading(true);
        setError("");
        setMessage("");

        const token = localStorage.getItem("token");

        await Axios.delete (
            `http://localhost:8000/admin/removeNotice/${noticeId}`,
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

        setNoticeId("");

    } catch (error) {
        setMessage(
            error?.response?.data?.message || `Falied to delete NoticeID: ${noticeId}`
        );
    } finally {
        setLoading(false);
    }
  };





  return (
    <>
        {/* Active Buttons */}
        <div className="px-4 pb-3 pt-2 flex gap-2">
        <button
            className="flex-1 bg-green-200 text-green-800 py-1.5 rounded-md hover:bg-green-300 transition text-sm"
            onClick={() => navigate("/admin/addNotice")}
        >
            Add
        </button>

        <button
                className="flex-1 bg-red-200 text-red-800 py-1.5 rounded-md hover:bg-red-300 transition text-sm"
                onClick={() => {
                    setNoticeId("");
                    setMessage("");
                    setShowRemove(true);
                }}
        >
            Remove
        </button>
        </div>


        {/* ---------------- REMOVE NOTICE ---------------- */}
        {showRemove && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs">
            <div className="bg-white p-6 rounded-lg w-87.5">

                <h2 className="text-lg font-semibold mb-4 text-center">
                Remove Notice
                </h2>

                <input
                type="text"
                placeholder="Enter Notice ID"
                className="w-full border p-2 rounded mb-4"
                value={noticeId}
                onChange={(e) => setNoticeId(e.target.value)}
                />

                {message && (
                <p className="text-sm text-center mb-3 text-red-600">
                    {message}
                </p>
                )}

                <div className="flex gap-3">
                <button
                    onClick={handleRemoveNotice}
                    disabled={loading}
                    className="flex-1 bg-red-500 text-white py-2 rounded"
                >
                    {loading ? "Deleting..." : "Delete"}
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
                Notice deleted successfully
            </div>
            </div>
        )}
    </>
  );
};


export default Notice_buttons;