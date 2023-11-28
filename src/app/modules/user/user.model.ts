import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, unique:true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['student', 'faculty', 'admin'] },
    status: { type: String, enum: ['in-progress', 'blocked'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);



//pree save hook or widdleware ----will work on create () or save()

userSchema.pre('save', async function (next) {
      // console.log(this, 'pree hookk: we will save the data')
      //hasing passwor and save to db
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const user = this;
      user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
      );
      next();
    });
    
    //post save middleware or hook---- empty string
    
    userSchema.post('save', function (doc, next) {
      doc.password = '';
    
      next();
    });
    

export const User=model<TUser>('User', userSchema)
