import { useEffect, useState } from "react";
import axios from "axios";



const Check_Notices = ({ SID }) => {

  //notices state
  const [notices, setNotices] = useState([]);
  const [openAllNotices, setOpenAllNotices] = useState(false);

  //load immediately after mount
  useEffect(() => {

    if (!SID) return;

    let intervalId;

    const fetchNotices = async () => {
      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/student/viewNotice/${SID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotices(res.data?.data || []);

      } catch (err) {
        console.error("Failed to load notices", err);
      }
    };

    fetchNotices();

    // auto refresh
    // intervalId = setInterval(fetchNotices, 15000);

    // return () => clearInterval(intervalId);

  }, [SID]);

  return (
    <>
      {/* Daily notices preview */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between mb-4 items-center">
          <h3 className="font-semibold text-lg">Daily Notices</h3>

          <button
            onClick={() => setOpenAllNotices(true)}
            className="text-blue-600 text-sm hover:underline"
          >
            See all
          </button>
        </div>

        <div className="space-y-4 text-sm">
          {notices.slice(0, 3).map((n) => (
            <div key={n._id}>
              <p className="font-semibold">{n.title}</p>
              <p className="text-gray-500 line-clamp-2">
                {n.content}
              </p>
            </div>
          ))}

          {!notices.length && (
            <p className="text-gray-400">No notices</p>
          )}
        </div>
      </div>

      {/* All notices popup */}
      {openAllNotices && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-200 max-h-[80vh] overflow-y-auto rounded-xl p-6 ">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">All Notices</h3>

              <button
                onClick={() => setOpenAllNotices(false)}
                className="text-white bg-red-600 hover:bg-red-400 p-2 rounded-xl font-semibold text-sm"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {notices.map((n) => (
                <div
                  key={n._id}
                  className="border rounded-xl p-4 shadow-lg hover:shadow-green-600"
                >
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Notice ID: {n.noticeId}</span>
                    <span>
                      {new Date(n.createdAt).toLocaleDateString()}{" "}
                      {new Date(n.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  <h4 className="font-semibold">{n.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {n.content}
                  </p>
                </div>
              ))}

              {!notices.length && (
                <p className="text-center text-gray-400">
                  No notices found
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};


export default Check_Notices;
