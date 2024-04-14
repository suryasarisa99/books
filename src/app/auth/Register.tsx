import "./auth.scss";
import logo from "../../../public/logo.png";
import registerImg from "../../../public/register2.png";
import { motion } from "framer-motion";
import React, { useReducer, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import PopupBox from "../../components/PopupBox";
import axios from "axios";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState(
    searchParams.get("ref") || ""
  );
  const [loading, setLoading] = useState(false);

  const [PopupContent, setPopupContent] = useState({
    title: "",
    content: "",
  });

  const [popup, setPopup] = useState(false);
  function ShowOverlay() {
    const overlay = document.getElementById("overlay");
    const body = document.querySelector("body");
    if (overlay && body) {
      overlay.style.display = "block";
      body.style.overflow = "hidden";
    }
  }
  function HideOverlay() {
    const overlay = document.getElementById("overlay");
    const body = document.querySelector("body");
    if (overlay && body) {
      overlay.style.display = "none";
      body.style.overflow = "auto";
    }
  }
  function showPopup() {
    setPopup(true);
    ShowOverlay();
  }

  function hidePopup() {
    setPopup(false);
    HideOverlay();
  }
  function reducerFunction(
    state: typeof defaultError,
    action: {
      type: "name" | "email" | "phone" | "password" | "referralCode";
      payload: boolean | { empty: boolean; invalid: boolean };
    }
  ) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  const defaultError = {
    email: false,
    phone: false,
    password: false,
  };
  const [error, dispatchError] = useReducer(reducerFunction, defaultError);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) setLoading(false);
    let error = false;

    if (!name || !phone || !email || !password || !referralCode) {
      setPopupContent({
        title: "All Fields Required",
        content: "Please fill all the fields to continue.",
      });
      showPopup();
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      dispatchError({
        type: "phone",
        payload: true,
      });
      error = true;
    } else {
      dispatchError({
        type: "phone",
        payload: false,
      });
    }
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
      dispatchError({
        type: "email",
        payload: true,
      });
      error = true;
    } else {
      dispatchError({
        type: "email",
        payload: false,
      });
    }
    if (
      password.length < 6 ||
      // !/[A-Z]/.test(password) || // no uppercase
      !/[0-9]/.test(password) || // no number
      !/[^a-zA-Z0-9]/.test(password) // no special character
    ) {
      dispatchError({
        type: "password",
        payload: true,
      });
      error = true;
    } else {
      dispatchError({
        type: "password",
        payload: false,
      });
    }
    if (error) return;

    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_SERVER}/auth/signup`, {
        name,
        email,
        number: phone,
        password,
        referal: referralCode,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/verification?id=${res.data.id}`);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        switch (err.response.data.error) {
          case "Invalid referal": {
            setPopupContent({
              title: "Invalid Referral Code",
              content:
                "The referral code you entered is invalid. Please check and try again.",
            });
            break;
          }
          case "User already exists": {
            setPopupContent({
              title: "User Already Exists",
              content:
                "The Phone Number you entered is already registered. Please login to continue. or try with another number.",
            });
            break;
          }
        }
        showPopup();
      })
      .finally(() => {
        setLoading(false);
      });

    // navigate("/verification");
    // dispatchError({
    //   type: "referralCode",
    //   payload: { empty: false, invalid: true },
    // });
    // showPopup();
    // setPopupContent({
    //   title: "Invalid Referral Code",
    //   content:
    //     "The referral code you entered is invalid. Please check and try again.",
    // });

    console.log("Form Submitted");
  }
  return (
    <div className="register split-page">
      <div className="cross-bar"></div>
      <div className="left">
        <div className="heading">
          <img src={logo} alt="logo" />
          <p className="title">One Novel</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoCapitalize="words"
          />
          <div className="errors"></div>
          <input
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="errors">
            {error.phone && <p className="error">Invalid Phone Number</p>}
          </div>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="errors">
            {error.email && <p className="error">Invalid Email Adddress</p>}
          </div>
          <div className="pass-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <div
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          <div className="errors">
            {error.password && (
              <div className="error">
                Not a Secure a Password
                <p>
                  Password Must Contain a Symbol, Number and Minimum of 6
                  characters
                </p>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Referal code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <div className="errors"></div>
          <button type="submit">
            {loading ? <div className="loader"></div> : "Register"}
          </button>
        </motion.form>
        <motion.div
          className="link"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/login">Already Have An Account ? Login</Link>
        </motion.div>
      </div>
      {popup &&
        createPortal(
          <PopupBox
            title={PopupContent.title}
            content={PopupContent.content}
            onClick={hidePopup}
          ></PopupBox>,
          document.getElementById("overlay")!
        )}
      <div className="right">
        <img src={registerImg} alt="register" />
      </div>
    </div>
  );
}
