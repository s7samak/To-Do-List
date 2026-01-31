"use client";

import { Moon, Sun } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Toggle() {
  const [isChecked, setIsChecked] = useState(false);

  // التبديل بين الوضعين عند تحميل الصفحة استنادًا إلى تفضيلات النظام أو التبديل اليدوي
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsChecked(savedTheme === "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // إذا لم تكن هناك تفضيلات محفوظة، يتم تفعيل الوضع الداكن استنادًا إلى النظام
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsChecked(prefersDarkScheme);
      if (prefersDarkScheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  // دالة لتحديث الوضع عندما يتغير التبديل
  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div
        className={`p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700`}
      >
        {/* أيقونة الشمس */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all`}
        >
          {isChecked ? (
            <Sun className="size-6 text-yellow-500" />
          ) : (
            <Moon className="size-6 text-gray-700" />
          )}
        </div>
      </div>
    </label>
  );
}
