import React, { useState, useEffect, useRef } from "react";
import TopPageBar from "../../../components/TopPageBar";
import { useNavigate } from "react-router-dom";
export default function TrnasactionsPage() {
  const navigate = useNavigate();
  return (
    <div>
      <TopPageBar title="Transactions" onClick={() => navigate(-1)} />
    </div>
  );
}
