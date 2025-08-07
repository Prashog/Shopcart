import React, { useState, useEffect } from 'react';
import { getAllUsers, toggleUserAccess } from '../services/adminApi';
import Loader from '../components/Loader';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(null); // ID of the user currently being toggled

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      if (res?.data?.response && Array.isArray(res.data.response)) {
        setUsers(res.data.response);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (userId) => {
    setToggling(userId);
    try {
      await toggleUserAccess(userId);
      await fetchUsers();
    } catch (err) {
      console.error("Toggle failed:", err);
    }
    setToggling(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold">User ID</th>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Created At</th>
              <th className="p-4 text-left font-semibold">Status</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{user._id}</td>
                <td className="p-4">{user.name || 'N/A'}</td>
                <td className="p-4">{user.email || 'N/A'}</td>
                <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                  >
                    {user.isActive ? "Active" : "Blocked"}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggle(user._id)}
                    disabled={toggling === user._id}
                    className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition duration-200 
                      ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} 
                      text-white disabled:opacity-50`}
                  >
                    {toggling === user._id
                      ? "Updating..."
                      : user.isActive
                      ? "Block"
                      : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}