import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [5, "Password should have more than 8 characters"],
    select: false,
  },
  messages: [
    {
      desc: {
        type: String,
      },
    },
  ],
});

// password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log("Entered password:", enteredPassword);
  console.log("Stored password:", this.password);
  const isCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isCorrect;
};

userSchema.statics.findOneByEmail = async function (email) {
  return this.findOne({ email });
};

userSchema.statics.createUser = async function (userData) {
  // You can add custom logic here, such as checking if the email is already taken
  const existingUser = await this.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Hash password before saving to the database
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create the new user with the provided data and hashed password
  const newUser = new this({
    ...userData,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

export default mongoose.model("User", userSchema);
