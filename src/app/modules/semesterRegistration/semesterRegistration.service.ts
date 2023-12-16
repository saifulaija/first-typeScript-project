/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemister.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';
import mongoose from 'mongoose';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any semester register that is already 'UPCOMING' or "ONGOING"

  const isThereAnyUpcomingOrOngoingSemesterRegistration =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.UPCOMING },
        { status: registrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemesterRegistration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemesterRegistration.status} semester registered !`,
    );
  }

  //check if the academic semester is exist

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This academic semester not fund',
    );
  }

  //check semester registration exist

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester registration is already exist',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  //check if the semester registration is exist

  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester register is already exists',
    );
  }

  //if the semester registration is ended we will not update anything

  const CurrentRequestedSemesterRegistrationStatus =
    isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (CurrentRequestedSemesterRegistrationStatus === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester registration is already ${CurrentRequestedSemesterRegistrationStatus}`,
    );
  }

  //UPCOMING--->ONGOING-->ENDED

  if (
    CurrentRequestedSemesterRegistrationStatus ===
      registrationStatus.UPCOMING &&
    requestedStatus === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly change status from ${CurrentRequestedSemesterRegistrationStatus} to ${requestedStatus}`,
    );
  }

  if (
    CurrentRequestedSemesterRegistrationStatus === registrationStatus.ONGOING &&
    requestedStatus === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not directly change status from ${CurrentRequestedSemesterRegistrationStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB=async(id:string)=>{
  const isSemesterRegistrationExists=await SemesterRegistration.findById(id)
  if(!isSemesterRegistrationExists){
    throw new AppError(httpStatus.NOT_FOUND,'semester registration not found')
  }

  // checking if the status is still "UPCOMING"

  const semesterRegistrationStatus=isSemesterRegistrationExists.status
  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not delete as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession()
 try {
  session.startTransaction();
  const deletedOfferedCourse = await OfferedCourse.deleteMany(
    {
      semesterRegistration: id,
    },
    {
      session,
    },
  );

  if (!deletedOfferedCourse) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete semester registration !',
    );
  }

  const deletedSemesterRegistration =
  await SemesterRegistration.findByIdAndDelete(id, {
    session,
    new: true,
  });

  if (!deletedSemesterRegistration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete semester registration !',
    );
  }

  await session.commitTransaction();
  await session.endSession();

  return null;



 } catch (err:any) {
  await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
 }

}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
   deleteSemesterRegistrationFromDB
};
