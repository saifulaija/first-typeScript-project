import Joi from 'joi';
const studentNameValidationSchema = Joi.object({
      firstName: Joi.string().required().messages({
        'any.required': 'The first name is required.',
      }),
      middleName: Joi.string(),
      lastName: Joi.string().required().messages({
        'any.required': 'The last name is required.',
      }),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNo: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNo: Joi.string().required(),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNo: Joi.string().required(),
    });

    const studentValidationSchema = Joi.object({
      id: Joi.string().required().messages({
        'any.required': 'Student ID is required.',
      }),
      name: studentNameValidationSchema.required().messages({
        'any.required': 'Student name is required.',
      }),
      gender: Joi.string()
        .valid('female', 'male', 'other')
        .required()
        .messages({
          'any.only':
            "Gender must be one of the following: 'female', 'male', 'other'.",
          'any.required': 'Gender is required.',
        }),
      email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.email': '{VALUE} is not a valid email.',
      }),
      dateOfBirth: Joi.string(),
      contactNo: Joi.string().required().messages({
        'any.required': 'Contact number is required.',
      }),
      emergencyNo: Joi.string().required().messages({
        'any.required': 'Emergency contact number is required.',
      }),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required(),
      presentAddress: Joi.string().required().messages({
        'any.required': 'Present address is required.',
      }),
      permanentAddress: Joi.string().required().messages({
        'any.required': 'Permanent address is required.',
      }),
      guardian: guardianSchema.required().messages({
        'any.required': 'Guardian information is required.',
      }),
      localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local guardian information is required.',
      }),
      profileImg: Joi.string(),
      isActive: Joi.string().valid('active', 'blocked').default('active'),
    });
export default studentValidationSchema;