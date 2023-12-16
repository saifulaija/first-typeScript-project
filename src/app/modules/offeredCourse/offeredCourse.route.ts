import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';
const router = express.Router();
router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
);

router.patch('/:id', validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),offeredCourseControllers.updateOfferedCourse)
router.get('/', offeredCourseControllers.getAllOfferedCourse)
router.get('/:id', offeredCourseControllers.getSingleOfferedCourse)
router.delete('/:id', offeredCourseControllers.deleteOfferedCourse)

export const OfferedCourseRoutes = router;
