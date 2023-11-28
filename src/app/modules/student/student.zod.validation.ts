import { z } from 'zod';

const StudentNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
});

const createStudentValidationSchema = z.object({
  body:z.object({
   
    password: z.string(),
    student:z.object({
      
    name: StudentNameValidationSchema,
    gender: z.enum(['female', 'male', 'other']),
    email: z.string().email(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string(),
    emergencyNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImg: z.string().optional(),
    admissionSemester:z.string()
    
    })
  })
});
export const studentValidations={
 createStudentValidationSchema,
};