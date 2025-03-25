import React from "react";
import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";

const UserPayments = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: ordersData, error, isLoading } = useGetOrdersByEmailQuery(user?.email);

    if (isLoading) return <div>Loading....</div>;
    if (error) return <div>No order found!</div>;

    const orders = ordersData.orders || [];
    const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);

    return (
        <div className="py-6 px-4">
            <h3 className="text-xl font-semibold mb-4">Total Payments</h3>
            <div>
                <p className="text-lg font-medium text-gray-800 mb-5">Total Spent: ₹{totalPayment || 0}</p>
                <ul>
                    {orders.map((item, index) => (
                        <li key={index} className="mb-4 p-3 border rounded-lg shadow">
                            <h5 className="font-medium text-gray-800 mb-2">Order #{index + 1}</h5>
                            <div className="text-gray-600">Amount: ₹{item.amount.toFixed(2)}</div>
                            <div className="text-gray-600">Payment ID: {item.orderId}</div>
                            <div className="text-gray-600">
                                Date: {new Date(item?.createdAt).toLocaleString()}
                            </div>
                            <div className="text-gray-600">
                                Status:{" "}
                                <span
                                    className={`ml-2 py-[2px] px-2 text-sm rounded ${
                                        item?.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : item?.status === "pending"
                                            ? "bg-red-200 text-red-700"
                                            : "bg-blue-200 text-blue-700"
                                    }`}
                                >
                                    {item?.status}
                                </span>
                            </div>
                            <hr className="my-2" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserPayments;
