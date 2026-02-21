"use client";

import Image from "next/image";

export default function ScrollTopButton() {
  const handleClick = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-28 right-6 w-[52px] h-[52px] rounded-full bg-white shadow-md flex flex-col items-center justify-center gap-1 text-cap_m text-primary-dark z-50"
    >
      <Image src="/common/icon-up.svg" alt="top" width={16} height={16} />
      TOP
    </button>
  );
}
