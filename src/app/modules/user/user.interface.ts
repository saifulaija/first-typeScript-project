/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser  {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};


export interface UserModel extends Model<TUser> {
 isUserExistsByCustomId(id:string):Promise<TUser>;
 isPasswordMatch(plainTextPassword:string,hashTextPassword:string):Promise<boolean>;
 isDeleted(user:TUser):Promise<TUser>;
 userStatus(user:TUser):Promise<string>;
}