import { z } from 'zod';

const StudentNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const GuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
});

const StudentSchemaZod = z.object({
  id: z.string(),
  password: z.string(),
  name: StudentNameSchema,
  gender: z.enum(['female', 'male', 'other']),
  email: z.string().email(),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).optional(),
  isDeleted:z.boolean()
});
export default StudentSchemaZod;