// src/pages/OrderDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        if (res.data.success) {
          setOrder(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Payment:</strong> {order.paymentMethod} - {order.isPaid ? "Paid" : "Not Paid"}</p>
        <p><strong>Delivery:</strong> {order.isDelivered ? "Delivered" : "Pending"}</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Items</h2>
        {order.orderItems.map((item) => (
          <div key={item._id} className="border p-3 rounded">
            <p><strong>{item.product.name}</strong></p>
            <p>Price: ₹{item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ₹{item.product.price * item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
