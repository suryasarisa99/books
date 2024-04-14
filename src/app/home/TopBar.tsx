import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import logo from "../../../public/logo.png";

// icons
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoWalletOutline, IoWallet } from "react-icons/io5";

export default function TopBar() {
  const navigate = useNavigate();

  const { user } = useData();
  return (
    <nav>
      <img src={logo} className="logo" alt="" />
      <ul className="menu">
        <li>
          <Link to="/profile" className="link">
            <FaRegUser className="outline" size={22} />
            <FaUser className="fill" size={22} />
          </Link>
        </li>

        <li className="wallet">
          <IoWalletOutline size={24} className="outline" />
          <IoWallet size={24} className="fill" />
          <div className="wallet-box">
            <p className="balance">
              Balance:
              <span className="amount">₹ {user?.balance || 0} </span>
            </p>
            <button
              className="withdrawl-btn"
              onClick={() => {
                navigate("/withdrawl");
              }}
            >
              With Drawl
            </button>
          </div>
        </li>
        <li className="long-elm">
          <a href="#about">About</a>
        </li>
      </ul>
    </nav>
  );
}
