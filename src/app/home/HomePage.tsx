import React, { useEffect, useState } from "react";
import HomeSection from "./HomeSection.js";
import ProductSection from "./ProductSection.js";
import WhySection from "./WhySection.js";
import AboutSection from "./AboutSection.js";
import "./home.scss";
import useData from "../../hooks/useData.js";

export default function Home() {
  const { isLoggedIn } = useData();

  useEffect(() => {
    function handleZoom() {
      // find which page is in view
      const item = {
        id: "none",
        top: 999999,
      };
      const pages = Array.from(document.querySelectorAll(".home-page-section"));
      for (const page of pages) {
        const rect = page.getBoundingClientRect();
        if (item.top > Math.abs(rect.top)) {
          item.id = page.id;
          item.top = Math.abs(rect.top);
        }
      }
      if (item.id != "none") {
        const page = document.getElementById(item.id);
        if (page) page.scrollIntoView({ behavior: "instant" });
      }
    }
    window.addEventListener("resize", handleZoom);

    return () => {
      window.removeEventListener("resize", handleZoom);
    };
  }, []);
  return (
    <div className="home">
      <HomeSection />
      <ProductSection />
      <WhySection />
      <AboutSection />
    </div>
  );
}
