
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from 'express';




const globalHandler=(error:any, req:Request, res:Response, next:NextFunction)=>{
     const statusCode=500;
     const message = error.message || 'something went wrong'
     return res.status(statusCode).json({
      success:false,
      message,
      error:error
     })
}

export default globalHandler