/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import config from '../config';
import handleZodError from '../errors/handleZodErrors';
import { TErrorSources } from '../interface/error';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

const globalHandler: ErrorRequestHandler = (error, req, res, next) => {
  //setting default value------

  let statusCode = error.statusCode || 500;
  let message = error.message || 'something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  //handler

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidatorError') {
    console.log('ame mongoose ar error');
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,

    //     error: error,
  });
};

export default globalHandler;
