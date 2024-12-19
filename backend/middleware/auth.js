import ErrorHandler from "../utils/errorhandler";
import catchAsyncErrors from "./catchAsyncErrors";
import { verify } from "jsonwebtoken";
import { findById } from "../models/userModel";

export const isAuthenticatedUser = catchAsyncErrors(async (req, _res, next) => {
  // const {token} = req.cookies;
  try {
    const token = req.header("token");

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resource", 401)
      );
    }

    const decodedData = verify(token, process.env.JWT_SECRET);

    req.user = await findById(decodedData.id);

    next();
  } catch (error) {
    return next(new ErrorHandler("Some Internal Error Occured", 401));
  }
});
