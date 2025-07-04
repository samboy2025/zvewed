"use client"

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Show if scrolled past 50% or within 200px of bottom
      setVisible(scrollY > docHeight * 0.5 || (window.innerHeight + scrollY >= document.body.offsetHeight - 200));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm transition-all"
      aria-label="Back to Top"
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
      Back to Top
    </button>
  );
} 