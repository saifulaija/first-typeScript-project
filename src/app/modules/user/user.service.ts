import config from '../../config';
import { Student } from '../student.model';
import { TStudent } from '../student/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

  //set manually generated id
  userData.id = '203010003';
  //create a user

  const newUser = await User.create(userData);

  //create a student

  if (Object.keys(newUser).length) {
    //set id & _id as user

    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
