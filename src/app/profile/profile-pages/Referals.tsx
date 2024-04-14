import React, { useState, useEffect, useRef } from "react";
import TopPageBar from "../../../components/TopPageBar";
import { useNavigate } from "react-router-dom";
export default function ReferalsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      metaThemeColor.setAttribute("content", "3e3a33");
    } else {
      metaThemeColor.setAttribute("content", "#ffffff");
    }
  }, []);

  return (
    <div>
      <TopPageBar title="Referals" onClick={() => navigate(-1)} />
    </div>
  );
}
