import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

//will call controller func


router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
// router.delete('/:studentId', StudentController.deleteSingleStudent);
router.delete('/:studentId', StudentController.deleteSingleStudentByUpdate);

export const StudentRoutes = router;
