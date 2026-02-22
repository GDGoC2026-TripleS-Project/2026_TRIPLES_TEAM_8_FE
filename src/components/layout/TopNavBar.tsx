"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuDrawer from "./MenuDrawer";

export default function TopNavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-background z-[9999]">
        <div className="h-[10px]" />

        <div className="flex h-[60px] items-center justify-between px-5">
          {/* 로고 */}
          <div
            className="relative h-[30px] w-[80px] cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <Image
              src="/common/logo.svg"
              alt="Gread"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* 메뉴 버튼 */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-btn"
          >
            <Image
              src="/common/icon-bar.svg"
              alt="menu"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="h-[1.5px] bg-stroke" />
      </header>

      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
