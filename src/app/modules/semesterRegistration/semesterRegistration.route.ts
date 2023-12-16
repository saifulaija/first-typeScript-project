import express from 'express';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
);

router.delete('/:id', semesterRegistrationControllers.deleteSemesterRegistration)

export const semesterRegistrationRoutes = router;
