import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TStudentName,
} from './student/student.interface';

const StudentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user is required'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: StudentNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['female', 'male', 'other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    dateOfBirth: { type: String },
    contactNo: { type: String, required: true },
    emergencyNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: GuardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemester:{
      type:Schema.Types.ObjectId,
      ref:'AcademicSemester'
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual-----

StudentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

//query middleware or hook-------

StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//query hook for aggregate
// [ { '$match': { id: '1205' } } ], [ { '$match': { isDeleted:{$ne:true} } } ]

StudentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline())
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creatting static method-----

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = Student.findOne({ id });
  return existingUser;
};

//create model custome instanse method----------

// StudentSchema.methods.isUserExist=async function(id:string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', StudentSchema);
