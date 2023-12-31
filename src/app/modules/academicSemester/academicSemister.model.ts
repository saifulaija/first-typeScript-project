import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodeSchema,
  AcademicSemesterNameSchema,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, required: true, enum: AcademicSemesterNameSchema },
  year: { type: String, required: true },
  code: { type: String, required: true, enum: AcademicSemesterCodeSchema },
  startMonth: { type: String, enum: Months, required: true },
  endMonth: { type: String, enum: Months, required: true },
});

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'semester already exist');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
