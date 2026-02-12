import { useEffect, useState } from "react";
import axios from "axios";

const Check_Student_Details = ({ open, onClose, SID }) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    if (!open || !SID) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/student/viewDetails/${SID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

  }, [open, SID]);


  if (!open) return null;

  const { student, attendance, grade, currentClass } = data || {};



  return (
    <>
      {/* BLUR BACKDROP */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Student Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>

          {loading && <p>Loading...</p>}

          {!loading && student && (
            <div className="space-y-5">

              {/* BASIC INFO */}
              <div>
                <h3 className="font-semibold mb-2 text-green-500"><i>Basic Details</i></h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p><b>SID:</b> {student.SID}</p>
                  <p><b>Name:</b> {student.name}</p>
                  <p><b>Gender:</b> {student.gender}</p>
                  <p><b>DOB:</b> {student.DOB}</p>
                  <p><b>Address:</b> {student.address}</p>
                  <p><b>Contact:</b> {student.contactNumber}</p>
                  <p><b>Email:</b> {student.email}</p>
                  <p><b>Enrollment Date:</b> {student.enrollmentDate}</p>
                </div>
              </div>

              {/* PARENTS */}
              <div>
                <h3 className="font-semibold mb-2 text-green-500"><i>Parent Details</i></h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p><b>Father:</b> {student.father}</p>
                  <p><b>Father Contact:</b> {student.fatherContactNumber}</p>
                  <p><b>Mother:</b> {student.mother}</p>
                  <p><b>Mother Contact:</b> {student.motherContactNumber}</p>
                </div>
              </div>

              {/* FEES + ATTENDANCE */}
              <div>
                <h3 className="font-semibold mb-2 text-green-500"><i>Academic Summary</i></h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p>
                    <b>Pending Fees:</b>{" "}
                    {student.pendingFees ?? 0}
                  </p>
                  {/* <p>
                    <b>Total Attendance:</b>{" "}
                    {attendance?.totalPercentage ?? "N/A"}%
                  </p> */}
                </div>
              </div>

              {/* CURRENT CLASS */}
              <div>
                <h3 className="font-semibold mb-2 text-green-500"><i>Current Class</i></h3>
                <p className="text-sm">
                  {currentClass?.className || currentClass?.name || "N/A"}
                </p>
              </div>

              {/* GRADES */}
              {/* <div>
                <h3 className="font-semibold mb-2">Grades (Course wise)</h3>

                {!grade?.courses?.length && (
                  <p className="text-sm text-gray-500">
                    No grades available
                  </p>
                )}

                {grade?.courses?.length > 0 && (
                  <table className="w-full border text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-2 py-1">Course ID</th>
                        <th className="border px-2 py-1">Course Name</th>
                        <th className="border px-2 py-1">Grade No</th>
                        <th className="border px-2 py-1">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grade.courses.map((c, i) => (
                        <tr key={i}>
                          <td className="border px-2 py-1">{c.courseId}</td>
                          <td className="border px-2 py-1">{c.courseName}</td>
                          <td className="border px-2 py-1">{c.gradeNumber}</td>
                          <td className="border px-2 py-1">{c.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div> */}

            </div>
          )}
        </div>
      </div>
    </>
  );
};


export default Check_Student_Details;
