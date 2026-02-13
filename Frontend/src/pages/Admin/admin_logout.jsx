import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminLogout = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   logoutHandler();
  // }, []);

  useEffect(() => {

    const admin_logoutHandler = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        await axios.post(
          "http://localhost:8000/admin/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // show success popup
        setOpen(true);

        // redirect after short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);

      } catch (error) {
        console.error("Admin Logout failed", error);
        alert("Admin Logout failed");
      } finally {
        setLoading(false);
      }
    };

    admin_logoutHandler();

  }, [])



  return (
    <>
      {/* Logout button */}
      {/* <button
        onClick={logoutHandler}
        disabled={loading}
        className="px-4 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
      >
        {loading ? "Logging out..." : "Logout"}
      </button> */}


      {/* SUCCESS POPUP */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BLUR BACKGROUND */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* MODAL */}
          <div className="relative bg-white w-80 rounded-xl shadow-lg p-6">

            <h2 className="text-3xl font-bold text-center mb-3 text-green-600">
              Logout Successful
            </h2>

            {/* <p className="text-center text-sm text-gray-600">
              You have been logged out successfully.
            </p> */}

            <p className="text-center text-black mt-1">
              Redirecting to login page...
            </p>

          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogout;
