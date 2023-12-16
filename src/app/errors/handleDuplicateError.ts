import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extract_msg = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extract_msg} is already exist`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast error',
    errorSources,
  };
};

export default handleDuplicateError;
