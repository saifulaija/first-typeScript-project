import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
   sendResponse(res, {
    statusCode:httpStatus.OK,
    message:'student created successfully',
    data:result,
    success:true
   })

  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};

