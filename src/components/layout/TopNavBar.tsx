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
      <header className="sticky top-0 bg-background">
        <div className="h-[10px]" />
        <div className="flex h-[60px] items-center justify-between px-5">
          <div className="relative h-[30px] w-[80px]">
            <Image
              src="/common/logo.svg"
              onClick={() => router.push("/home")}
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
        <div className="h-[1.5px] bg-stroke" />
      </header>

      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
