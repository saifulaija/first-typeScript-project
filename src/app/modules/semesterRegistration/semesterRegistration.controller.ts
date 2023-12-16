import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration is retrieved successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration is retrieved successfully',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
 

  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester registration updated successfully',
    data: result,
  });
});

const deleteSemesterRegistration=catchAsync(async(req,res)=>{
  const {id}=req.params;
  const result = await semesterRegistrationServices.deleteSemesterRegistrationFromDB(id)
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'semester registration is deleted successfully',
    data:result
  })
})

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration
};
