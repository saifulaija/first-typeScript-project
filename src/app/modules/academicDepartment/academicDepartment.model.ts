import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartment = await academicDepartment.findOne({ name: this.name });
  if (isDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exist',
    );
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isQueryId = await academicDepartment.findOne(query);

  if (!isQueryId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist');
  }
  next();
});

export const academicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
