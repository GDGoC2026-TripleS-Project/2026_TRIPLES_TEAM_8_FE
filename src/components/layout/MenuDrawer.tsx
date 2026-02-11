"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

const MENUS = [
  { href: "/", label: "홈", icon: "/common/icon-home.svg" },
  { href: "/feed", label: "도서 찾기 피드", icon: "/common/icon-book.svg" },
  { href: "/ranking", label: "랭킹", icon: "/common/icon-award.svg" },
  { href: "/me", label: "마이페이지", icon: "/common/icon-user.svg" },
];

export default function MenuDrawer({ open, onClose }: Props) {
  const pathname = usePathname();

  if (!open) return null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* 투명도 */}
      <button
        aria-label="Close menu overlay"
        onClick={onClose}
        className="absolute inset-0 bg-white/90"
      />

      {/* 패널 */}
      <aside className="absolute inset-0 bg-background">
        <div className="h-[10px]" />
        {/* 헤더 */}
        <div className="flex h-[60px] items-center justify-between border-b border-stroke px-5 border-b-[1.5px]">
          <div className="relative h-[30px] w-[80px]">
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
            aria-label="Close menu"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-btn"
          >
            <Image src="/common/icon-close.svg" alt="" width={24} height={24} />
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <nav className="px-5 py-6">
          <ul className="flex flex-col gap-6">
            {MENUS.map((m) => {
              const active = isActive(m.href);
              return (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    onClick={onClose}
                    className={[
                      "flex items-center gap-4 px-4 py-4",
                      "rounded-[12px] transition-colors",
                      "hover:bg-gray-bg",
                      active ? "bg-gray-bg" : "",
                    ].join(" ")}
                  >
                    <Image src={m.icon} alt="" width={24} height={24} />
                    <span className="text-h2_m text-primary-dark">
                      {m.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
