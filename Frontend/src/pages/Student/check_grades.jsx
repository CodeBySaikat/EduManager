import axios from "axios";
import { useEffect, useState } from "react";

const Check_Student_Grades = ({ open, onClose, SID, onOverallGrade }) => { // 🔴 CHANGED

  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //CHANGED → grade point to letter
  const gradePointToLetter = (gp) => {
    if (gp === 10) return "A+";
    if (gp === 9) return "A";
    if (gp === 8) return "B+";
    if (gp === 7) return "B";
    if (gp === 6) return "C+";
    if (gp === 5) return "C";
    if (gp === 4) return "D";
    return "F";
  };

  useEffect(() => {
    if (!open || !SID) return;

    const fetchGrades = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/student/checkGrades/${SID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data;

        setGrades(data);

        // =========================================
        // overall grade from grade points
        // =========================================

        let overallLetter = "-";

        if (data.length > 0) {

          const totalPoints = data.reduce(
            (sum, g) => sum + Number(g.grade || 0),
            0
          );

          const avgPoint = Math.round(totalPoints / data.length);

          overallLetter = gradePointToLetter(avgPoint);
        }

        // =========================================
        // store & send to dashboard
        // =========================================

        localStorage.setItem("overallGrade", overallLetter);

        if (onOverallGrade) {
          onOverallGrade(overallLetter);
        }

      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load grades"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [open, SID, onOverallGrade]); 

  if (!open) return null;

  // group by course
  const grouped = grades.reduce((acc, item) => {

    const key = item.courseId || "Unknown";

    if (!acc[key]) {
      acc[key] = {
        courseName: item.courseName || "",
        list: []
      };
    }

    acc[key].list.push(item);

    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-semibold mb-4">
          My Grades
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && Object.keys(grouped).length === 0 && (
          <p>No grades found.</p>
        )}

        <div className="space-y-4 max-h-100 overflow-y-auto">

          {/* single table for all courses */}
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Course ID</th>
                <th className="border p-2">Course Name</th>
                <th className="border p-2">Grade Number</th>
                <th className="border p-2">Grade</th>
              </tr>
            </thead>
            <tbody>

              {Object.entries(grouped).map(([courseId, obj]) => {

                // course grade point average
                const avgPoint = Math.round(
                  obj.list.reduce((s, g) => s + Number(g.grade || 0), 0)
                  / obj.list.length
                );

                const letter = gradePointToLetter(avgPoint);

                return (
                  <tr key={courseId}>
                    <td className="border p-2 text-center">
                      {courseId}
                    </td>
                    <td className="border p-2 text-center">
                      {obj.courseName || "-"}
                    </td>
                    <td className="border p-2 text-center">
                      {avgPoint}
                    </td>
                    <td className="border p-2 text-center">
                      {letter}
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>

        </div>

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default Check_Student_Grades;
