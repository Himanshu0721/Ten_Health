import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import PDFDocument from "pdfkit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import bcrypt from "bcryptjs";
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const users = await User.findOne({ email }).select("+password");

    if (users) {
      return next(new ErrorHandler("User is already exist please login", 401));
    }

    const user = await User.createUser({
      name: name,
      email: email,
      password: password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler("Failed to Sign up"));
  }
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if both email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  try {
    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log("User not found with email:", email);
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Check if the password matches
    const isPasswordMatched = await user.comparePassword(passwordHash);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    // Send token upon successful login
    sendToken(user, 200, res);
  } catch (error) {
    // Log and handle unexpected errors
    console.error("Error during login:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return next(new ErrorHandler("Logout Failed"));
  }
});

const genAI = new GoogleGenerativeAI("AIzaSyAM1T6li4pgjil1q55wbC_UvYq-cbNJs2I");
const answer = async (question) => {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = question;
    const result = await model.generateContent(prompt);
    // const response = await result.response;
    const res = result.response;
    const text = res.text();
    // console.log(text);
    return text;
  } catch (error) {
    window.alert(error);
  }
};

export const generatePdf = catchAsyncErrors(async (req, res, next) => {
  try {
    const { text } = req.body;
    // Create a PDF document
    const doc = new PDFDocument();
    const fileName = "output.pdf";
    // Set content disposition to force the browser to download the file
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");
    // Pipe the PDF content to the response
    doc.pipe(res);

    doc.fontSize(21).text("Blueprint According to your Response").moveDown();
    doc.fontSize(12).text(text.commonText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the Executive summary statement")
      .moveDown();
    doc.fontSize(12).text(text.executiveText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Market Analysis")
      .moveDown();
    doc.fontSize(12).text(text.marketText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Product Description")
      .moveDown();
    doc.fontSize(12).text(text.productText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Business Model")
      .moveDown();
    doc.fontSize(12).text(text.buisnessText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Financial Plan")
      .moveDown();
    doc.fontSize(12).text(text.financialText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Marketing and Sales Strategy")
      .moveDown();
    doc.fontSize(12).text(text.marketingText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Guidance Plan")
      .moveDown();
    doc.fontSize(12).text(text.guidanceText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Mission Statement")
      .moveDown();
    doc.fontSize(12).text(text.missionText).moveDown();

    doc
      .fontSize(18)
      .text("Explaining the detail about the Vision Statement")
      .moveDown();
    doc.fontSize(12).text(text.visionText).moveDown();

    doc.fontSize(18).text("Analysis on Technology & Innovation").moveDown();
    doc.fontSize(12).text(text.technologyText).moveDown();

    doc.fontSize(18).text("Analysis on Digital Marketing").moveDown();
    doc.fontSize(12).text(text.digitalText).moveDown();

    doc.fontSize(18).text("Analysis on Influencer Marketing").moveDown();
    doc.fontSize(12).text(text.influencerText).moveDown();

    doc.fontSize(18).text("Analysis on Content Production").moveDown();
    doc.fontSize(12).text(text.contentText).moveDown();

    doc.fontSize(18).text("Analysis on Public Relation").moveDown();
    doc.fontSize(12).text(text.publicRelationText).moveDown();

    doc.fontSize(18).text("Analysis on Branding & Designing").moveDown();
    doc.fontSize(12).text(text.brandingText).moveDown();

    doc.fontSize(12).text(text).moveDown();

    // Finalize the PDF
    doc.end();
  } catch (error) {
    // Handle errors
    console.error(error);
    return next(error);
  }
});

export const generateResponse = catchAsyncErrors(async (req, res) => {
  try {
    const { tPrompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(tPrompt);
    const gemRes = result.response;
    const text = gemRes.text();
    res.status(200).json(text);
  } catch (error) {
    // Handle errors
    console.error(error);
    return next(error);
  }
});
