"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#111111] neo-btn rounded-xl flex items-center justify-center text-[#111111] dark:text-yellow-300">
        <div className="w-5 h-5 opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#111111] neo-btn rounded-xl flex items-center justify-center text-[#111111] dark:text-yellow-300 hover:scale-105 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 font-bold" />
      ) : (
        <Sun className="w-5 h-5 font-bold" />
      )}
    </button>
  );
}
