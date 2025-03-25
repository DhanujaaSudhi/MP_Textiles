
// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [otp, setOtp] = useState("");
//     const [otpSent, setOtpSent] = useState(false);
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [message, setMessage] = useState("");
//     const [isSendingOtp, setIsSendingOtp] = useState(false);
//     const navigate = useNavigate();

//     // Handle sending OTP
//     const handleSendOtp = async () => {
//         if (!email) {
//             setMessage("Please enter your email.");
//             return;
//         }
//         setIsSendingOtp(true);
//         try {
//             const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
//             if (response.status === 200) {
//                 setOtpSent(true);
//                 setMessage("OTP sent to your email.");
//             } else {
//                 setMessage("Failed to send OTP.");
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             setMessage("Failed to send OTP.");
//         } finally {
//             setIsSendingOtp(false);
//         }
//     };

//     // Handle verifying OTP
//     const handleVerifyOtp = async () => {
//         if (!otp) {
//             setMessage("Please enter the OTP.");
//             return;
//         }
//         try {
//             const otpResponse = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
//             if (otpResponse.status === 200) {
//                 setOtpVerified(true);
//                 setMessage("OTP verified successfully.");
//             } else {
//                 setMessage("Invalid OTP.");
//             }
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//             setMessage("Invalid OTP.");
//         }
//     };

//     // Handle registration
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         if (!otpVerified) {
//             setMessage("Please verify OTP first.");
//             return;
//         }
//         if (!name || !email || !password) {
//             setMessage("Please fill all the fields.");
//             return;
//         }
//         try {
//             const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
//             if (response.status === 201) {
//                 alert("Registration successful");
//                 navigate("/login");
//             } else {
//                 setMessage("Registration failed.");
//             }
//         } catch (error) {
//             console.error("Error registering user:", error);
//             if (error.response?.data?.message?.includes("duplicate key")) {
//                 setMessage("Email is already registered.");
//             } else {
//                 setMessage("Registration failed.");
//             }
//         }
//     };

//     return (
//         <section className="h-screen flex items-center justify-center">
//             <div className="max-w-sm border shadow bg-white mx-auto p-8">
//                 <h2 className="text-2xl font-semibold pt-5">Register</h2>
//                 <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
//                     <input type="text" placeholder="Name" required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                     />
//                     <input type="email" placeholder="Email Address" required
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                     />
//                     <input type="password" placeholder="Password" required
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                     />
//                     {otpSent && (
//                         <>
//                             <input type="text" placeholder="Enter OTP" required
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                             />
//                             <button type="button" onClick={handleVerifyOtp}
//                                 className="w-full bg-green-500 text-white hover:bg-green-600 font-medium py-3 rounded-md">
//                                 Verify OTP
//                             </button>
//                         </>
//                     )}
//                     <button type="button" onClick={handleSendOtp}
//                         disabled={isSendingOtp || otpSent}
//                         className={`w-full ${otpSent ? "bg-gray-500" : "bg-primary"} text-white hover:bg-indigo-500 font-medium py-3 rounded-md`}>
//                         {otpSent ? "Resend OTP" : "Send OTP"}
//                     </button>
//                     <button type="submit"
//                         className={`w-full mt-5 ${otpVerified ? "bg-primary" : "bg-gray-500"} text-white hover:bg-indigo-500 font-medium py-3 rounded-md`}
//                         disabled={!otpVerified}>
//                         Register
//                     </button>
//                     {message && <p className="text-red-500">{message}</p>}
//                 </form>
//                 <p className="my-5 italic text-sm text-center">
//                     Already have an account?
//                     <Link to="/login" className="text-red-700 px-1 underline">Login</Link> here.
//                 </p>
//             </div>
//         </section>
//     );
// };

// export default Register;


// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [otp, setOtp] = useState("");
//     const [otpSent, setOtpSent] = useState(false);
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [message, setMessage] = useState("");
//     const [isSendingOtp, setIsSendingOtp] = useState(false);
//     const navigate = useNavigate();

//     // Handle sending OTP (including resending)
//     const handleSendOtp = async () => {
//         if (!email) {
//             setMessage("Please enter your email.");
//             return;
//         }
//         setIsSendingOtp(true);
//         setOtpSent(false);  // Reset OTP status for resending
//         setOtp("");  // Clear old OTP input
//         try {
//             const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
//             if (response.status === 200) {
//                 setOtpSent(true);
//                 setMessage("OTP sent to your email.");
//             } else {
//                 setMessage("Failed to send OTP.");
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             setMessage("Failed to send OTP. Please try again.");
//         } finally {
//             setIsSendingOtp(false);
//         }
//     };

//     // Handle verifying OTP
//     const handleVerifyOtp = async () => {
//         if (!otp) {
//             setMessage("Please enter the OTP.");
//             return;
//         }
//         try {
//             const otpResponse = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
//             if (otpResponse.status === 200) {
//                 setOtpVerified(true);
//                 setMessage("OTP verified successfully.");
//             } else {
//                 setMessage("Invalid OTP. Please check again.");
//             }
//         } catch (error) {
//             console.error("Error verifying OTP:", error);
//             setMessage("Invalid OTP. Please try again.");
//         }
//     };

//     // Handle registration
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         if (!otpVerified) {
//             setMessage("Please verify OTP first.");
//             return;
//         }
//         if (!name || !email || !password) {
//             setMessage("Please fill all the fields.");
//             return;
//         }
//         try {
//             const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
//             console.log("Registration Response:", response);  // Debugging
//             if (response.status === 201) {
//                 alert("Registration successful");
//                 navigate("/login");
//             } else {
//                 setMessage("Registration failed.");
//             }
//         } catch (error) {
//             console.error("Error registering user:", error);
//             if (error.response) {
//                 const errorMsg = error.response.data.message || "Registration failed.";
//                 setMessage(errorMsg);

//                 // If user already exists, navigate to login
//                 if (errorMsg.toLowerCase().includes("already registered")) {
//                     setTimeout(() => {
//                         navigate("/login");
//                     }, 2000);
//                 }
//             } else {
//                 setMessage("Registration failed. Please try again.");
//             }
//         }
//     };

//     return (
//         <section className="h-screen flex items-center justify-center">
//             <div className="max-w-sm border shadow bg-white mx-auto p-8">
//                 <h2 className="text-2xl font-semibold pt-5">Register</h2>
//                 <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
//                     <input type="text" placeholder="Name" required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                     />
//                     <input type="email" placeholder="Email Address" required
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                     />
//                     <input type="password" placeholder="Password" required
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                     />
//                     {otpSent && (
//                         <>
//                             <input type="text" placeholder="Enter OTP" required
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 className="w-full bg-gray-100 focus:outline-none px-5 py-3"
//                             />
//                             <button type="button" onClick={handleVerifyOtp}
//                                 className="w-full bg-green-500 text-white hover:bg-green-600 font-medium py-3 rounded-md">
//                                 Verify OTP
//                             </button>
//                         </>
//                     )}
//                     <button type="button" onClick={handleSendOtp}
//                         disabled={isSendingOtp}
//                         className={`w-full ${otpSent ? "bg-yellow-500 hover:bg-yellow-600" : "bg-primary"} text-white font-medium py-3 rounded-md`}>
//                         {otpSent ? "Resend OTP" : "Send OTP"}
//                     </button>
//                     <button type="submit"
//                         className={`w-full mt-5 ${otpVerified ? "bg-primary hover:bg-indigo-500" : "bg-gray-500 cursor-not-allowed"} text-white font-medium py-3 rounded-md`}
//                         disabled={!otpVerified}>
//                         Register
//                     </button>
//                     {message && <p className="text-red-500">{message}</p>}
//                 </form>
//                 <p className="my-5 italic text-sm text-center">
//                     Already have an account?
//                     <Link to="/login" className="text-red-700 px-1 underline">Login</Link> here.
//                 </p>
//             </div>
//         </section>
//     );
// };

// export default Register;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [message, setMessage] = useState("");
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!email) {
            setMessage("Please enter your email.");
            return;
        }
        setIsSendingOtp(true);
        setOtpSent(false);
        setOtp("");
        try {
            const response = await axios.post("http://localhost:5000/api/auth/send-otp", { email });
            if (response.status === 200) {
                setOtpSent(true);
                setMessage("OTP sent to your email.");
            } else {
                setMessage("Failed to send OTP.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage("Failed to send OTP. Please try again.");
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setMessage("Please enter the OTP.");
            return;
        }
        try {
            const otpResponse = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
            if (otpResponse.status === 200) {
                setOtpVerified(true);
                setMessage("OTP verified successfully.");
            } else {
                setMessage("Invalid OTP. Please check again.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setMessage("Invalid OTP. Please try again.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!otpVerified) {
            setMessage("Please verify OTP first.");
            return;
        }

        if (!name || !email || !password) {
            setMessage("Please fill all the fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name,  // ✅ Added `name` here
                email,
                password
            });

            if (response.status === 201) {
                alert("Registration successful");
                navigate("/login");
            } else {
                setMessage("Registration failed.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            const errorMsg = error.response?.data?.message || "Registration failed.";
            setMessage(errorMsg);

            if (errorMsg.toLowerCase().includes("already registered")) {
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <div className="max-w-sm border shadow bg-white mx-auto p-8">
                <h2 className="text-2xl font-semibold pt-5">Register</h2>
                <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
                    <input type="text" placeholder="Name" required
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    <input type="email" placeholder="Email Address" required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    <input type="password" placeholder="Password" required
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                    />
                    {otpSent && (
                        <>
                            <input type="text" placeholder="Enter OTP" required
                                value={otp} onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                            />
                            <button type="button" onClick={handleVerifyOtp}
                                className="w-full bg-green-500 text-white hover:bg-green-600 font-medium py-3 rounded-md">
                                Verify OTP
                            </button>
                        </>
                    )}
                    <button type="button" onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className={`w-full ${otpSent ? "bg-yellow-500 hover:bg-yellow-600" : "bg-primary"} text-white font-medium py-3 rounded-md`}>
                        {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>
                    <button type="submit"
                        className={`w-full mt-5 ${otpVerified ? "bg-primary hover:bg-indigo-500" : "bg-gray-500 cursor-not-allowed"} text-white font-medium py-3 rounded-md`}
                        disabled={!otpVerified}>
                        Register
                    </button>
                    {message && <p className="text-red-500">{message}</p>}
                </form>
                <p className="my-5 italic text-sm text-center">
                    Already have an account?
                    <Link to="/login" className="text-red-700 px-1 underline">Login</Link> here.
                </p>
            </div>
        </section>
    );
};

export default Register;

