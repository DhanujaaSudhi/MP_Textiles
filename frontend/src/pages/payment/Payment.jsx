import React from "react";
import { useSelector } from "react-redux";

const Payment = () => {
    const { grandTotal } = useSelector((store) => store.cart);
    const { user } = useSelector((store) => store.auth); // Get logged-in user details

    const makePayment = () => {
        const amountInPaise = Math.round(grandTotal * 100);
        var options = {
            key: "rzp_test_mL5jDOIqQ2F3iL",
            key_secret: "EGgijLeX69N4FqNsYbPXT7Qg",
            amount: amountInPaise,
            currency: "INR",
            name: "MpTex",
            description: "Payment for products",
            handler: async function (response) {
                alert("Payment successful: " + response.razorpay_payment_id);

                // Store payment details in the backend
                try {
                    const res = await fetch("http://localhost:5000/api/orders/store-payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user?.email,
                            amount: grandTotal,
                            paymentId: response.razorpay_payment_id,
                            status: "completed",
                        }),
                    });

                    const data = await res.json();
                    if (res.ok) {
                        console.log("Payment stored successfully", data);
                    } else {
                        console.error("Error storing payment:", data);
                    }
                } catch (error) {
                    console.error("Error in payment storage:", error);
                }
            },
            prefill: {
                name: user?.name || "Guest",
                email: user?.email || "guest@example.com",
                contact: "9715710666",
            },
            theme: {
                color: "#3399cc",
            },
        };

        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl mb-4">Proceed with Payment</h2>
            <button onClick={makePayment} className="bg-green-600 text-white px-4 py-2 rounded">
                Pay ₹{grandTotal.toFixed(2)}
            </button>
        </div>
    );
};

export default Payment;
