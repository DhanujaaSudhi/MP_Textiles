// const {Schema, model} = require('mongoose');
// const bcrypt = require('bcrypt');

// const userShecma = new Schema({
//     username: {type: String, require: true, unique: true},
//     email: {type: String, require: true, unique: true},
//     password: {type: String, require: true},
//     role: {
//         type: String, default: 'user'
//     },
//     profileImage: String,
//     bio: {type: String, maxlength: 200},
//     profession: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // hashing passwords
// userShecma.pre('save', async function(next){
//     const user =  this;
//     if(!user.isModified('password')) return next();
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     next();
// })

// // match passwords
// userShecma.methods.comparePassword = function (cadidatePassword) {
//     return bcrypt.compare(cadidatePassword, this.password)
// }

// const User = new model('User', userShecma);
// module.exports = User;

// const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: false, unique: true }, // Allow auto-assign if missing
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
//   profileImage: String,
//   bio: { type: String, maxlength: 200 },
//   profession: String,
//   otpVerified: { type: Boolean, default: false }, // Ensure OTP verification before registration
//   createdAt: { type: Date, default: Date.now },
// });

// // 🔒 Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // 🔑 Compare passwords during login
// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// // 🔄 Auto-generate `username` if missing (to prevent null username errors)
// userSchema.pre("validate", function (next) {
//   if (!this.username) {
//     this.username = this.email.split("@")[0]; // Use part of email as username if missing
//   }
//   next();
// });

// const User = model("User", userSchema);
// module.exports = User;

// const express = require("express");
// const User = require("./user.model");
// const generateToken = require("../middleware/generateToken");
// const router = express.Router();

// // Register endpoint
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body; // ✅ Added `name`

//   // Validation Check
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User already registered. Please log in." });
//     }

//     const newUser = new User({
//       name,
//       username: email.split("@")[0], // ✅ Auto-generate username from email
//       email,
//       password,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully." });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });

// // Login endpoint
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Incorrect password" });

//     const token = await generateToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     });

//     res.status(200).json({
//       message: "Logged in successfully",
//       token,
//       user: {
//         _id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         profession: user.profession,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in user", error);
//     res.status(500).json({ message: "Error logging in user" });
//   }
// });

// // Logout endpoint
// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({ message: "Logged out successfully" });
// });

// module.exports = router;

// // -------- user.model.js --------
// const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
//   profileImage: String,
//   bio: { type: String, maxlength: 200 },
//   profession: String,
//   createdAt: { type: Date, default: Date.now },
// });

// // Hash passwords before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Match passwords
// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// // Auto-generate username if missing
// userSchema.pre("validate", function (next) {
//   if (!this.username) {
//     this.username = this.email.split("@")[0];
//   }
//   next();
// });

// const User = model("User", userSchema);
// module.exports = User;

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  profileImage: String,
  bio: { type: String, maxlength: 200 },
  profession: String,
  createdAt: { type: Date, default: Date.now },
});

// Hash passwords before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match passwords
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Auto-generate username if missing
userSchema.pre("validate", function (next) {
  if (!this.username) {
    this.username = this.email.split("@")[0];
  }
  next();
});

const User = model("User", userSchema);
module.exports = User;
