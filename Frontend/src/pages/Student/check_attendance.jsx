import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Check_Student_Attendance = ({open, onClose, SID, onPercentage = () => {}}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  useEffect(() => {
    if (!open) return;

    const fetchAttendance = async () => {
      if (!SID) {
        alert("SID is Required");
        return;
      }

      console.log("SID", SID);
      
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:8000/student/checkAttendance/${SID}`,
          {
            headers: { 
              Authorization: `Bearer ${token}` 
            },
          }
        );

        const data = res.data.data || [];
        setRecords(data);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tillToday = data.filter((r) => {
          const d = new Date(r.date);
          d.setHours(0, 0, 0, 0);

          //here changes for ignore saturday & sunday
          const day = d.getDate(); //0 => sun, 6=>sat

          // ignore saturday & sunday -> in attendance
          const isWeekend = day === 0 || day === 6;

          return d <= today;
        });

        const total = tillToday.length;
        const present = tillToday.filter((r) => r.present === true).length;

        const percentage =
        total === 0 ? 0 : Math.round((present / total) * 100);

        onPercentage(percentage);

        //store percentage
        localStorage.setItem("attendancePercentage", percentage);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [open, SID, onPercentage]);

  // -------------------------------
  // attendance map
  // -------------------------------
  const attendanceMap = useMemo(() => {
    const map = {};
    records.forEach((r) => {
      const d = new Date(r.date);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().split("T")[0];
      map[key] = r.present;
    });
    return map;
  }, [records]);

  // -------------------------------
  // calendar helpers
  // -------------------------------
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const daysArray = [];

  for (let i = 0; i < startDay; i++) daysArray.push(null);
  for (let d = 1; d <= totalDays; d++) daysArray.push(new Date(year, month, d));

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // --------------------------------------------------
  // NEW – month & year options
  // --------------------------------------------------
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const currentYear = new Date().getFullYear();

  const yearOptions = [];
  for (let y = currentYear - 5; y <= currentYear + 1; y++) {
    yearOptions.push(y);
  }

  const handleMonthChange = (e) => {
    setCurrentMonth(new Date(year, Number(e.target.value), 1));
  };

  const handleYearChange = (e) => {
    setCurrentMonth(new Date(Number(e.target.value), month, 1));
  };
  // --------------------------------------------------

  if (!open) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="relative bg-white rounded-xl w-205 max-h-[85vh] overflow-y-auto p-6 z-10">

        {/* header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Attendance Calendar</h2>

          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded bg-red-500 text-white"
          >
            Close
          </button>
        </div>

        {/* ------------------------------------------------ */}
        {/* UPDATED HEADER – buttons + month/year select */}
        {/* ------------------------------------------------ */}
        <div className="flex justify-between items-center mb-4">

          <button
            onClick={prevMonth}
            className="px-3 py-1 rounded bg-gray-200"
          >
            ◀
          </button>

          <div className="flex gap-2 items-center">

            {/* month select */}
            <select
              value={month}
              onChange={handleMonthChange}
              className="border rounded px-2 py-1 text-sm"
            >
              {monthNames.map((m, idx) => (
                <option key={idx} value={idx}>
                  {m}
                </option>
              ))}
            </select>

            {/* year select */}
            <select
              value={year}
              onChange={handleYearChange}
              className="border rounded px-2 py-1 text-sm"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

          </div>

          <button
            onClick={nextMonth}
            className="px-3 py-1 rounded bg-gray-200"
          >
            ▶
          </button>
        </div>
        {/* ------------------------------------------------ */}

        {/* weekdays */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center font-medium text-sm">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {daysArray.map((dateObj, index) => {
              if (!dateObj) return <div key={index} />;

              const cellDate = new Date(dateObj);
              cellDate.setHours(0, 0, 0, 0);

              const key = cellDate.toISOString().split("T")[0];

              const isFuture = cellDate > today;

              const isWeekend =
                cellDate.getDay() === 0 || cellDate.getDay() === 6;

              const status = isFuture ? undefined : attendanceMap[key];

              let bg = "bg-gray-100 text-gray-800";

              if (!isFuture && isWeekend) {
                bg = "bg-indigo-100 text-indigo-800";
              }

              if (status === true) bg = "bg-green-500 text-white";
              if (status === false) bg = "bg-red-500 text-white";

              if (isFuture) bg = "bg-gray-200 text-gray-400";

              return (
                <div
                  key={index}
                  className={`h-20 rounded-lg flex flex-col items-center justify-center text-sm ${bg}`}
                >
                  <div className="font-semibold">
                    {cellDate.getDate()}
                  </div>

                  {status === true && (
                    <div className="text-xs mt-1">Present</div>
                  )}

                  {status === false && (
                    <div className="text-xs mt-1">Absent</div>
                  )}

                  {!isFuture && isWeekend && status === undefined && (
                    <div className="text-[10px] mt-1">Weekend</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Check_Student_Attendance;
