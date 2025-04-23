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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auction/:id" element={<AuctionDetails />} />
        <Route path="/payment" element={<PaymentCheckoutPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/bidding-history" element={<BiddingHistory />} />
        <Route path="/signup" element={<UserInfoForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
