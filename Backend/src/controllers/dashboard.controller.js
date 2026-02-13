import { Student } from "../models/students.model.js";
import { Teacher } from "../models/teachers.model.js";
import { Class } from "../models/class.model.js";
import { Course } from "../models/course.model.js";
import { Notice } from "../models/notice.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const getDashboardCounts = asyncHandler( async (req, res) => {
    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      totalCourses,
      totalNotices
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Class.countDocuments(),
      Course.countDocuments(),
      Notice.countDocuments()
    ]);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                totalStudents,
                totalTeachers,
                totalClasses,
                totalCourses,
                totalNotices
            },
            "Counts Fetched Successfully"
        )
    )
});



export {getDashboardCounts}; 