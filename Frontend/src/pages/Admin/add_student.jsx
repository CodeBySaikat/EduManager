import { useState } from "react";
import axios from "axios";

const Add_Student = () => {

  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(null);

  const[SID, setSID] = useState("");
  const[name, setName] = useState("");
  const[gender, SetGender] = useState("");
  const[DOB, setDOB] = useState();
  const[address, setAddress] = useState("");
  const[contactNumber, SetContactNumber] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[father, setFather] = useState("");
  const[mother, setMother] = useState("");
  const[fatherContactNumber, setFatherContactNumber] = useState("");
  const[motherContactNumber, setMotherContactNumber] = useState("");
  const[enrollmentDate, setEnrollmentDate] = useState("");
  const[pendingFees, setPendingFees] =useState("");

  // Handle submit function
  const handleSubmitFunction = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); //for verify JWT token as a admin

      console.log("Token", token);

      if(!token) {
        setError("Unauthorized: Please Login as Admin");
        return;
      };

    const response = await axios.post(
        'http://localhost:8000/admin/addStudent',
        {
          SID,
          name,
          gender,
          DOB,
          address,
          contactNumber,
          email,
          password,
          father,
          fatherContactNumber,
          mother,
          motherContactNumber,
          enrollmentDate,
          pendingFees,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
    );

    console.log("Student added:", response.data);
    alert("Student Registration Successfully")

    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 p-6">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT: FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            STUDENT REGISTRATION FORM
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Student ID (SID)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSID(e.target.value)}
            />

            <input
              type="text"
              placeholder="Student Name"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
            />

            <select className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => SetGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>

            <input
              type=""
              placeholder="Date of Birth (YYYY-MM-DD)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDOB(e.target.value)}
            />

            <input
              type="text"
              placeholder="Address"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Contact Number"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => SetContactNumber(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="text"
              placeholder="Father's Name"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFather(e.target.value)}
            />

            <input
              type="text"
              placeholder="Father's Contact Number"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFatherContactNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mother's Name"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMother(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mother's Contact Number"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMotherContactNumber(e.target.value)}
            />

            <input
              type=""
              placeholder="Enrollment Date (YYYY-MM-DD)"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEnrollmentDate(e.target.value)}
            />

            <input
              type="number"
              placeholder="Pending Fees"
              className="w-full h-10 px-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPendingFees(e.target.value)}
            />

            <button className="w-full h-11 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmitFunction}
            >
              {loading? "Submitting..." : "Submit"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwc3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Student Registration"
            className="h-full w-full object-cover absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Add_Student;