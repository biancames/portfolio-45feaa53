import { useState, useEffect } from "react";
import Home from "@/pages/Home";
import CustomCursor from "@/components/CustomCursor";
import DarkModeSwitch from "@/components/DarkModeSwitch";

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <>
      <CustomCursor />
      <Home />
      <DarkModeSwitch dark={dark} onToggle={() => setDark((d) => !d)} />
    </>
  );
}
