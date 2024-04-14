import React, { useState } from "react";
import img1 from "../../../public/home/img1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import { useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";

export default function HomeSection() {
  const navigate = useNavigate();
  const { isLoggedIn } = useData();
  return (
    <div className="home-page home-page-section page" id="home">
      <TopBar />
      <motion.p
        initial={{ opacity: 0, y: 150 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        whileInView={{ opacity: 1.0, y: 0 }}
        className="title"
      >
        WELECOME TO ONE NOVEL WHERE EVERY PAGE TELLS A STORY
      </motion.p>

      <motion.img
        className="main-img"
        // initial={{ filter: "blur(0px)" }}
        // transition={{ duration: 0.5 }}
        // whileInView={{ filter: "blur(3px)" }}
        src={img1}
        alt="home page"
      />
      {!isLoggedIn && (
        <motion.button
          initial={{ opacity: 0, y: 300 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="floating-btn"
          onClick={() => navigate("/register")}
        >
          JOIN NOW
        </motion.button>
      )}
    </div>
  );
}
