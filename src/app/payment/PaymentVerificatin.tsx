import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import useData from "../../hooks/useData";

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
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div>
        <div>
          <h1>Please Wait Verifying Payment</h1>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>Payment Is {verified ? "Verified" : "NOt Verified"}</h1>
      </div>
    </div>
  );
}
