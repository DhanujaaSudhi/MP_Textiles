// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { clearCart } from '../../redux/features/cart/cartSlice';

// import { loadStripe } from "@stripe/stripe-js";
// import { getBaseUrl } from '../../utils/baseURL';

// const OrderSummary = () => {
//     const dispatch = useDispatch()
//     //  const {user} = useSelector(state => state.auth)
  

//     // const products = useSelector((store) => store.cart.products);
 
//     const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);

//     const handleClearCart = () => {
//         dispatch(clearCart())
//     }

//     // payment integration
//     const makePayment = (e) => {
//         e.preventDefault();
//           var options = {
//             key: "rzp_test_mL5jDOIqQ2F3iL",
//             key_secret: "EGgijLeX69N4FqNsYbPXT7Qg",
//             amount: grandTotal * 100,  // Example amount in paise (��50)
//             currency: 'INR',
//             name: 'MpTex',
//             description: 'Payment for products',
//             handler: function (response) {
//               alert(response.razorpay_payment_id);
//             },
//             prefill: {
//               name: "sharmila",
//               email: "sritharvijay07@gmail.com",
//               contact: "9715710666"
//             },
//             notes: {
//               address: "Razorpay Corporate Office"
//             },
//             theme: {
//               color: '#3399cc'
//             }
//           };
//           var pay = new window.Razorpay(options);
//           pay.open();
//       }

//     return (
//         <div className='bg-primary-light mt-5 rounded text-base'>
//             <div className='px-6 py-4 space-y-5'>
//                 <h2 className='text-xl text-text-dark'>Order Summary</h2>
//                 <p className='text-text-dark mt-2'>Selected meters: {selectedItems} meters</p>
//                 <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
//                 <p>Tax ({taxRate * 100}%): ₹{tax.toFixed(2)}</p>
//                 <h3 className='font-bold'>GrandTotal: ₹{grandTotal.toFixed(2)}</h3>
//                 <div className='px-4 mb-6'>
//                     <button 
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleClearCart();
//                     }}
//                         className='bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4'>
//                         <span className='mr-2'>Clear cart</span> 
//                         <i className="ri-delete-bin-7-line"></i>
//                     </button>
                    
//                     <button className='bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center'
//                     onClick={
//                         makePayment
//                     }
//                     ><span className='mr-2'>Proceed Checkout</span><i className="ri-bank-card-line"></i></button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default OrderSummary

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Redirect to Checkout page instead of payment
    const handleCheckout = (e) => {
        e.preventDefault();
        navigate('/checkout');
    };

    return (
        <div className='bg-primary-light mt-5 rounded text-base'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-xl text-text-dark'>Order Summary</h2>
                <p className='text-text-dark mt-2'>Selected meters: {selectedItems} meters</p>
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Tax ({taxRate * 100}%): ₹{tax.toFixed(2)}</p>
                <h3 className='font-bold'>GrandTotal: ₹{grandTotal.toFixed(2)}</h3>
                <div className='px-4 mb-6'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClearCart();
                        }}
                        className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'
                    >
                        <span className='mr-2'>Clear cart</span>
                        <i className="ri-delete-bin-7-line"></i>
                    </button>

                    <button
                        className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center'
                        onClick={handleCheckout}  // Navigate to Checkout
                    >
                        <span className='mr-2'>Continue</span>
                        <i className="ri-bank-card-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
