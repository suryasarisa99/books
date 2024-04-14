import React, { useState } from "react";
import img2 from "../../../public/home/img2.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import axios from "axios";
export default function ProductSection() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useData();

  function handleBuy() {
    if (!isLoggedIn || !user) {
      navigate("/register");
      return;
    }
    if (user.products.length > 0) return;

    axios
      .post(`${import.meta.env.VITE_SERVER}/payment/pay`, {
        _id: user._id,
      })
      .then((res) => {
        // open(res.data.url, "_blank");
        open(res.data.url);
      });
  }
  return (
    <div className="product-page home-page-section page" id="product">
      <motion.p
        initial={{ opacity: 0, y: 60 }}
        transition={{ delay: 0.3, duration: 0.25 }}
        whileInView={{ opacity: 1, y: 0 }}
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        className="title"
      >
        ESCAPE INTO THE WORLD OF <span>&apos;JANNU&apos;</span>
      </motion.p>
      <motion.img
        initial={{ scale: 0.7, y: 100 }}
        transition={{ duration: 0.2 }}
        whileInView={{ scale: 1, y: 0 }}
        whileTap={{ scale: 0.85 }}
        src={img2}
        draggable={false}
        alt="product page"
      />
      {!user || user.products.length == 0 ? (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="floating-btn"
          onClick={handleBuy}
        >
          Buy Now
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="floating-btn"
          onClick={() => navigate("/pdf")}
        >
          View Book
        </motion.button>
      )}
    </div>
  );
}
