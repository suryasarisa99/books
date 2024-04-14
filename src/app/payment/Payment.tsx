import "./paymetn.scss";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";

import bankImg from "../../../public/bank.png";

export default function PaymentPage() {
  return (
    <div className="payment-page page split-page">
      <div className="cross-bar"></div>
      <div className="left">
        <div className="heading">
          <p className="title">Payment</p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="payment-option upi"
        >
          <div className="btns">
            <button className="phonepe upi-btn">
              <div className="icon">
                <SiPhonepe />
              </div>
              <span>PhonePe</span>
            </button>
            <button className="paytm upi-btn">
              <div className="icon paytm">
                <SiPaytm />
              </div>
              <span>Paytm</span>
            </button>
            <button className="google-pay upi-btn">
              <div className="icon gpay">
                <FaGooglePay />
              </div>
              <span>Google Pay</span>
            </button>
          </div>
        </motion.div>

        <p className="or">Or</p>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="payment-option bank-details"
        >
          <div className="title">Bank Details :</div>
          <input type="text" placeholder="Enter Name" />
          <input type="number" placeholder="Enter Bank Account Number" />
          <input type="text" placeholder="Enter IFSC Code" />
          <input type="number" placeholder="Enter Mobile Number" />
        </motion.div>
        <div className="btn-row">
          <button className="submit">Submit</button>
        </div>
      </div>
      <div className="right">
        <img src={bankImg} alt="" />
      </div>
    </div>
  );
}
