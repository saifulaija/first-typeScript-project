// import express from 'express';
// import { UserControllers } from './user.controller';

// import { studentValidations } from '../student/student.zod.validation';
// import validateRequest from '../../middleware/validateRequest';

// const router = express.Router();

// router.post(
//   '/create-student',
//   validateRequest(studentValidations.createStudentValidationSchema),
//   UserControllers.createStudent,
// );

// export const UserRoutes = router;



import express from 'express';

import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.zod.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
