"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  leftIcon?: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  leftIcon,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-[350px] h-[50px] rounded-xl flex items-center justify-center gap-2 text-h3_m transition-colors",
        disabled
          ? "bg-gray-bg text-gray-text2 cursor-not-allowed"
          : "bg-primary-dark text-white",
        className,
      )}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}

      {children}
    </button>
  );
}
