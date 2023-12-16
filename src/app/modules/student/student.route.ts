import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from './student.zod.validation';
const router = express.Router();

//will call controller func

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteSingleStudentByUpdate);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updatedStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
