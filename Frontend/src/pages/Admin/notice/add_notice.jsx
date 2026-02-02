import { useState } from "react";
import axios from "axios";

const Add_Notice = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [noticeId, setNoticeId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmitFunction = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Please login as Admin");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/admin/addNotice",
        {
          noticeId,
          title,
          content
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Notice created:", response.data);
      alert("Notice created successfully");

    } catch (error) {
      setError(error.response?.data?.message || "Notice creation failed");
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
            CREATE NOTICE
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Notice ID"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setNoticeId(e.target.value)}
            />

            <input
              type="text"
              placeholder="Notice Title"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Notice Content"
              rows={6}
              className="w-full px-3 py-2 border rounded-md outline-none resize-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              className="w-full h-11 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={handleSubmitFunction}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Notice"}
            </button>

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

          </div>
        </div>

        {/* RIGHT : IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://classroomclipart.com/image/static7/preview2/boy-looking-at-list-on-school-notice-board-back-to-school-clipar-48265.jpg"
            alt="Create Notice"
            className="h-full w-full object-cover absolute inset-0"
          />
        </div>
        
      </div>
    </div>
  );
};

export default Add_Notice;
