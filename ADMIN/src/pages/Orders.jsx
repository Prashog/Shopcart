import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  getRecentOrders,
  getUndeliveredOrders,
  updateOrderDeliveryStatus,
} from "../services/adminApi";
import Loader from "../components/Loader";
import { formatDate } from "../utils/formatDate";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let res;
      switch (filter) {
        case "recent":
          res = await getRecentOrders();
          setOrders(res.data.response || []);
          break;
        case "undelivered":
          res = await getUndeliveredOrders();
          setOrders(res.data.response || []);
          break;
        default:
          res = await getAllOrders();
          setOrders(res.data.orders || []);
          break;
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsDelivered = async (orderId) => {
    try {
      await updateOrderDeliveryStatus(orderId);
      fetchOrders(); // refresh after update
    } catch (err) {
      console.error("Failed to update delivery status:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders</h1>

      <div className="mb-6 flex gap-4">
        {["all", "recent", "undelivered"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {f[0].toUpperCase() + f.slice(1)} Orders
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-lg shadow-md space-y-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order._id.slice(-6)}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {order.paymentMethod} ({order.isPaid ? "Paid" : "Unpaid"})
                </p>
                <p>
                  <span className="font-medium">Total:</span> ₹{order.totalPrice}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(order.createdAt)}
                </p>
                <p>
                  <span className="font-medium">Shipping:</span>{" "}
                  {order.shippingAddress?.address}, {order.shippingAddress?.postalCode},{" "}
                  {order.shippingAddress?.country}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mt-3">Items:</h3>
                <ul className="ml-4 list-disc text-sm text-gray-600">
                  {order.orderItems.map((item) => (
                    <li key={item._id}>
                      Product ID: <span className="font-mono">{item.product}</span> × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {!order.isDelivered && (
                <button
                  onClick={() => markAsDelivered(order._id)}
                  className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}