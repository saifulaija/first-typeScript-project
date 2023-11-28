import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterInToDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester=catchAsync(async(req, res)=>{
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB()
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'academic semester retrieve successfully',
    data:result

  })
})

const getSingleAcademicSemester=catchAsync(async(req, res)=>{
  const id=req.params.id;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id)
  sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:'academic semester retrieve successfully',
    data:result
  })
})

const updateAcademicSemester=catchAsync(async(req,res)=>{
  const {semesterId}=req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterInToDB(semesterId, req.body) 
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'academic semester update successfully',
    data:result
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,getAllAcademicSemester,getSingleAcademicSemester,updateAcademicSemester,
};
