import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  //check if the user exist

  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //check the use is already deleted

  //   const isDeleted=isUserExist?.isDeleted

  //   if(isDeleted){
  //       throw new AppError(httpStatus.NOT_FOUND,'this user is deleted')
  //   }

  if (await User.isDeleted(user)) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is deleted');
  }

  const userStatus = await User.userStatus(user);
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is already blocked');
  }
  console.log(userStatus);

  //   if( userStatus ==='blocked'){
  //       throw new AppError(httpStatus.NOT_FOUND,'this user is deleted')
  //   }

  // //check the user status

  // const userStatus=isUserExist?.status
  // if(userStatus === "blocked"){
  //       throw new AppError(httpStatus.BAD_REQUEST,'the user is blocked')
  // }

  // //check the password correct use static

  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'password does not match');
  }

  //create jsonwebtoken and sent to client

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(
   jwtPayload,
    config.jwt_access_secret as string,
    { expiresIn: "10d"},
  );

  return {
      accessToken,
      needPasswordChange:user?.needsPasswordChange
  }
};

export const authServices = {
  loginUser,
};
