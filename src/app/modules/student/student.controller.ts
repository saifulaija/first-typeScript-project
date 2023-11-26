import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// import studentValidationSchema from './student.validation';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Students are retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student is retrieved successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'delete student successfully',
    data: result,
    success: true,
  });
};

const deleteSingleStudentByUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result =
      await StudentServices.deleteSingleStudentByUpdateDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'delete student successfully',
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  deleteSingleStudentByUpdate,
};
