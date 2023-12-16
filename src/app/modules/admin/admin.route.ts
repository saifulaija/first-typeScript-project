import express from 'express';

import { AdminControllers } from './admin.controller';

import validateRequest from '../../middleware/validateRequest';
import { AdminValidations } from './admin.validation';


const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;