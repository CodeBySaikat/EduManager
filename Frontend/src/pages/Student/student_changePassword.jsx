import { useState } from "react";
import axios from "axios";

const Student_ChangePassword = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // success popup state
  const [showSuccess, setShowSuccess] = useState(false);

  if (!open && !showSuccess) return null;

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      
      await axios.post(
        "http://localhost:8000/student/changePassword",   
        {
          oldPassword, 
          newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      // close form popup
      onClose();

      // show success popup
      setShowSuccess(true);

      // hide success popup after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      // clear fields
      setOldPassword("");
      setNewPassword("");

    } catch (error) {
      alert(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white px-8 py-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Password changed successfully
            </h2>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD FORM */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-87.5 relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-3xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-center mb-4">
              Change Password
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              {/* OLD PASSWORD */}
              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* NEW PASSWORD */}
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                {loading ? "Changing..." : "Change Password"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Student_ChangePassword;

















