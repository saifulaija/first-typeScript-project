import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// import studentValidationSchema from './student.validation';

const getAllStudents = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Students are retrieved successfully',
    data: result,
    success: true,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student is retrieved successfully',
    data: result,
    success: true,
  });
});

const deleteSingleStudentByUpdate = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentByUpdateDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'delete student successfully',
    data: result,
    success: true,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentInToDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student update successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudentByUpdate,
  updateStudent,
};
