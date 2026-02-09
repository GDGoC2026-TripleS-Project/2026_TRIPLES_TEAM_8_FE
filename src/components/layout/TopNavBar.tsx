"use client";

import Image from "next/image";
import { useState } from "react";
import MenuDrawer from "./MenuDrawer";

export default function TopNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-stroke bg-background">
        <div className="h-[40px]" />
        <div className="flex h-[72px] items-center justify-between px-5">
          <div className="relative h-[30px] w-[90px]">
            <Image
              src="/common/logo.svg"
              alt="Gread"
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-btn"
          >
            <Image src="/common/icon-bar.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </header>

      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
