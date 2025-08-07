import React, { useEffect, useState } from "react";
import {
  getDashboardStats,
  getRecentOrders,
  getTopSellingProducts,
} from "../services/adminApi";
import Loader from "../components/Loader";
import { formatDate } from "../utils/formatDate";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDashboardStats(),
      getRecentOrders(),
      getTopSellingProducts(),
    ])
      .then(([statsRes, ordersRes, productsRes]) => {
        setStats(statsRes.data.response);
        setRecent(ordersRes.data.response || []); // Full order data
        setTopProducts(productsRes.data.response || []); // Full product data
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <Loader />;

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.users} />
        <StatCard title="Total Orders" value={stats.orders} />
        <StatCard
          title="Revenue This Month"
          value={`₹${stats.revenueThisMonth.toLocaleString()}`}
        />
        <StatCard
          title="Revenue Last Month"
          value={`₹${stats.revenueLastMonth.toLocaleString()}`}
        />
      </div>

      {/* Top Selling Products & Recent Orders */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <SectionCard title="Top Selling Products">
          {topProducts.length === 0 ? (
            <p className="text-gray-500 text-sm">No top selling products.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {topProducts.map((p) => (
                <li
                  key={p._id}
                  className="py-4 flex items-center gap-4 text-sm"
                >
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Brand: {p.brand} | Price: ₹{p.price}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    Sold: {p.itemsSold}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Recent Orders">
          {recent.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent orders.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recent.map((order) => (
                <li
                  key={order._id}
                  className="py-4 space-y-1 text-sm text-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate font-semibold">
                      Order ID: {order._id}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        order.orderStatus === "Delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.postalCode},{" "}
                    {order.shippingAddress?.country}
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Paid: {order.isPaid ? "✅" : "❌"}</span>
                    <span>Delivered: {order.isDelivered ? "✅" : "❌"}</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    {formatDate(order.createdAt)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      {/* Low Stock Products */}
      <SectionCard title="Low Stock Products">
        {stats.lowStocks.length === 0 ? (
          <p className="text-gray-500 text-sm">No low stock products.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {stats.lowStocks.map((p) => (
              <li
                key={p._id}
                className="py-3 flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-3 w-2/3">
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium text-gray-800 truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Stock: {p.stock}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Sold: {p.itemsSold}
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}

// Stat card for top-level metrics
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="text-gray-500 mb-1">{title}</div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
    </div>
  );
}

// Reusable section container
function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}