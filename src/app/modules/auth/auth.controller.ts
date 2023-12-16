import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser=catchAsync(async(req,res)=>{
      const result =await authServices.loginUser(req.body)
      sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:'user is logged in successfully',
            data:result
      })
})

export const authControllers={
      loginUser
} 