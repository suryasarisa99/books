import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import useData from "../../hooks/useData";
import { Link } from "react-router-dom";
export default function PaymentVerification() {
  const { token, setToken, setIsLoggedIn, setUser } = useData();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_SERVER}/auth/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.isLogedIn) {
            setToken(res.data.token);
            setUser(res.data.user);
            setIsLoggedIn(true);
            if (res.data.user.products.length > 0) {
              console.log("Payment is Verified");
              setVerified(true);
            } else {
              setVerified(false);
            }
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="payment-verification loading">
        <div>
          <p>Verifying Payment ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-verification success">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 300 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        className={"bubble " + (verified ? "success" : "error")}
      >
        <p>{verified ? "Success" : "Failed"}</p>
      </motion.div>

      <Link to="/">Go HOME</Link>
    </div>
  );
}
