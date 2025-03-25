const express = require("express");
const router = express.Router();
const { sendOTP } = require("../utils/test-email"); // Adjust the path if needed

// Store OTPs in memory (for production, use a database)
const otps = {};

// Route to send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const otp = await sendOTP(email);
    otps[email] = otp;
    console.log(`OTP for ${email}: ${otp}`); // For testing, remove in production
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Route to verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otps[email] && otps[email] === otp) {
    delete otps[email]; // Remove OTP after successful verification
    res.status(200).json({ message: "OTP verified" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
