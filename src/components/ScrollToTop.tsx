import React from "react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
    onClick={scrollUp}
    style={{
      position: "fixed",
      bottom: "90px", // lifted above FAQ icon
      right: "35px",
      padding: "8px 12px",
      backgroundColor: "#808080",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      zIndex: 1000,
    }}
  >
    ↑
    </button>
  ) : null;
}
// ↑\\\\\\\\\\\\\\\\\\\z\\\\\\\\\\\\\\\\\\
