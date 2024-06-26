import React, { useState } from "react";
import img3b from "../../../public/home/img3a.jpg";
import img3a from "../../../public/home/img3b.jpg";
import img3c from "../../../public/home/img3c.jpg";
import useData from "../../hooks/useData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Page3() {
  const navigate = useNavigate();
  const { isLoggedIn } = useData();
  return (
    <div id="why" className="page3 page home-page-section">
      <div className="part1"></div>
      <div className="cross-bar"></div>
      <div className="part2"></div>
      <div className="row">
        <div className="column">
          <motion.img
            initial={{ x: -100 }}
            transition={{ duration: 0.4 }}
            whileInView={{ x: 0 }}
            src={img3a}
            className="img1"
            draggable={false}
            alt="img3a"
          />
          <motion.img
            initial={{ x: 100 }}
            transition={{ duration: 0.4 }}
            whileInView={{ x: 0 }}
            src={img3b}
            className="img2"
            draggable={false}
            alt="img3b"
          />
        </div>
        <motion.img
          initial={{ x: -100 }}
          transition={{ duration: 0.4 }}
          whileInView={{ x: 0 }}
          className="img3"
          draggable={false}
          src={img3c}
          alt="img3c"
        />
      </div>
      <div className="part2-container">
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="title"
        >
          WHY ONE NOVEL ?
        </motion.p>
        <div className="desc">
          Flexible Hours, Unlimited Earnings, One Novel&apos;s MLM Model Gives
          you the Freedom to Succed
        </div>
        {!isLoggedIn && (
          <button
            className="floating-btn"
            onClick={() => navigate("/register")}
          >
            JOIN NOW
          </button>
        )}
      </div>
    </div>
  );
}
