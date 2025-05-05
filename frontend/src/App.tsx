import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AuctionDetails from "./AuctionDetails";
import UserDashboard from "./UserDashboard";
import AuthPage from "./AuthPage";
import PaymentCheckoutPage from "./PaymentCheckoutPage";
import BiddingHistory from "./BiddingHistory";
import UserInfoForm from "./UserInfoForm";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') || localStorage.getItem('user');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/AuctionDetails" element={
          <ProtectedRoute>
            <AuctionDetails />
          </ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute>
            <PaymentCheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/user-dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/bidding-history" element={
          <ProtectedRoute>
            <BiddingHistory />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={<UserInfoForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
