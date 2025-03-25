const nodemailer = require("nodemailer");
require("dotenv").config();

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTP(email) {
  const otp = generateOTP(); // Generate OTP

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Your OTP for MPTEXTILES",
      text: `Your OTP is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log(`OTP sent successfully to ${email}`);

    // Return the OTP for verification
    return otp;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error; // Re-throw the error to handle it in the route
  }
}

module.exports = { sendOTP };
