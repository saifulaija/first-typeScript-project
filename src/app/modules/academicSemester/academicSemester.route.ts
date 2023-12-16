import express from 'express';
import { AcademicSemesterControllers } from './academicSemister.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicsemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
