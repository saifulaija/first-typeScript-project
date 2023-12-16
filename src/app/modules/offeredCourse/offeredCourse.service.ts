import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { Course } from '../Course/course.model';
import { academicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offeredcourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  //check if the semester registration id is exist--
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment: AcademicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'semester registration not found');
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic faculty not found');
  }
  const isAcademicDepartmentExists =
    await academicDepartment.findById(AcademicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic department not found');
  }
  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'course not found');
  }
  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty not found');
  }

  //check if the department belong to to faculty

  const isDepartmentBelongToFaculty = await academicDepartment.findOne({
    academicFaculty,
    _id: AcademicDepartment,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to this faculty of ${isAcademicFacultyExists.name}`,
    );
  }

  //check the same course same section register semester exists

  const isSemesterOfferedCourseExistsWithTheSameRegistrationSemesterWithTheSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (
    isSemesterOfferedCourseExistsWithTheSameRegistrationSemesterWithTheSameSection
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'offered course is already same section',
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime ');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `this faculty is not available at that time ! Choose other time or date`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course not found');
  }

  //check faculty

  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty not found');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  //get the schedule of the faculties

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `you can not update offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime ');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `this faculty is not available at that time ! Choose other time or date`,
    );
  }

  const result = await OfferedCourse.findById(id, payload, {
    new: true,
  });
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course not found');
  }

  const result = await OfferedCourse.findById(id);
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'offered course not found');
  }

  const semesterRegistration = isOfferedCourseExists?.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.CONFLICT,
      'you can not delete the offered course',
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
};
