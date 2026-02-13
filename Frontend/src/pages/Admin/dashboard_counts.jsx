import { useEffect, useState } from "react";
import axios from "axios";

const DashboardCounts = ({ refreshKey }) => {

  const [counts, setCounts] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalCourses: 0,
    totalNotices: 0
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadCounts = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/dashboard/fetch/counts",
           {
            headers: {
                Authorization: `Bearer ${token}`
            }
           }
        );

        // 🔴 IMPORTANT – because you are using ApiResponse
        const data = res.data?.data;

        if (data) {
          setCounts({
            totalStudents: data.totalStudents || 0,
            totalTeachers: data.totalTeachers || 0,
            totalClasses: data.totalClasses || 0,
            totalCourses: data.totalCourses || 0,
            totalNotices: data.totalNotices || 0
          });
        }

      } catch (err) {
        console.error("Failed to load dashboard counts", err);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();

  }, [refreshKey]);

  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-6">

      {/* Students */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">Total Students</p>
        <h3 className="text-3xl font-bold mt-2">
          {loading ? "..." : counts.totalStudents}
        </h3>
      </div>

      {/* Teachers */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">Total Teachers</p>
        <h3 className="text-3xl font-bold mt-2">
          {loading ? "..." : counts.totalTeachers}
        </h3>
      </div>

      {/* Classes */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">Total Classes</p>
        <h3 className="text-3xl font-bold mt-2">
          {loading ? "..." : counts.totalClasses}
        </h3>
      </div>

      {/* Courses */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">Total Courses</p>
        <h3 className="text-3xl font-bold mt-2">
          {loading ? "..." : counts.totalCourses}
        </h3>
      </div>

      {/* Notices – bigger card */}
      <div className="bg-white rounded-2xl shadow p-6 col-span-2 row-span-2 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Notices</p>
          <h3 className="text-4xl font-bold mt-2">
            {loading ? "..." : counts.totalNotices}
          </h3>
        </div>

        <div className="text-sm text-gray-500 mt-6">
          Latest notices and announcements will be shown here.
        </div>
      </div>

    </div>
  );
};

export default DashboardCounts;
