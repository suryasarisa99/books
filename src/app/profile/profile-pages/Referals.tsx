import React, { useState, useEffect, useRef } from "react";
import TopPageBar from "../../../components/TopPageBar";
import { useNavigate } from "react-router-dom";
export default function ReferalsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <TopPageBar title="Referals" onClick={() => navigate(-1)} />
    </div>
  );
}
