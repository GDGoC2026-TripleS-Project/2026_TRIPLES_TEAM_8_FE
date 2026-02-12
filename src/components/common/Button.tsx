"use client";

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  leftIcon?: React.ReactNode;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  className,
  leftIcon,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "w-[350px] h-[50px] rounded-xl flex items-center justify-center",
        "bg-primary-dark text-white text-h3_m relative",
        className,
      )}
    >
      {leftIcon && (
        <span className="absolute left-4 flex items-center">{leftIcon}</span>
      )}

      {children}
    </button>
  );
}
