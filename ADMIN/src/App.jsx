import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from './components/common/AdminHeader';
import AdminFooter from './components/common/AdminFooter';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import RequireAdminAuth from './components/RequireAdminAuth';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AdminHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RequireAdminAuth><Dashboard /></RequireAdminAuth>} />
          <Route path="/categories" element={<RequireAdminAuth><Categories /></RequireAdminAuth>} />
          <Route path="/products" element={<RequireAdminAuth><Products /></RequireAdminAuth>} />
          <Route path="/orders" element={<RequireAdminAuth><Orders /></RequireAdminAuth>} />
          <Route path="/users" element={<RequireAdminAuth><Users /></RequireAdminAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <AdminFooter />
    </div>
  );
};

export default App;