import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemister.model';
import { Student } from '../student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object -----

  const userData: Partial<TUser> = {};

  //if password is not given ,use default password

  //   if (!password) {
  //     user.password = config.default_password as string;
  //   } else {
  //     user.password = password;
  //   }

  //   const result = await User.create(studentData);
  //   return result;
  // };

  //or
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //find academic semester id-----

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //set manually generated id
  userData.id = await generateStudentId(admissionSemester );

  //create a user

  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    //set id & _id as user

    payload.id = newUser.id;
    payload.user = newUser._id; //reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
