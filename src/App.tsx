import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./app/home/HomePage";
import Payment from "./app/payment/Payment";
import WithdrawlPage from "./app/payment/Withdrawl";
import ProfilePage from "./app/profile/Profile";
import RegisterPage from "./app/auth/Register";
import LoginPage from "./app/auth/Login";
import VerificationPage from "./app/auth/Verification";
import PopupBox from "./components/PopupBox";
import TrnasactionsPage from "./app/profile/profile-pages/Transactions";
import ReferalsPage from "./app/profile/profile-pages/Referals";
import PdfViewer from "./app/PDFViewer";

import { useEffect } from "react";
import PaymentVerification from "./app/payment/PaymentVerificatin";

export default function App() {
  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      metaThemeColor.setAttribute("content", "#1c1c1c");
    } else {
      metaThemeColor.setAttribute("content", "#f5f4f0");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/withdrawl" element={<WithdrawlPage />} />
        <Route path="/payment-verification" element={<PaymentVerification />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationPage />} />

        <Route path="/transactions" element={<TrnasactionsPage />} />
        <Route path="/referals" element={<ReferalsPage />} />
        <Route path="/pdf" element={<PdfViewer />} />
      </Routes>
    </div>
  );
}
