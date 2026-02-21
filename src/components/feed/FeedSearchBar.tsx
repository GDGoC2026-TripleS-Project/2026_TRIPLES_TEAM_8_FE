"use client";

import Image from "next/image";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function FeedSearchBar({ value, onChange }: Props) {
  return (
    <div className="relative mb-6">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="원하는 문학을 검색해보세요"
        className="w-full h-[50px] pl-4 pr-10 rounded-xl bg-gray-bg"
      />
      <Image
        src="/common/icon-search.svg"
        alt="search"
        width={18}
        height={18}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
