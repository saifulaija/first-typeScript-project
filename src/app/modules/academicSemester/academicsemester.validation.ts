import { z } from 'zod';
import {
  AcademicSemesterCodeSchema,
  AcademicSemesterNameSchema,
  Months,
} from './academicSemester.constant';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNameSchema] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCodeSchema] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidation = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNameSchema] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    code: z
      .enum([...AcademicSemesterCodeSchema] as [string, ...string[]])
      .optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation,
};
