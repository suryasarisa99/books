import React, { useEffect, useRef, useState } from "react";
import BankImg from "../../../public/bank.png";
import axios from "axios";

import { useNavigate, useSearchParams } from "react-router-dom";
import useData from "../../hooks/useData";
import { UserType } from "../../types/UserTypes";
import usePopup from "../../hooks/usePopup";
import { createPortal } from "react-dom";
import PopupBox from "../../components/PopupBox";

export default function VerificationPage() {
  const otpInputsRef = useRef<HTMLInputElement[]>([]);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const navigate = useNavigate();

  const { setUser, setToken, setIsLoggedIn } = useData();

  const { popupIsOpened, ShowPopup, HidePopup, popupContent, setPopupContent } =
    usePopup();

  function Submit() {
    const otp = otpInputsRef.current.map((input) => input.value).join("");
    console.log(id);
    console.log(otp);
    axios
      .post(`${import.meta.env.VITE_SERVER}/auth/otp`, {
        otp,
        id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.isLogedIn) {
          setUser(res.data.user as UserType);
          setToken(res.data.token as string);
          setIsLoggedIn(true);
          setPopupContent({
            title: "Logined Successfully",
            content: `hello ${res.data.user.name}, You are Successfully Logined.`,
            onClick: () => {
              HidePopup();
              navigate("/");
            },
          });
          ShowPopup();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        switch (err.response.data.error) {
          case "Invalid OTP": {
            setPopupContent({
              title: "Invalid OTP",
              content: "The OTP entered is invalid. Please Enter a valid OTP.",
              onClick: HidePopup,
            });
            break;
          }
          case "OTP Expired": {
            setPopupContent({
              title: "OTP Expired",
              content: "The old OTP has expired. A new OTP has been sent.",
              onClick: HidePopup,
            });
            break;
          }
          case "User Already Verified": {
            setPopupContent({
              title: "User Already Verified",
              content:
                "The user is already verified. Please login to continue.",
              onClick: HidePopup,
            });
            break;
          }
          default: {
            setPopupContent({
              title: err.response.data.error,
              content: "An error occured. Please try again.",
              onClick: HidePopup,
            });
          }
        }
        ShowPopup();
      });
  }

  useEffect(() => {
    function handleInput(e: Event) {
      const otpInputs = otpInputsRef.current;
      const focusedInputIndex = otpInputs.findIndex(
        (otpInput) => document.activeElement === otpInput
      );
      if (focusedInputIndex === -1) return;
      const target = e.target as HTMLInputElement;
      if (target.value.length === 1) {
        const nextInput = otpInputs[focusedInputIndex + 1];
        if (nextInput) nextInput.focus();
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        const otpInputs = otpInputsRef.current;
        const focusedInputIndex = otpInputs.findIndex(
          (otpInput) => document.activeElement === otpInput
        );
        if (focusedInputIndex === -1) return;

        if (otpInputs[focusedInputIndex].value.length >= 1) {
          otpInputs[focusedInputIndex].value = "";
        } else {
          const previousInput = otpInputs[focusedInputIndex - 1];
          if (previousInput) previousInput.focus();
        }
      }
      if (e.key === "Enter" && otpInputsRef.current[3].value.length === 1)
        Submit();
    }

    otpInputsRef.current.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("keydown", handleKeydown);
    });

    return () => {
      otpInputsRef.current.forEach((input) => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("keydown", handleKeydown);
      });
    };
  }, []);

  return (
    <div className="otp-page split-page-mb">
      <div className="left">
        <div className="heading">
          <p className="title">Enter OTP</p>
        </div>
        <div className="otp-box">
          {[...Array(4)].map((_, i) => (
            <input
              key={i}
              name="otp"
              className="otp"
              type="number"
              max={9}
              min={0}
              ref={(el) => {
                if (el) otpInputsRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
      {popupIsOpened &&
        createPortal(
          <PopupBox
            title={popupContent.title}
            content={popupContent.content}
            onClick={popupContent.onClick}
          ></PopupBox>,
          document.getElementById("overlay")!
        )}
      <div className="cross-bar"></div>
      <div className="right">
        <img src={BankImg} alt="otp" />
      </div>
    </div>
  );
}
